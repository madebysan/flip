interface ProgressBarProps {
  total: number;
  known: number;
  review: number;
}

export function ProgressBar({ total, known, review }: ProgressBarProps) {
  if (total === 0) return null;

  const knownPct = (known / total) * 100;
  const reviewPct = (review / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
        <span>
          {known + review} of {total} reviewed
        </span>
        <span>
          {known} known · {review} to review
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
        {knownPct > 0 && (
          <div
            className="h-full bg-known transition-all duration-300 ease-out"
            style={{ width: `${knownPct}%` }}
          />
        )}
        {reviewPct > 0 && (
          <div
            className="h-full bg-review transition-all duration-300 ease-out"
            style={{ width: `${reviewPct}%` }}
          />
        )}
      </div>
    </div>
  );
}
