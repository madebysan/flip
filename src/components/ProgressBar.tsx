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
      <div className="flex justify-between text-[12px] tracking-[0.14px] text-text-muted dark:text-dark-text-muted mb-2">
        <span>
          {known + review} of {total} reviewed
        </span>
        <span>
          {known} known · {review} to review
        </span>
      </div>
      <div className="w-full h-1.5 bg-surface-alt dark:bg-dark-surface-alt rounded-full overflow-hidden flex">
        {knownPct > 0 && (
          <div
            className="h-full bg-known transition-all duration-500 ease-out"
            style={{ width: `${knownPct}%` }}
          />
        )}
        {reviewPct > 0 && (
          <div
            className="h-full bg-review transition-all duration-500 ease-out"
            style={{ width: `${reviewPct}%` }}
          />
        )}
      </div>
    </div>
  );
}
