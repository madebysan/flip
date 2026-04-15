interface SummaryScreenProps {
  total: number;
  known: number;
  review: number;
  onStudyAll: () => void;
  onReviewMissed: () => void;
  onNewDeck: () => void;
}

export function SummaryScreen({
  total,
  known,
  review,
  onStudyAll,
  onReviewMissed,
  onNewDeck,
}: SummaryScreenProps) {
  const allKnown = review === 0;
  const percentage = Math.round((known / total) * 100);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-sm mx-auto w-full text-center">
      {/* Score circle */}
      <div className="relative w-28 h-28 mb-10">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="currentColor"
            className="text-surface-alt dark:text-dark-surface-alt"
            strokeWidth="4"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="currentColor"
            className="text-text-primary dark:text-dark-text"
            strokeWidth="4"
            strokeDasharray={`${percentage * 3.52} 352`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[28px] font-light tracking-[-0.5px] text-text-primary dark:text-dark-text">
            {percentage}%
          </span>
        </div>
      </div>

      {allKnown ? (
        <>
          <h2 className="text-[28px] font-light tracking-[-0.4px] text-text-primary dark:text-dark-text mb-2">
            Perfect Score
          </h2>
          <p className="text-[15px] tracking-[0.15px] text-text-muted dark:text-dark-text-muted mb-10">
            You knew all {total} cards.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-[28px] font-light tracking-[-0.4px] text-text-primary dark:text-dark-text mb-2">
            Deck Complete
          </h2>
          <p className="text-[15px] tracking-[0.15px] text-text-muted dark:text-dark-text-muted mb-10">
            <span className="text-known">{known} known</span>
            {" · "}
            <span className="text-review">{review} to review</span>
          </p>
        </>
      )}

      <div className="flex flex-col gap-3 w-full">
        {review > 0 && (
          <button
            onClick={onReviewMissed}
            className="w-full py-3 px-6 rounded-full text-[15px] font-medium tracking-[0.15px] bg-text-primary dark:bg-dark-text text-surface dark:text-dark-surface transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:ring-text-muted/20 focus-visible:ring-offset-2"
          >
            Review {review} Missed Cards
          </button>
        )}
        <button
          onClick={onStudyAll}
          className="w-full py-3 px-6 rounded-full text-[15px] font-medium tracking-[0.15px] bg-warm-stone dark:bg-dark-surface-alt dark:border dark:border-dark-border text-text-primary dark:text-dark-text transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:ring-text-muted/20 focus-visible:ring-offset-2"
          style={{ boxShadow: "var(--shadow-warm)" }}
        >
          Study All Again
        </button>
        <button
          onClick={onNewDeck}
          className="w-full py-3 px-6 rounded-full text-[15px] font-medium tracking-[0.15px] text-text-muted dark:text-dark-text-muted hover:bg-surface-alt dark:hover:bg-dark-surface-alt transition-colors focus-visible:ring-2 focus-visible:ring-text-muted/20 focus-visible:ring-offset-2"
        >
          Create New Deck
        </button>
      </div>
    </div>
  );
}
