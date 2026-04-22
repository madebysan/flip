# Flip — Plan

## Overview
Flashcard study app. Paste markdown/text or drag a file, Claude Haiku generates Q&A flashcards, study with 3D flip cards. BYOK model — users bring their own Anthropic API key.

## Current State
Renamed from FlashForge to Flip (2026-04-22). Ready to ship as a public GitHub repo. Vercel deployment still exists but is not linked from the repo (private-use only).

## What's Working
- AI card generation via direct browser-to-Anthropic call (BYOK)
- 3D flip animation, Know It / Review Again sorting, progress bar, summary
- Dark/light mode with system preference detection
- Drag-and-drop `.md`/`.txt`, keyboard nav (arrows + space), localStorage persistence
- Three pre-built demo decks: Design, History, Geography (15 cards each)
- ElevenLabs-inspired design system: warm whites, light-weight type, multi-layered shadows, pill buttons

## Tech Stack
- React 19 + TypeScript (Vite 8)
- Tailwind CSS v4
- Claude Haiku 4.5 via direct browser call (no backend)
- No server-side secrets — users provide their own API key, stored in localStorage

## Next Steps
See `backlog.md` for features (manual card creation, URL support, deck management, spaced repetition, export/import, more demo decks).

## Dev Server
```
cd ~/Projects/flip && npm run dev
# → http://localhost:5173
```

## Repo
Public: `madebysan/flip`
