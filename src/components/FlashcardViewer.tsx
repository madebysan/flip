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
    <div className="flex-1 flex flex-col items-center px-4 py-8 max-w-2xl mx-auto w-full">
      {/* Progress */}
      <div className="w-full max-w-lg mb-8">
        <ProgressBar
          total={cards.length}
          known={knownCount}
          review={reviewCount}
        />
      </div>

      {/* Card counter */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
        {currentIndex + 1} of {cards.length}
      </div>

      {/* Card */}
      <FlashcardCard card={currentCard} isFlipped={isFlipped} onFlip={onFlip} />

      {/* Know / Review buttons */}
      <div className="flex gap-3 mt-8 w-full max-w-lg">
        <button
          onClick={onMarkReview}
          className="flex-1 py-3 px-4 rounded-xl text-sm font-medium bg-review-bg text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors border border-amber-200 dark:border-amber-800"
        >
          Review Again
        </button>
        <button
          onClick={onMarkKnown}
          className="flex-1 py-3 px-4 rounded-xl text-sm font-medium bg-known-bg text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors border border-green-200 dark:border-green-800"
        >
          Know It
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous card"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={onShuffle}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Shuffle cards"
          title="Shuffle"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
            <line x1="4" y1="4" x2="9" y2="9" />
          </svg>
        </button>
        <button
          onClick={onReset}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Reset progress"
          title="Reset"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>
        <button
          onClick={onNext}
          disabled={currentIndex === cards.length - 1}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next card"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="text-xs text-gray-400 dark:text-gray-600 mt-4 hidden sm:block">
        Use arrow keys to navigate, space to flip
      </div>
    </div>
  );
}
