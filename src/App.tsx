import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FlashcardInput } from "./components/FlashcardInput";
import { FlashcardViewer } from "./components/FlashcardViewer";
import { SummaryScreen } from "./components/SummaryScreen";
import { ApiKeyPrompt } from "./components/ApiKeyPrompt";
import { useFlashcards } from "./hooks/useFlashcards";
import { useTheme } from "./hooks/useTheme";
import { useKeyboard } from "./hooks/useKeyboard";
import { useApiKey } from "./hooks/useApiKey";

function App() {
  const { theme, toggleTheme } = useTheme();
  const { apiKey, setApiKey, removeApiKey } = useApiKey();
  const [showKeyPrompt, setShowKeyPrompt] = useState(false);
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
        deckName={deckName}
        showNewDeck={view !== "input"}
        onNewDeck={startNewDeck}
        onOpenKeySettings={() => setShowKeyPrompt(true)}
      />

      {view === "input" && (
        <FlashcardInput
          onGenerate={loadNewDeck}
          apiKey={apiKey}
          onRequestKey={() => setShowKeyPrompt(true)}
        />
      )}

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

      {showKeyPrompt && (
        <ApiKeyPrompt
          initialKey={apiKey ?? undefined}
          onSave={(key) => {
            setApiKey(key);
            setShowKeyPrompt(false);
          }}
          onClose={() => setShowKeyPrompt(false)}
          onClear={removeApiKey}
        />
      )}

      <Footer onLoadDeck={loadNewDeck} />
    </div>
  );
}

export default App;
