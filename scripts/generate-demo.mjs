import { readFileSync, writeFileSync } from 'node:fs';

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error('ANTHROPIC_API_KEY not set');
  process.exit(1);
}

const content = readFileSync('public/demo.md', 'utf8');
const truncated = content.length > 12000 ? content.slice(0, 12000) + '\n\n[Content truncated]' : content;

const prompt = `You are a flashcard generator. Given the following content, create high-quality study flashcards.

Rules:
- Each card must have a clear, specific QUESTION and a concise ANSWER
- Questions should test understanding, not just recall section titles
- Answers should be 1-3 sentences max
- Skip structural content (section headers, timestamps, agendas, metadata)
- Focus on facts, concepts, definitions, and key insights
- Generate 10-30 cards depending on content density
- Output ONLY valid JSON array, no markdown, no explanation

Output format:
[{"question": "...", "answer": "..."}, ...]

Content:
${truncated}`;

const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  }),
});

if (!response.ok) {
  console.error('API error:', response.status, await response.text());
  process.exit(1);
}

const data = await response.json();
const text = data.content[0]?.text || '[]';
const match = text.match(/\[[\s\S]*\]/);
if (!match) { console.error('No JSON found'); process.exit(1); }
const cards = JSON.parse(match[0]);

writeFileSync('public/demo.json', JSON.stringify({ cards, name: 'A24 Presentation' }, null, 2));
console.log(`Wrote ${cards.length} cards to public/demo.json`);
