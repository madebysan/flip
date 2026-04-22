import { useState, useCallback } from "react";
import { generateId } from "../lib/utils";
import type { Flashcard } from "../lib/types";

const PROMPT = (content: string) => `You are a flashcard generator. Given the following content, create high-quality study flashcards.

Rules:
- Each card must have a clear, specific QUESTION and a concise ANSWER
- Questions should test understanding, not just recall section titles
- Answers should be 1-3 sentences max
- Skip structural content (section headers, timestamps, agendas, metadata)
- Focus on facts, concepts, definitions, and key insights
- Generate 10-30 cards depending on content density
- Output ONLY valid JSON array, no markdown, no explanation

Output format:
[{"question": "...", "answer": "..."}, ...]

Content:
${content}`;

interface FlashcardInputProps {
  onGenerate: (cards: Flashcard[], name: string) => void;
  apiKey: string | null;
  onRequestKey: () => void;
}

export function FlashcardInput({ onGenerate, apiKey, onRequestKey }: FlashcardInputProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const readFile = useCallback((file: File) => {
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        setContent(text);
      }
    };
    reader.onerror = () => {
      setError("Couldn't read that file. Try a .md or .txt file.");
    };
    reader.readAsText(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        readFile(file);
      }
    },
    [readFile]
  );

  const handleGenerate = async () => {
    setError("");
    const trimmed = content.trim();
    if (!trimmed) {
      setError("Paste some content first.");
      return;
    }

    if (!apiKey) {
      onRequestKey();
      return;
    }

    setIsLoading(true);

    const truncated =
      trimmed.length > 12000
        ? trimmed.slice(0, 12000) + "\n\n[Content truncated]"
        : trimmed;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          messages: [{ role: "user", content: PROMPT(truncated) }],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const message = errData?.error?.message || `Claude API error: ${response.status}`;
        if (response.status === 401) {
          setError("That API key was rejected. Check it and try again.");
          onRequestKey();
        } else {
          setError(message);
        }
        setIsLoading(false);
        return;
      }

      const data = (await response.json()) as {
        content: Array<{ type: string; text: string }>;
      };
      const text = data.content[0]?.text || "[]";
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        setError("Couldn't parse flashcards from the AI response.");
        setIsLoading(false);
        return;
      }

      const parsed = JSON.parse(jsonMatch[0]) as Array<{
        question: string;
        answer: string;
      }>;
      const cards: Flashcard[] = parsed.map((c) => ({
        id: generateId(),
        question: c.question,
        answer: c.answer,
        status: "unmarked" as const,
      }));

      if (cards.length === 0) {
        setError("No flashcards could be generated from this content.");
        setIsLoading(false);
        return;
      }

      onGenerate(cards, "My Deck");
    } catch {
      setError("Could not reach Claude. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 max-w-xl mx-auto w-full">
      <div className="text-center mb-10">
        <h1 className="text-[36px] font-light leading-[1.17] tracking-[-0.4px] text-text-primary dark:text-dark-text mb-3 font-[var(--font-display)]">
          Turn your notes into flashcards
        </h1>
        <p className="text-[16px] tracking-[0.16px] leading-[1.5] text-text-secondary dark:text-dark-text-secondary">
          Paste notes, drag a file, or type any content below.
        </p>
      </div>

      <div
        className="w-full relative"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
          placeholder={`Paste any content here — lecture notes, articles, documentation, meeting notes...

AI will extract the key concepts and create proper question/answer flashcards.`}
          className={`w-full h-56 p-5 rounded-2xl border bg-surface dark:bg-dark-card text-text-primary dark:text-dark-text placeholder:text-text-muted/50 dark:placeholder:text-dark-text-muted/50 resize-none focus:outline-none text-[15px] leading-[1.6] tracking-[0.15px] transition-all disabled:opacity-50 ${
            isDragging
              ? "border-text-muted/30 bg-warm-stone dark:bg-dark-surface-alt"
              : "border-border dark:border-dark-border"
          }`}
          style={{
            boxShadow: isDragging ? "var(--shadow-warm)" : "var(--shadow-inset)",
          }}
        />

        {isDragging && (
          <div className="absolute inset-0 rounded-2xl flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-muted dark:text-dark-text-muted"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="text-[13px] font-medium text-text-muted dark:text-dark-text-muted tracking-[0.14px]">
                Drop file here
              </span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-[13px] text-red-600 dark:text-red-400 mt-3 tracking-[0.14px]">
          {error}
        </p>
      )}

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="mt-6 px-8 py-3 rounded-full bg-text-primary dark:bg-dark-text text-surface dark:text-dark-surface text-[15px] font-medium tracking-[0.15px] transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-text-muted/20 focus-visible:ring-offset-2"
        style={{ boxShadow: "var(--shadow-button)" }}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Generating...
          </>
        ) : (
          "Generate Flashcards"
        )}
      </button>

      <div className="mt-10 text-[12px] text-text-muted/50 dark:text-dark-text-muted/50 max-w-sm text-center leading-[1.5] tracking-[0.14px]">
        Drop a .md or .txt file, or paste any text. AI reads your content and
        creates study-ready Q&A cards.
      </div>
    </div>
  );
}
