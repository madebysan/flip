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
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-md mx-auto w-full text-center">
      {/* Score circle */}
      <div className="relative w-32 h-32 mb-8">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="currentColor"
            className="text-gray-100 dark:text-gray-800"
            strokeWidth="8"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="currentColor"
            className="text-accent"
            strokeWidth="8"
            strokeDasharray={`${percentage * 3.52} 352`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {percentage}%
          </span>
        </div>
      </div>

      {allKnown ? (
        <>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Perfect Score!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            You knew all {total} cards. Great job!
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Deck Complete
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            <span className="text-known font-medium">{known} known</span>
            {" · "}
            <span className="text-review font-medium">{review} to review</span>
            {" · "}
            {total} total
          </p>
        </>
      )}

      <div className="flex flex-col gap-3 w-full">
        {review > 0 && (
          <button
            onClick={onReviewMissed}
            className="w-full py-3 px-6 rounded-xl text-sm font-medium bg-accent text-white hover:bg-accent-dark transition-colors"
          >
            Review {review} Missed Cards
          </button>
        )}
        <button
          onClick={onStudyAll}
          className="w-full py-3 px-6 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Study All Again
        </button>
        <button
          onClick={onNewDeck}
          className="w-full py-3 px-6 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          Create New Deck
        </button>
      </div>
    </div>
  );
}
