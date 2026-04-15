export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  status: "unmarked" | "known" | "review";
}

export interface Deck {
  id: string;
  name: string;
  cards: Flashcard[];
  createdAt: number;
}

export type AppView = "input" | "study" | "summary";
