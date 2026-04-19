import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  deckName: string;
  showNewDeck: boolean;
  onNewDeck: () => void;
  onOpenKeySettings: () => void;
}

export function Header({
  theme,
  onToggleTheme,
  deckName,
  showNewDeck,
  onNewDeck,
  onOpenKeySettings,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border-subtle dark:border-[rgba(255,255,255,0.05)] bg-surface dark:bg-dark-surface sticky top-0 z-10">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-[15px] font-medium tracking-[0.15px] text-text-primary dark:text-dark-text shrink-0">
          FlashForge
        </span>
        {deckName && (
          <span className="text-[13px] text-text-muted dark:text-dark-text-muted truncate">
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
        <button
          onClick={onOpenKeySettings}
          className="p-2 rounded-full text-text-muted dark:text-dark-text-muted hover:bg-warm-stone dark:hover:bg-dark-surface-alt transition-colors"
          aria-label="API key settings"
          title="API key"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
        </button>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
