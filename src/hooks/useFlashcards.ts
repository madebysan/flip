import { useState, useCallback, useEffect } from "react";
import type { Flashcard, AppView } from "../lib/types";
import { shuffleArray } from "../lib/utils";
import {
  saveCards,
  loadCards,
  saveCurrentIndex,
  loadCurrentIndex,
  saveDeckName,
  loadDeckName,
  clearDeck,
} from "../lib/storage";

export function useFlashcards() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deckName, setDeckName] = useState("");
  const [view, setView] = useState<AppView>("input");

  // Initialize from localStorage — homepage is the new-deck screen
  useEffect(() => {
    const savedCards = loadCards();
    if (savedCards && savedCards.length > 0) {
      setCards(savedCards);
      setDeckName(loadDeckName() || "My Deck");
      setCurrentIndex(loadCurrentIndex());
      setView("study");
    }
  }, []);

  // Persist cards whenever they change
  useEffect(() => {
    if (cards.length > 0) {
      saveCards(cards);
    }
  }, [cards]);

  // Persist index
  useEffect(() => {
    saveCurrentIndex(currentIndex);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
      setIsFlipped(false);
    } else {
      // Check if all cards have been marked
      const allMarked = cards.every((c) => c.status !== "unmarked");
      if (allMarked) {
        setView("summary");
      }
    }
  }, [currentIndex, cards]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const flipCard = useCallback(() => {
    setIsFlipped((f) => !f);
  }, []);

  const markCard = useCallback(
    (status: "known" | "review") => {
      setCards((prev) =>
        prev.map((card, i) => (i === currentIndex ? { ...card, status } : card))
      );
      // Auto-advance
      if (currentIndex < cards.length - 1) {
        setCurrentIndex((i) => i + 1);
        setIsFlipped(false);
      } else {
        // Last card — check if all marked
        const updatedCards = cards.map((card, i) =>
          i === currentIndex ? { ...card, status } : card
        );
        if (updatedCards.every((c) => c.status !== "unmarked")) {
          setCards(updatedCards);
          setView("summary");
        }
      }
    },
    [currentIndex, cards]
  );

  const shuffle = useCallback(() => {
    setCards((prev) => shuffleArray(prev));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const resetProgress = useCallback(() => {
    setCards((prev) => prev.map((c) => ({ ...c, status: "unmarked" as const })));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const loadNewDeck = useCallback((newCards: Flashcard[], name: string) => {
    setCards(newCards);
    setDeckName(name);
    setCurrentIndex(0);
    setIsFlipped(false);
    setView("study");
    saveCards(newCards);
    saveDeckName(name);
    saveCurrentIndex(0);
  }, []);

  const startNewDeck = useCallback(() => {
    clearDeck();
    setCards([]);
    setDeckName("");
    setCurrentIndex(0);
    setIsFlipped(false);
    setView("input");
  }, []);

  const reviewMissed = useCallback(() => {
    const missed = cards.filter((c) => c.status === "review");
    if (missed.length > 0) {
      const resetMissed = missed.map((c) => ({ ...c, status: "unmarked" as const }));
      setCards(resetMissed);
      setCurrentIndex(0);
      setIsFlipped(false);
      setView("study");
    }
  }, [cards]);

  const studyAll = useCallback(() => {
    setCards((prev) => prev.map((c) => ({ ...c, status: "unmarked" as const })));
    setCurrentIndex(0);
    setIsFlipped(false);
    setView("study");
  }, []);

  const knownCount = cards.filter((c) => c.status === "known").length;
  const reviewCount = cards.filter((c) => c.status === "review").length;
  const unmarkedCount = cards.filter((c) => c.status === "unmarked").length;

  return {
    cards,
    currentIndex,
    currentCard: cards[currentIndex] || null,
    isFlipped,
    deckName,
    view,
    knownCount,
    reviewCount,
    unmarkedCount,
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
    setView,
  };
}
