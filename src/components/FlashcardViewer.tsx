import type { Flashcard } from "../lib/types";
import { FlashcardCard } from "./FlashcardCard";
import { ProgressBar } from "./ProgressBar";

interface FlashcardViewerProps {
  cards: Flashcard[];
  currentIndex: number;
  currentCard: Flashcard;
  isFlipped: boolean;
  knownCount: number;
  reviewCount: number;
  onFlip: () => void;
  onPrev: () => void;
  onNext: () => void;
  onMarkKnown: () => void;
  onMarkReview: () => void;
  onShuffle: () => void;
  onReset: () => void;
}

export function FlashcardViewer({
  cards,
  currentIndex,
  currentCard,
  isFlipped,
  knownCount,
  reviewCount,
  onFlip,
  onPrev,
  onNext,
  onMarkKnown,
  onMarkReview,
  onShuffle,
  onReset,
}: FlashcardViewerProps) {
  return (
    <div className="flex-1 flex flex-col items-center px-4 py-10 max-w-2xl mx-auto w-full">
      {/* Progress */}
      <div className="w-full max-w-lg mb-10">
        <ProgressBar
          total={cards.length}
          known={knownCount}
          review={reviewCount}
        />
      </div>

      {/* Card counter */}
      <div className="text-[13px] font-medium tracking-[0.14px] text-text-muted dark:text-dark-text-muted mb-5">
        {currentIndex + 1} of {cards.length}
      </div>

      {/* Card */}
      <FlashcardCard card={currentCard} isFlipped={isFlipped} onFlip={onFlip} />

      {/* Know / Review buttons */}
      <div className="flex gap-3 mt-10 w-full max-w-lg">
        <button
          onClick={onMarkReview}
          className="flex-1 py-3 px-4 rounded-full text-[14px] font-medium tracking-[0.14px] bg-review-bg text-review dark:text-yellow-500 transition-all hover:opacity-80"
          style={{ boxShadow: "var(--shadow-inset)" }}
        >
          Review Again
        </button>
        <button
          onClick={onMarkKnown}
          className="flex-1 py-3 px-4 rounded-full text-[14px] font-medium tracking-[0.14px] bg-known-bg text-known dark:text-emerald-400 transition-all hover:opacity-80"
          style={{ boxShadow: "var(--shadow-inset)" }}
        >
          Know It
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-5 mt-8">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="p-2.5 rounded-full text-text-muted dark:text-dark-text-muted hover:bg-warm-stone dark:hover:bg-dark-surface-alt transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous card"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={onShuffle}
          className="p-2.5 rounded-full text-text-muted dark:text-dark-text-muted hover:bg-warm-stone dark:hover:bg-dark-surface-alt transition-colors"
          aria-label="Shuffle cards"
          title="Shuffle"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
            <line x1="4" y1="4" x2="9" y2="9" />
          </svg>
        </button>
        <button
          onClick={onReset}
          className="p-2.5 rounded-full text-text-muted dark:text-dark-text-muted hover:bg-warm-stone dark:hover:bg-dark-surface-alt transition-colors"
          aria-label="Reset progress"
          title="Reset"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>
        <button
          onClick={onNext}
          disabled={currentIndex === cards.length - 1}
          className="p-2.5 rounded-full text-text-muted dark:text-dark-text-muted hover:bg-warm-stone dark:hover:bg-dark-surface-alt transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next card"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="text-[11px] text-text-muted/40 dark:text-dark-text-muted/40 mt-5 tracking-[0.14px] hidden sm:block">
        Arrow keys to navigate · Space to flip
      </div>
    </div>
  );
}
