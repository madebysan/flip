import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  showNewDeck: boolean;
  onNewDeck: () => void;
}

export function Header({
  theme,
  onToggleTheme,
  showNewDeck,
  onNewDeck,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border-subtle dark:border-[rgba(255,255,255,0.05)] bg-surface dark:bg-dark-surface sticky top-0 z-10">
      <div className="flex items-center gap-2 min-w-0">
        <img src="/favicon.png" alt="" aria-hidden="true" className="w-6 h-6 shrink-0" />
        <span className="text-[15px] font-medium tracking-[0.15px] text-text-primary dark:text-dark-text shrink-0">
          Flip
        </span>
      </div>

      <div className="flex items-center gap-2">
        {showNewDeck && (
          <button
            onClick={onNewDeck}
            className="px-4 py-1.5 text-[13px] font-medium rounded-full text-text-secondary dark:text-dark-text-secondary hover:bg-warm-stone dark:hover:bg-dark-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white"
          >
            New Deck
          </button>
        )}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
