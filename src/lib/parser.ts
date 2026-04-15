import type { Flashcard } from "./types";
import { generateId } from "./utils";

export function parseMarkdownToCards(markdown: string): Flashcard[] {
  const cards: Flashcard[] = [];
  const lines = markdown.split("\n");

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();

    // Pattern 1: ## Header followed by paragraph → header is Q, paragraph is A
    const headerMatch = line.match(/^#{1,3}\s+(.+)/);
    if (headerMatch) {
      const question = headerMatch[1].trim();
      // Collect following non-empty, non-header lines as the answer
      const answerLines: string[] = [];
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        if (!nextLine) {
          if (answerLines.length > 0) break;
          j++;
          continue;
        }
        if (nextLine.match(/^#{1,3}\s+/)) break;
        answerLines.push(nextLine);
        j++;
      }
      if (answerLines.length > 0) {
        cards.push({
          id: generateId(),
          question,
          answer: answerLines.join(" ").replace(/^[-*]\s+/, ""),
          status: "unmarked",
        });
        i = j;
        continue;
      }
    }

    // Pattern 2: **Bold term**: definition
    const boldDefMatch = line.match(/^\*\*(.+?)\*\*\s*[:—–-]\s*(.+)/);
    if (boldDefMatch) {
      cards.push({
        id: generateId(),
        question: `What is ${boldDefMatch[1].trim()}?`,
        answer: boldDefMatch[2].trim(),
        status: "unmarked",
      });
      i++;
      continue;
    }

    // Pattern 3: Definition sentences — "X is Y", "X are Y", "X means Y"
    const defSentenceMatch = line.match(
      /^([A-Z][^.]{3,50}?)\s+(?:is|are|means|refers to)\s+(.{10,})/
    );
    if (defSentenceMatch && !headerMatch) {
      const subject = defSentenceMatch[1].trim();
      const definition = defSentenceMatch[2].trim().replace(/\.$/, "");
      cards.push({
        id: generateId(),
        question: `What is ${subject}?`,
        answer: definition,
        status: "unmarked",
      });
      i++;
      continue;
    }

    // Pattern 4: Bullet points with substantial content
    const bulletMatch = line.match(/^[-*]\s+(.{15,})/);
    if (bulletMatch) {
      const content = bulletMatch[1].trim();
      // Try to split on colon or dash
      const splitMatch = content.match(/^(.+?)\s*[:—–-]\s+(.+)/);
      if (splitMatch) {
        cards.push({
          id: generateId(),
          question: splitMatch[1].trim().endsWith("?")
            ? splitMatch[1].trim()
            : `What is ${splitMatch[1].trim()}?`,
          answer: splitMatch[2].trim(),
          status: "unmarked",
        });
      } else {
        // Convert statement to question
        cards.push({
          id: generateId(),
          question: `Explain: ${content.substring(0, 80)}${content.length > 80 ? "..." : ""}`,
          answer: content,
          status: "unmarked",
        });
      }
      i++;
      continue;
    }

    // Pattern 5: Numbered list items
    const numberedMatch = line.match(/^\d+[.)]\s+(.{15,})/);
    if (numberedMatch) {
      const content = numberedMatch[1].trim();
      const splitMatch = content.match(/^(.+?)\s*[:—–-]\s+(.+)/);
      if (splitMatch) {
        cards.push({
          id: generateId(),
          question: splitMatch[1].trim().endsWith("?")
            ? splitMatch[1].trim()
            : `What is ${splitMatch[1].trim()}?`,
          answer: splitMatch[2].trim(),
          status: "unmarked",
        });
      }
      i++;
      continue;
    }

    i++;
  }

  return cards;
}
