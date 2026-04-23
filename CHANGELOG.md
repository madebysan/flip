# Changelog

All notable shipped features and changes, organized by date.

---

## 2026-04-22 (session 2)

### Breaking change
- **Removed BYOK (bring-your-own-key) flow.** No more Anthropic API key prompt. The app no longer calls Claude directly.
- **New flow:** user copies a pre-formatted prompt from Flip, pastes it into any LLM (ChatGPT, Gemini, Claude), gets JSON back, pastes it into Flip. Zero keys, zero backend, zero accounts.
- Removed: `src/lib/api-key.ts`, `src/hooks/useApiKey.ts`, `src/components/ApiKeyPrompt.tsx`, API key button in Header
- Rewrote `FlashcardInput.tsx` as a 3-step guided flow: copy prompt → paste into LLM → paste JSON response

### Features
- **Homepage = new-deck screen** — removed the "load example cards on first visit" logic. Fresh users land directly on the prompt/paste flow. Deleted `src/lib/example-deck.ts`.
- **Demo link on new-deck screen** — single "Or try a demo deck first" link loads Geography (`demo-geography.json`). Replaces the old 3-tab demo picker.
- **Header simplified** — removed Design / History / Geography tabs (now redundant with the new-deck screen demo). Header is now logo + theme + new-deck button.
- **Deck title refresh in study view** — bumped 13px muted → 20px medium text-primary, no longer gets lost above the progress bar.
- **UI audit applied** (phases 1 + 2 + 3): focus-visible rings on all interactive elements, textarea `aria-label`, step titles 14px medium → 15px semibold, removed redundant Step 3 description, textarea `h-40 → h-56`, Copy button `py-2.5 → py-3` (44px touch target), `Copy → Copied` transition, horizontal separator above demo link, responsive hero `28px sm:36px`.
- **Mobile spacing** — study view `py-10 → py-5 sm:py-10` and all vertical margins responsive so card + I-know-it / I-don't-know CTAs fit above the fold on iPhone-sized viewports.
- **Keyboard hint contrast** — raised from opacity-40 to full text-muted.
- **Tagline rewritten** — landed on *"Turn notes into flashcards to study. No AI API key required."* Leads with purpose, drops JSON framing.
- **"Try it live" link** added to README hero pointing to `flip-puce-ten.vercel.app`.
- **"Built for studying" bullet** added as the lead in "What it does" — names the purpose first.

### Docs & publishing
- Made repo public (from private)
- Added 12 GitHub topics: `flashcards`, `study`, `learning`, `ai`, `llm`, `claude`, `chatgpt`, `gemini`, `react`, `vite`, `typescript`, `tailwindcss`
- Added Flip entry to `madebysan/madebysan` public profile README
- README meta description, Open Graph, and Twitter card tags all updated to match the new tagline
- DESIGN.md rewritten to reflect the current Figma-inspired monochrome palette (decisions log + anti-patterns)
- Live URL migrated from `flip-puce-ten.vercel.app` to `flip.santiagoalonso.com`

### Fixes
- Bundle size: 221KB → 215KB (dropped direct-API code, key-management UI, unused example deck)

### Status: deployed

---

## 2026-04-22 (session 1)

### Features
- **Renamed from FlashForge to Flip** — across package.json, README, all components, localStorage keys, and UI copy
- **Three demo decks** — Design, History, Geography (15 cards each). Users can try the tool without an API key
- **BYOK (bring your own key) flow** — users paste their Anthropic API key once, it's stored in localStorage and sent directly to Anthropic from the browser

### Removed
- **A24-specific demo deck** — tied to private presentation content; replaced with generic themed decks
- **Vercel URL references** — deployment stays private; README is now local-run only

### Status: repo-ready

---

## 2026-04-16 (session 1 — as FlashForge)

### Features
- **Vercel deployment** at flashforge-seven.vercel.app (now private)
- **Vercel Edge API** — `api/generate.ts` ported Vite dev middleware to production
- **Demo deck** — 27-card deck loaded from `public/demo.json`, skipped the API
- **Demo generator script** — `scripts/generate-demo.mjs`

### Fixes
- `tsconfig.node.json` included `api/` and `scripts/` so both type-check cleanly
- Replaced Vite boilerplate README with project-specific hero format
