import { useEffect } from "react";

interface UseKeyboardOptions {
  onLeft: () => void;
  onRight: () => void;
  onFlip: () => void;
  enabled: boolean;
}

export function useKeyboard({
  onLeft,
  onRight,
  onFlip,
  enabled,
}: UseKeyboardOptions) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture when typing in textarea/input
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement
      )
        return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onLeft();
          break;
        case "ArrowRight":
          e.preventDefault();
          onRight();
          break;
        case " ":
          e.preventDefault();
          onFlip();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onLeft, onRight, onFlip, enabled]);
}
