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
      style={{ height: "340px" }}
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
        <div
          className="card-face bg-surface dark:bg-dark-card"
          style={{
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="text-[11px] uppercase tracking-[0.7px] font-medium text-text-muted dark:text-dark-text-muted mb-5">
            Question
          </div>
          <p className="text-[22px] font-light leading-[1.2] tracking-[-0.3px] text-text-primary dark:text-dark-text text-center px-4 font-[var(--font-display)]">
            {card.question}
          </p>
          <div className="text-[12px] text-text-muted/50 dark:text-dark-text-muted/50 mt-6 tracking-[0.14px]">
            Tap to flip
          </div>
        </div>

        {/* Answer side */}
        <div
          className="card-face card-face-back bg-warm-stone-solid dark:bg-dark-surface-alt"
          style={{
            boxShadow: "var(--shadow-warm), var(--shadow-inset)",
          }}
        >
          <div className="text-[11px] uppercase tracking-[0.7px] font-medium text-text-muted dark:text-dark-text-muted mb-5">
            Answer
          </div>
          <p className="text-[17px] font-normal leading-[1.55] tracking-[0.17px] text-text-secondary dark:text-dark-text-secondary text-center px-4">
            {card.answer}
          </p>
          <div className="text-[12px] text-text-muted/50 dark:text-dark-text-muted/50 mt-6 tracking-[0.14px]">
            Tap to flip back
          </div>
        </div>
      </div>
    </div>
  );
}
