import { useEffect } from "react";

interface InstructionsDialogProps {
  onClose: () => void;
}

export function InstructionsDialog({ onClose }: InstructionsDialogProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface dark:bg-dark-card rounded-2xl p-8"
        style={{ boxShadow: "var(--shadow-warm)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[24px] font-light leading-[1.17] tracking-[-0.2px] text-text-primary dark:text-dark-text mb-3">
          How Flip works
        </h2>
        <p className="text-[14px] leading-[1.6] tracking-[-0.14px] text-text-secondary dark:text-dark-text-secondary mb-6">
          Click a card to flip it and see the answer. Mark each card as <em className="not-italic font-medium text-text-primary dark:text-dark-text">I know it</em> or <em className="not-italic font-medium text-text-primary dark:text-dark-text">I don't know</em> to track your progress.
        </p>
        <p className="text-[14px] leading-[1.6] tracking-[-0.14px] text-text-secondary dark:text-dark-text-secondary mb-8">
          Pick a deck from the tabs above to get started, or paste your own notes on the next screen.
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-full text-[14px] font-medium tracking-[-0.14px] bg-black text-white dark:bg-white dark:text-black transition-opacity hover:opacity-90"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
