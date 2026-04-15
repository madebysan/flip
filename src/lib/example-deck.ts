import type { Flashcard } from "./types";

export const exampleCards: Flashcard[] = [
  {
    id: "ex-1",
    question: "What is Hick's Law?",
    answer:
      "The time it takes to make a decision increases with the number and complexity of choices. Reduce options to speed up decisions.",
    status: "unmarked",
  },
  {
    id: "ex-2",
    question: "What is the Von Restorff Effect?",
    answer:
      "When multiple similar objects are present, the one that differs from the rest is most likely to be remembered. Use contrast to highlight key elements.",
    status: "unmarked",
  },
  {
    id: "ex-3",
    question: "What does Fitts's Law state?",
    answer:
      "The time to reach a target depends on its distance and size. Make important buttons large and place them near the user's current focus.",
    status: "unmarked",
  },
  {
    id: "ex-4",
    question: "What is the Gestalt Principle of Proximity?",
    answer:
      "Elements placed close together are perceived as a group. Use spacing to create visual relationships between related items.",
    status: "unmarked",
  },
  {
    id: "ex-5",
    question: "What is Cognitive Load?",
    answer:
      "The total amount of mental effort used in working memory. Reduce it by chunking information, using progressive disclosure, and removing unnecessary elements.",
    status: "unmarked",
  },
  {
    id: "ex-6",
    question: "What is the Peak-End Rule?",
    answer:
      "People judge an experience based on its most intense point and its end, not the average. Design memorable peaks and satisfying endings.",
    status: "unmarked",
  },
  {
    id: "ex-7",
    question: "What is Jakob's Law?",
    answer:
      "Users spend most of their time on other sites. They prefer your site to work the same way as sites they already know. Use familiar patterns.",
    status: "unmarked",
  },
  {
    id: "ex-8",
    question: "What is the Aesthetic-Usability Effect?",
    answer:
      "Users perceive aesthetically pleasing designs as more usable. Beautiful interfaces create positive emotional responses that increase tolerance for minor issues.",
    status: "unmarked",
  },
  {
    id: "ex-9",
    question: "What is Miller's Law?",
    answer:
      "The average person can hold about 7 (plus or minus 2) items in working memory. Chunk content into groups of 5-9 items.",
    status: "unmarked",
  },
  {
    id: "ex-10",
    question: "What is the Doherty Threshold?",
    answer:
      "Productivity soars when a computer and its user interact at a pace (<400ms) that ensures neither has to wait on the other. Keep response times under 400ms.",
    status: "unmarked",
  },
  {
    id: "ex-11",
    question: "What is Progressive Disclosure?",
    answer:
      "Show only the information and actions relevant to the current task. Reveal complexity gradually as the user needs it, reducing cognitive load.",
    status: "unmarked",
  },
  {
    id: "ex-12",
    question: "What is the Serial Position Effect?",
    answer:
      "Users best remember items at the beginning (primacy) and end (recency) of a list. Place key actions and information at these positions.",
    status: "unmarked",
  },
];

export const EXAMPLE_DECK_NAME = "UX Design Principles";
