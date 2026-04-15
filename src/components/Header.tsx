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
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M12 4v16" />
          </svg>
        </div>
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          FlashForge
        </span>
        {deckName && (
          <span className="text-sm text-gray-400 dark:text-gray-500 hidden sm:inline">
            / {deckName}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {showNewDeck && (
          <button
            onClick={onNewDeck}
            className="px-3 py-1.5 text-sm rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            New Deck
          </button>
        )}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
