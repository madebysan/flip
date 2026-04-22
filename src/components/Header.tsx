import { useCallback } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { generateId } from "../lib/utils";
import type { Flashcard } from "../lib/types";

const DEMO_DECKS = [
  { label: "Design", deckName: "Design Fundamentals", file: "demo-design.json" },
  { label: "History", deckName: "World History Essentials", file: "demo-history.json" },
  { label: "Geography", deckName: "World Geography", file: "demo-geography.json" },
];

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  showNewDeck: boolean;
  onNewDeck: () => void;
  onLoadDeck: (cards: Flashcard[], name: string) => void;
  currentDeckName: string;
}

export function Header({
  theme,
  onToggleTheme,
  showNewDeck,
  onNewDeck,
  onLoadDeck,
  currentDeckName,
}: HeaderProps) {
  const loadDemo = useCallback(
    async (filename: string) => {
      try {
        const response = await fetch(`/${filename}`);
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
        onLoadDeck(cards, data.name || "Demo Deck");
      } catch {
        // Silently fail — demo not critical
      }
    },
    [onLoadDeck]
  );

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border-subtle dark:border-[rgba(255,255,255,0.05)] bg-surface dark:bg-dark-surface sticky top-0 z-10">
      <div className="flex items-center gap-2 min-w-0">
        <img src="/favicon.png" alt="" aria-hidden="true" className="w-6 h-6 shrink-0" />
        <span className="text-[15px] font-medium tracking-[0.15px] text-text-primary dark:text-dark-text shrink-0">
          Flip
        </span>
      </div>

      <nav className="flex items-center gap-6">
        {DEMO_DECKS.map((deck) => {
          const isActive = currentDeckName === deck.deckName;
          return (
            <button
              key={deck.file}
              onClick={() => loadDemo(deck.file)}
              className={`text-[14px] font-medium tracking-[-0.14px] pb-0.5 transition-colors ${
                isActive
                  ? "border-b border-black dark:border-white text-black dark:text-white"
                  : "border-b border-transparent text-text-muted dark:text-dark-text-muted hover:text-black dark:hover:text-white"
              }`}
            >
              {deck.label}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        {showNewDeck && (
          <button
            onClick={onNewDeck}
            className="px-4 py-1.5 text-[13px] font-medium rounded-full text-text-secondary dark:text-dark-text-secondary hover:bg-warm-stone dark:hover:bg-dark-surface-alt transition-colors"
          >
            New Deck
          </button>
        )}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
