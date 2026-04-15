# FlashForge — Handoff Plan

## Overview
Flashcard study app inspired by Paprdeck. Paste markdown/text or drag a file, AI (Claude Haiku) generates Q&A flashcards, study with 3D flip cards.

## Current State
Fully functional v0 with ElevenLabs-inspired design, UI audit complete (all 14 items implemented).

## What's Working
- AI-powered card generation via Claude API (Vite server middleware → Anthropic)
- 3D card flip animation (CSS perspective + transform)
- Know It / Review Again sorting with progress bar
- Summary screen with percentage ring + review missed flow
- Dark/light mode with system preference detection
- Drag-and-drop file support (.md, .txt)
- Keyboard navigation (arrows + space)
- localStorage persistence (deck, progress, theme)
- 12-card UX Design Principles example deck on first visit
- ElevenLabs design system: warm whites, light-weight type, multi-layered shadows, pill buttons
- Responsive (mobile, tablet, desktop)
- Focus-visible states on all interactive elements

## Tech Stack
- React 18 + TypeScript (Vite)
- Tailwind CSS v4
- Claude Haiku via Vite server middleware (uses `ANTHROPIC_API_KEY` from env)
- No backend, no database — localStorage only

## Next Steps
- [ ] URL support — paste a URL and fetch its content for card generation
- [ ] Deck management — save/switch between multiple decks
- [ ] Spaced repetition — track review intervals, surface cards due for review
- [ ] Export/import decks as JSON
- [ ] Deploy to Vercel (needs API route for Claude proxy)

## Dev Server
```
cd ~/Projects/flashforge && npm run dev
# → http://localhost:5173
```

## Open Questions
- Should URL fetching happen client-side (CORS proxy) or server-side (Vite middleware)?
- Is Vercel deployment wanted? Would need to convert Vite middleware to API route.
