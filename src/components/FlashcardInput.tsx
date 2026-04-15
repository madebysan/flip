import { useState, useCallback } from "react";
import { parseMarkdownToCards } from "../lib/parser";
import type { Flashcard } from "../lib/types";

interface FlashcardInputProps {
  onGenerate: (cards: Flashcard[], name: string) => void;
}

export function FlashcardInput({ onGenerate }: FlashcardInputProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
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

  const handleGenerate = () => {
    setError("");
    const trimmed = content.trim();
    if (!trimmed) {
      setError("Paste some content first.");
      return;
    }

    const cards = parseMarkdownToCards(trimmed);
    if (cards.length === 0) {
      setError(
        "Couldn't extract any flashcards. Try using headers (## Topic), bold definitions (**Term**: definition), or bullet points."
      );
      return;
    }

    onGenerate(cards, "My Deck");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-2xl mx-auto w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Turn your notes into flashcards
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Paste markdown, drag a file, or type structured text below.
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
          placeholder={`## Photosynthesis
The process by which plants convert sunlight, water, and CO2 into glucose and oxygen.

## Mitochondria
Often called the powerhouse of the cell, mitochondria generate most of the cell's ATP.

**DNA**: Deoxyribonucleic acid, the molecule that carries genetic instructions.

- The cell membrane is a semipermeable barrier that controls what enters and exits the cell.`}
          className={`w-full h-64 p-4 rounded-xl border-2 border-dashed bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-sm leading-relaxed font-mono transition-colors ${
            isDragging
              ? "border-accent bg-accent-bg dark:bg-accent/10"
              : "border-gray-200 dark:border-gray-700"
          }`}
        />

        {isDragging && (
          <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-accent-bg/80 dark:bg-accent/10 pointer-events-none">
            <div className="flex flex-col items-center gap-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="text-sm font-medium text-accent">
                Drop file here
              </span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-3">{error}</p>
      )}

      <button
        onClick={handleGenerate}
        className="mt-4 px-8 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-dark transition-colors text-sm"
      >
        Generate Flashcards
      </button>

      <div className="mt-8 text-xs text-gray-400 dark:text-gray-600 max-w-md text-center leading-relaxed">
        Tip: Drop a .md or .txt file, or use ## headers, **bold**: definitions, and bullet points.
      </div>
    </div>
  );
}
