import { useState } from "react";
import { Header } from "./components/Header";
import { FlashcardInput } from "./components/FlashcardInput";
import { FlashcardViewer } from "./components/FlashcardViewer";
import { SummaryScreen } from "./components/SummaryScreen";
import { InstructionsDialog } from "./components/InstructionsDialog";
import { useFlashcards } from "./hooks/useFlashcards";
import { useTheme } from "./hooks/useTheme";
import { useKeyboard } from "./hooks/useKeyboard";

const INSTRUCTIONS_KEY = "flip-has-seen-instructions";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [showInstructions, setShowInstructions] = useState(
    () => typeof window !== "undefined" && localStorage.getItem(INSTRUCTIONS_KEY) !== "true"
  );

  const dismissInstructions = () => {
    localStorage.setItem(INSTRUCTIONS_KEY, "true");
    setShowInstructions(false);
  };

  const {
    cards,
    currentIndex,
    currentCard,
    isFlipped,
    deckName,
    view,
    knownCount,
    reviewCount,
    goToNext,
    goToPrev,
    flipCard,
    markCard,
    shuffle,
    resetProgress,
    loadNewDeck,
    startNewDeck,
    reviewMissed,
    studyAll,
  } = useFlashcards();

  useKeyboard({
    onLeft: goToPrev,
    onRight: goToNext,
    onFlip: flipCard,
    enabled: view === "study",
  });

  return (
    <div className="min-h-screen bg-surface-alt dark:bg-dark-surface flex flex-col transition-colors">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        showNewDeck={view !== "input"}
        onNewDeck={startNewDeck}
        onLoadDeck={loadNewDeck}
        currentDeckName={deckName}
      />

      {view === "input" && <FlashcardInput onGenerate={loadNewDeck} />}

      {view === "study" && currentCard && (
        <FlashcardViewer
          cards={cards}
          currentIndex={currentIndex}
          currentCard={currentCard}
          isFlipped={isFlipped}
          knownCount={knownCount}
          reviewCount={reviewCount}
          deckName={deckName}
          onFlip={flipCard}
          onPrev={goToPrev}
          onNext={goToNext}
          onMarkKnown={() => markCard("known")}
          onMarkReview={() => markCard("review")}
          onShuffle={shuffle}
          onReset={resetProgress}
        />
      )}

      {view === "summary" && (
        <SummaryScreen
          total={cards.length}
          known={knownCount}
          review={reviewCount}
          onStudyAll={studyAll}
          onReviewMissed={reviewMissed}
          onNewDeck={startNewDeck}
        />
      )}

      {showInstructions && <InstructionsDialog onClose={dismissInstructions} />}
    </div>
  );
}

export default App;
