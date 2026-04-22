import { useCallback } from "react";
import { generateId } from "../lib/utils";
import type { Flashcard } from "../lib/types";

interface FooterProps {
  onLoadDeck: (cards: Flashcard[], name: string) => void;
}

const DEMO_DECKS = [
  { label: "Design", file: "demo-design.json" },
  { label: "History", file: "demo-history.json" },
  { label: "Geography", file: "demo-geography.json" },
];

export function Footer({ onLoadDeck }: FooterProps) {
  const loadDemo = useCallback(
    async (filename: string) => {
      try {
        const response = await fetch(`/${filename}`);
        if (!response.ok) throw new Error("Failed");
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
        onLoadDeck(cards, data.name || "Demo Deck");
      } catch {
        // Silently fail — demo not critical
      }
    },
    [onLoadDeck]
  );

  return (
    <footer className="w-full py-6 px-6 text-center text-[12px] text-text-muted/50 dark:text-dark-text-muted/50 leading-[1.5] tracking-[0.14px]">
      Try a deck:{" "}
      {DEMO_DECKS.map((deck, i) => (
        <span key={deck.file}>
          <button
            type="button"
            onClick={() => loadDemo(deck.file)}
            className="underline underline-offset-2 hover:text-text-muted dark:hover:text-dark-text-muted transition-colors"
          >
            {deck.label}
          </button>
          {i < DEMO_DECKS.length - 1 && " · "}
        </span>
      ))}
    </footer>
  );
}
