import { useState } from "react";
import { generateId } from "../lib/utils";
import type { Flashcard } from "../lib/types";

const PROMPT = `You are a flashcard generator. I'll give you a topic, some notes, or an attached file. Create 15–25 focused Q&A flashcards based on it.

Return ONLY valid JSON in this exact format — no markdown fences, no commentary, no extra text around it:

{
  "name": "A short name for this deck (3–6 words)",
  "cards": [
    { "question": "...", "answer": "..." }
  ]
}

Rules:
- Each question tests understanding, not just recall
- Each answer is 1–3 sentences max
- Focus on facts, concepts, definitions, and key insights
- Skip structural content (headers, metadata, table of contents)

Topic or content:`;

const DEMO_FILE = "demo-geography.json";

interface FlashcardInputProps {
  onGenerate: (cards: Flashcard[], name: string) => void;
}

type ParseResult =
  | { ok: true; name: string; cards: Array<{ question: string; answer: string }> }
  | { ok: false; error: string };

function parseDeckJson(raw: string): ParseResult {
  let cleaned = raw.trim();

  const fenceMatch = cleaned.match(/^```(?:json)?\s*\n?([\s\S]*?)\n?```\s*$/);
  if (fenceMatch) cleaned = fenceMatch[1].trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return {
      ok: false,
      error: "That doesn't look like valid JSON. Make sure you copied the whole response.",
    };
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, error: "JSON should be an object with a cards array." };
  }

  const obj = parsed as { cards?: unknown; name?: unknown };

  if (!Array.isArray(obj.cards)) {
    return { ok: false, error: "JSON is missing the 'cards' array." };
  }

  if (obj.cards.length === 0) {
    return { ok: false, error: "The cards array is empty." };
  }

  const cardsValid = obj.cards.every(
    (c) =>
      c &&
      typeof c === "object" &&
      typeof (c as { question?: unknown }).question === "string" &&
      typeof (c as { answer?: unknown }).answer === "string"
  );
  if (!cardsValid) {
    return {
      ok: false,
      error: "Each card must have a question and an answer (both strings).",
    };
  }

  return {
    ok: true,
    name: typeof obj.name === "string" && obj.name.trim() ? obj.name.trim() : "New Deck",
    cards: obj.cards as Array<{ question: string; answer: string }>,
  };
}

export function FlashcardInput({ onGenerate }: FlashcardInputProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail in insecure contexts; silent noop
    }
  };

  const loadDeck = () => {
    setError("");
    if (!jsonInput.trim()) {
      setError("Paste the JSON response first.");
      return;
    }

    const result = parseDeckJson(jsonInput);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    const cards: Flashcard[] = result.cards.map((c) => ({
      id: generateId(),
      question: c.question,
      answer: c.answer,
      status: "unmarked" as const,
    }));

    onGenerate(cards, result.name);
  };

  const loadDemo = async () => {
    try {
      const response = await fetch(`/${DEMO_FILE}`);
      if (!response.ok) return;
      const data = (await response.json()) as {
        cards: Array<{ question: string; answer: string }>;
        name: string;
      };
      const cards: Flashcard[] = data.cards.map((c) => ({
        id: generateId(),
        question: c.question,
        answer: c.answer,
        status: "unmarked" as const,
      }));
      onGenerate(cards, data.name || "Demo Deck");
    } catch {
      // Silently fail — demo not critical
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-12 max-w-2xl mx-auto w-full">
      <div className="text-center mb-12">
        <h1 className="text-[36px] font-light leading-[1.17] tracking-[-0.4px] text-text-primary dark:text-dark-text mb-3">
          Turn your notes into flashcards
        </h1>
        <p className="text-[16px] tracking-[-0.14px] leading-[1.5] text-text-secondary dark:text-dark-text-secondary">
          Three steps. No API key, no account.
        </p>
      </div>

      {/* Step 1 — Copy the prompt */}
      <section className="w-full mb-10">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-[12px] font-medium tracking-[0.6px] uppercase text-text-muted dark:text-dark-text-muted">
            Step 1
          </span>
          <span className="text-[14px] font-medium tracking-[-0.14px] text-text-primary dark:text-dark-text">
            Copy the prompt
          </span>
        </div>
        <p className="text-[14px] leading-[1.55] tracking-[-0.14px] text-text-secondary dark:text-dark-text-secondary mb-4">
          A pre-formatted instruction that tells the AI to return flashcards as JSON.
        </p>
        <button
          onClick={copyPrompt}
          className="px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[14px] font-medium tracking-[-0.14px] transition-opacity hover:opacity-90 flex items-center gap-2"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy prompt
            </>
          )}
        </button>
      </section>

      {/* Step 2 — Paste into LLM */}
      <section className="w-full mb-10">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-[12px] font-medium tracking-[0.6px] uppercase text-text-muted dark:text-dark-text-muted">
            Step 2
          </span>
          <span className="text-[14px] font-medium tracking-[-0.14px] text-text-primary dark:text-dark-text">
            Paste it into ChatGPT, Gemini, or Claude
          </span>
        </div>
        <p className="text-[14px] leading-[1.55] tracking-[-0.14px] text-text-secondary dark:text-dark-text-secondary">
          Open your preferred AI and paste the prompt. Then give it a topic (e.g.{" "}
          <em className="not-italic font-medium text-text-primary dark:text-dark-text">History of the UK</em>
          ) or attach a file — a PDF, article, or lecture notes. When the AI responds, <strong className="font-medium text-text-primary dark:text-dark-text">copy the full JSON response</strong> so you can paste it below.
        </p>
      </section>

      {/* Step 3 — Paste JSON response */}
      <section className="w-full mb-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-[12px] font-medium tracking-[0.6px] uppercase text-text-muted dark:text-dark-text-muted">
            Step 3
          </span>
          <span className="text-[14px] font-medium tracking-[-0.14px] text-text-primary dark:text-dark-text">
            Paste the JSON response here
          </span>
        </div>
        <p className="text-[14px] leading-[1.55] tracking-[-0.14px] text-text-secondary dark:text-dark-text-secondary mb-4">
          Flip reads the JSON and builds your deck.
        </p>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder={`{\n  "name": "...",\n  "cards": [ ... ]\n}`}
          className="w-full h-40 p-5 rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-card text-text-primary dark:text-dark-text placeholder:text-text-muted/50 dark:placeholder:text-dark-text-muted/50 resize-none focus:outline-none text-[13px] leading-[1.6] tracking-[-0.14px] font-mono"
          style={{ boxShadow: "var(--shadow-inset)" }}
        />
        {error && (
          <p className="text-[13px] text-red-600 dark:text-red-400 mt-3 tracking-[-0.14px]">
            {error}
          </p>
        )}
      </section>

      <button
        onClick={loadDeck}
        disabled={!jsonInput.trim()}
        className="px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-[15px] font-medium tracking-[-0.15px] transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Load deck
      </button>

      <button
        onClick={loadDemo}
        className="mt-6 text-[13px] text-text-muted dark:text-dark-text-muted underline underline-offset-2 tracking-[-0.13px] hover:text-text-primary dark:hover:text-dark-text transition-colors"
      >
        Or try a demo deck first
      </button>
    </div>
  );
}
