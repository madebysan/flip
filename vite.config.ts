import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'

function claudeApiProxy(): Plugin {
  return {
    name: 'claude-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/generate', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set. Add it to .env or your shell profile.' }));
          return;
        }

        let body = '';
        for await (const chunk of req) {
          body += chunk;
        }

        let content: string;
        try {
          const parsed = JSON.parse(body);
          content = parsed.content;
        } catch {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
          return;
        }

        // Truncate very long content to ~12k chars to stay within reasonable token limits
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
              messages: [
                {
                  role: 'user',
                  content: `You are a flashcard generator. Given the following content, create high-quality study flashcards.

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
${truncated}`,
                },
              ],
            }),
          });

          if (!response.ok) {
            const errText = await response.text();
            res.statusCode = response.status;
            res.end(JSON.stringify({ error: `Claude API error: ${response.status}`, details: errText }));
            return;
          }

          const data = await response.json() as { content: Array<{ type: string; text: string }> };
          const text = data.content[0]?.text || '[]';

          // Extract JSON array from response (handle possible markdown wrapping)
          const jsonMatch = text.match(/\[[\s\S]*\]/);
          if (!jsonMatch) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Could not parse flashcards from AI response' }));
            return;
          }

          const cards = JSON.parse(jsonMatch[0]);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ cards }));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to generate flashcards', details: String(err) }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), claudeApiProxy()],
})
