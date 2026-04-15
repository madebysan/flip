import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  deckName: string;
  showNewDeck: boolean;
  onNewDeck: () => void;
}

export function Header({
  theme,
  onToggleTheme,
  deckName,
  showNewDeck,
  onNewDeck,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border-subtle dark:border-dark-border bg-surface dark:bg-dark-surface sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <span className="text-[15px] font-medium tracking-[0.15px] text-text-primary dark:text-dark-text">
          FlashForge
        </span>
        {deckName && (
          <span className="text-[13px] text-text-muted dark:text-dark-text-muted">
            / {deckName}
          </span>
        )}
      </div>
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
