import type { Flashcard } from "../lib/types";

interface FlashcardCardProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlashcardCard({ card, isFlipped, onFlip }: FlashcardCardProps) {
  return (
    <div
      className="card-container w-full max-w-lg mx-auto cursor-pointer select-none"
      style={{ height: "320px" }}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? "Answer side. Click to flip." : "Question side. Click to flip."}
      onKeyDown={(e) => {
        if (e.key === "Enter") onFlip();
      }}
    >
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* Question side */}
        <div className="card-face bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-950/30 border-l-4 border-l-accent">
          <div className="text-xs uppercase tracking-wider text-accent font-medium mb-4">
            Question
          </div>
          <p className="text-xl text-gray-900 dark:text-gray-100 font-medium leading-relaxed text-center px-4">
            {card.question}
          </p>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-6">
            Tap to flip
          </div>
        </div>

        {/* Answer side */}
        <div className="card-face card-face-back bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-200 dark:border-indigo-800 shadow-lg dark:shadow-gray-950/30">
          <div className="text-xs uppercase tracking-wider text-indigo-500 dark:text-indigo-400 font-medium mb-4">
            Answer
          </div>
          <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed text-center px-4">
            {card.answer}
          </p>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-6">
            Tap to flip back
          </div>
        </div>
      </div>
    </div>
  );
}
