# FlashForge — Handoff Plan

## Overview
Flashcard study app inspired by Paprdeck. Paste markdown/text or drag a file, AI (Claude Haiku) generates Q&A flashcards, study with 3D flip cards.

## Current State
Fully functional v0 with ElevenLabs-inspired design. **Deployed to Vercel** at https://flashforge-seven.vercel.app. API works in production via Edge function.

## What's Working
- AI card generation: Vite middleware in dev, Vercel Edge function in prod (`api/generate.ts`)
- 3D flip animation, Know It / Review Again sorting, progress bar, summary
- Dark/light mode with system preference detection
- Drag-and-drop `.md`/`.txt`, keyboard nav (arrows + space), localStorage persistence
- **"Try a demo" button** — loads 27 pre-baked cards from `public/demo.json` (zero tokens per use)
- ElevenLabs design system: warm whites, light-weight type, multi-layered shadows, pill buttons

## Tech Stack
- React 19 + TypeScript (Vite 8)
- Tailwind CSS v4
- Claude Haiku 4.5 via dual-mode proxy (Vite dev middleware + Vercel Edge function)
- `ANTHROPIC_API_KEY` required — set locally in `~/.zshrc`, set on Vercel via `vercel env add`

## Done this session (2026-04-16)
- Deployed to Vercel (project `sntaln-gmailcoms-projects/flashforge`)
- Created `api/generate.ts` Edge function mirroring the Vite middleware logic
- Added `ANTHROPIC_API_KEY` to Vercel production env
- Added "Try a demo" button — pre-generated 27 cards from A24 presentation into `public/demo.json`
- Added `scripts/generate-demo.mjs` for regenerating the demo deck
- Updated `tsconfig.node.json` to type-check `api/` and `scripts/` folders
- Replaced the Vite boilerplate README with a real one

## Next Steps
- [ ] URL support — paste a URL and fetch its content for card generation
- [ ] Deck management — save/switch between multiple decks
- [ ] Spaced repetition — track review intervals, surface cards due for review
- [ ] Export/import decks as JSON
- [ ] Environment preview link — Vercel preview deploys also need `ANTHROPIC_API_KEY` (currently production-only)

## Dev Server
```
cd ~/Projects/flashforge && npm run dev
# → http://localhost:5173
```

## Deploy
```
vercel --prod
```

## Open Questions
- Should URL fetching happen client-side (CORS proxy) or server-side (Edge function)?
- Regenerate demo.json if the source presentation changes? Currently a manual script run.
