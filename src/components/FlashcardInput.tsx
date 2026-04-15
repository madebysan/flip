import { useState } from "react";
import { parseMarkdownToCards } from "../lib/parser";
import type { Flashcard } from "../lib/types";

interface FlashcardInputProps {
  onGenerate: (cards: Flashcard[], name: string) => void;
}

export function FlashcardInput({ onGenerate }: FlashcardInputProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

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
          Paste markdown, lecture notes, or any structured text below.
        </p>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`## Photosynthesis
The process by which plants convert sunlight, water, and CO2 into glucose and oxygen.

## Mitochondria
Often called the powerhouse of the cell, mitochondria generate most of the cell's ATP.

**DNA**: Deoxyribonucleic acid, the molecule that carries genetic instructions.

- The cell membrane is a semipermeable barrier that controls what enters and exits the cell.`}
        className="w-full h-64 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-sm leading-relaxed font-mono"
      />

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
        Tip: Use ## headers for topics, **bold**: definitions, or bullet points.
        The smarter the formatting, the better the cards.
      </div>
    </div>
  );
}
