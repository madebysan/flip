export const config = { runtime: 'edge' };

const PROMPT = (content: string) => `You are a flashcard generator. Given the following content, create high-quality study flashcards.

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
${content}`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'ANTHROPIC_API_KEY not configured on server.' }, { status: 500 });
  }

  let content: string;
  try {
    const body = (await req.json()) as { content?: string };
    content = body.content ?? '';
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!content || typeof content !== 'string') {
    return Response.json({ error: 'Missing content' }, { status: 400 });
  }

  const truncated = content.length > 12000 ? content.slice(0, 12000) + '\n\n[Content truncated]' : content;

  try {
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
        messages: [{ role: 'user', content: PROMPT(truncated) }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return Response.json(
        { error: `Claude API error: ${response.status}`, details: errText },
        { status: response.status }
      );
    }

    const data = (await response.json()) as { content: Array<{ type: string; text: string }> };
    const text = data.content[0]?.text || '[]';

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return Response.json({ error: 'Could not parse flashcards from AI response' }, { status: 500 });
    }

    const cards = JSON.parse(jsonMatch[0]);
    return Response.json({ cards });
  } catch (err) {
    return Response.json(
      { error: 'Failed to generate flashcards', details: String(err) },
      { status: 500 }
    );
  }
}
