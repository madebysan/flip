import type { Flashcard } from "./types";

const KEYS = {
  cards: "flashforge-cards",
  deckName: "flashforge-deck-name",
  currentIndex: "flashforge-current-index",
  theme: "flashforge-theme",
  hasVisited: "flashforge-has-visited",
};

export function saveCards(cards: Flashcard[]): void {
  localStorage.setItem(KEYS.cards, JSON.stringify(cards));
}

export function loadCards(): Flashcard[] | null {
  const data = localStorage.getItem(KEYS.cards);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function saveDeckName(name: string): void {
  localStorage.setItem(KEYS.deckName, name);
}

export function loadDeckName(): string | null {
  return localStorage.getItem(KEYS.deckName);
}

export function saveCurrentIndex(index: number): void {
  localStorage.setItem(KEYS.currentIndex, String(index));
}

export function loadCurrentIndex(): number {
  const val = localStorage.getItem(KEYS.currentIndex);
  return val ? parseInt(val, 10) : 0;
}

export function saveTheme(theme: "light" | "dark"): void {
  localStorage.setItem(KEYS.theme, theme);
}

export function loadTheme(): "light" | "dark" | null {
  const val = localStorage.getItem(KEYS.theme);
  if (val === "light" || val === "dark") return val;
  return null;
}

export function hasVisited(): boolean {
  return localStorage.getItem(KEYS.hasVisited) === "true";
}

export function markVisited(): void {
  localStorage.setItem(KEYS.hasVisited, "true");
}

export function clearDeck(): void {
  localStorage.removeItem(KEYS.cards);
  localStorage.removeItem(KEYS.deckName);
  localStorage.removeItem(KEYS.currentIndex);
}
