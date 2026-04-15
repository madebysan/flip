import { Header } from "./components/Header";
import { FlashcardInput } from "./components/FlashcardInput";
import { FlashcardViewer } from "./components/FlashcardViewer";
import { SummaryScreen } from "./components/SummaryScreen";
import { useFlashcards } from "./hooks/useFlashcards";
import { useTheme } from "./hooks/useTheme";
import { useKeyboard } from "./hooks/useKeyboard";

function App() {
  const { theme, toggleTheme } = useTheme();
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        deckName={deckName}
        showNewDeck={view !== "input"}
        onNewDeck={startNewDeck}
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
    </div>
  );
}

export default App;
