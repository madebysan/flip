# Flip — Design System

Living design authority for Flip. Describes the current visual identity and UI patterns.

## Atmosphere

Strict monochrome interface — black, white, and grays only. Color lives in the app icon and nowhere else. The interface recedes so the cards (the content) carry all the attention.

Inspired by Figma's marketing site palette: pure `#000` and `#fff`, negative letter-spacing throughout, pill-shaped buttons, and a "color only in content" philosophy. No warm tints, no saturated accents, no semantic colors (green/amber) for functional states — differentiation comes from fill vs outline instead.

## Colors

### Light mode
- **Page background** — `#f5f5f5` (subtle grey, so cards read as raised)
- **Card / header surface** — `#ffffff`
- **Primary text** — `#000000`
- **Secondary text** — `rgba(0, 0, 0, 0.65)`
- **Muted text** — `rgba(0, 0, 0, 0.45)`
- **Border** — `rgba(0, 0, 0, 0.1)`
- **Border subtle** — `rgba(0, 0, 0, 0.06)`
- **Glass overlay** — `rgba(0, 0, 0, 0.04)` (hover states)

### Dark mode
- **Page background** — `#0a0a0a`
- **Card surface** — `#141414`
- **Primary text** — `#ffffff`
- **Secondary text** — `rgba(255, 255, 255, 0.65)`
- **Muted text** — `rgba(255, 255, 255, 0.45)`
- **Border** — `rgba(255, 255, 255, 0.1)`

### No semantic colors
Known/unknown cards are differentiated through **fill vs outline**, not color:
- "I know it" — solid black pill, white text
- "I don't know" — transparent pill with black outline

## Typography

- **Primary font** — Inter (variable)
- **Mono font** — IBM Plex Mono (for future uppercase labels)
- **Letter-spacing** — always negative on body: `-0.14px`. Never positive.
- **Kerning** — `font-feature-settings: "kern" 1` globally

### Scale
- **Display / dialog heading** — 24px, weight 300 (light), line-height 1.17, tracking -0.2px
- **Header logo** — 15px, weight 500, tracking 0.15px
- **Body / tabs / buttons** — 14px, weight 500, tracking -0.14px
- **Secondary / muted** — 13px, tracking 0.14px

## Shape language

- **Buttons** — pill (full radius, `rounded-full`) — solid black primary, outlined secondary
- **Cards (flashcards)** — 20px radius
- **Dialogs** — 16px radius (`rounded-2xl`)
- **Icon buttons** — full radius (`rounded-full`)

## Shadows

Used sparingly — Figma doctrine.
- **Card** — `0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 20px rgba(0, 0, 0, 0.05)`
- **Warm** — `0 1px 2px rgba(0, 0, 0, 0.03)`
- **Button** — `0 0 0 1px rgba(0, 0, 0, 0.04)`
- **Inset** — `inset 0 0 0 1px rgba(0, 0, 0, 0.06)`

Dark mode uses a faint white ring instead: `0 0 0 1px rgba(255, 255, 255, 0.08)`.

## Spacing

Tailwind default scale. Page padding is 24px (`px-6`) on header and content containers. Card body uses 40px top/bottom, 32px left/right padding.

## Patterns

### Deck tabs in header
Horizontal text tabs with an underline on the active deck. Inactive tabs are muted and underline-transparent so layout doesn't shift on state change. Gap between tabs: 24px.

### Know / Don't know buttons
Always side-by-side, equal width, below the card. Primary (I know it) on the right, outlined secondary (I don't know) on the left. Matches reading flow.

### Instructions dialog
Shown once on first visit. Backdrop: `bg-black/20` in light, `bg-black/50` in dark, with `backdrop-blur-sm`. Dismissable via button, Escape key, or click outside.

### New-deck screen
Three-step guided flow on a single screen: (1) copy prompt from a code-styled pre-block with inline Copy button, (2) instruction text pointing to external LLM, (3) paste JSON response into a mono-font textarea. Step labels use `uppercase` + positive letter-spacing (`0.6px`) to echo Figma's `figmaMono` signage.

## Shared components

| Component | Purpose | Path |
|---|---|---|
| `Header` | Logo + new-deck button + theme toggle | `src/components/Header.tsx` |
| `FlashcardCard` | 3D flip animation, front/back faces | `src/components/FlashcardCard.tsx` |
| `FlashcardViewer` | Progress, card, know/don't-know, nav | `src/components/FlashcardViewer.tsx` |
| `FlashcardInput` | 3-step deck-builder: copy prompt, paste JSON | `src/components/FlashcardInput.tsx` |
| `InstructionsDialog` | First-visit onboarding modal | `src/components/InstructionsDialog.tsx` |
| `SummaryScreen` | End-of-deck review + percentage ring | `src/components/SummaryScreen.tsx` |
| `ProgressBar` | Known/review/remaining progress | `src/components/ProgressBar.tsx` |
| `ThemeToggle` | Sun/moon toggle | `src/components/ThemeToggle.tsx` |

## Decisions

- **Monochrome chrome, colorful app icon** (2026-04-22) — replaced ElevenLabs warm whites with Figma-style strict monochrome. The multi-color stacked-cards icon is the only color moment — it tells the reader "this is about cards" without needing any UI chrome to explain.
- **No semantic colors for known/unknown** (2026-04-22) — originally green (known) + amber (review) with tinted backgrounds. Removed in favor of fill vs outline pill buttons. Cleaner and matches the "color only in content" principle.
- **Demo decks as header tabs** (2026-04-22) — was a footer link, moved up for discoverability. Active deck gets an underline. The footer was removed entirely since it held nothing else.
- **Deck name lives in content, not the header** (2026-04-22) — previously shown as "Flip / Deck Name" in header. Moved to a small muted label above the progress bar so the header carries only the app identity.
- **Grey page background, white cards** (2026-04-22) — pure white on white made the card bleed into the page. `#f5f5f5` page + `#ffffff` card gives just enough layering.
- **Removed BYOK flow, replaced with copy-paste prompt** (2026-04-22) — app no longer asks for an Anthropic API key. User copies a pre-formatted prompt, pastes into any LLM, gets JSON back, pastes into Flip. Zero backend, zero keys, works with ChatGPT / Gemini / Claude / anything that returns JSON. Matches the MIT / non-commercial ethos.
- **Header tabs removed** (2026-04-22) — the Design / History / Geography demo tabs lived in the header for a while but became redundant once demos were surfaced on the new-deck screen itself. Header is now just logo + new-deck button + theme toggle. Less chrome, clearer single-purpose navigation.
- **Deck title promoted to content area** (2026-04-22) — originally shown as small text (13px muted) above the progress bar; got lost visually. Bumped to 20px medium text-primary. Now reads as a proper section heading for the study view.
- **New-deck screen uses Figma mono step labels** (2026-04-22) — "STEP 1", "STEP 2", "STEP 3" in 12px uppercase with +0.6px letter-spacing. Matches Figma's `figmaMono` signage pattern. Step titles are 15px semibold text-primary; descriptions 14px regular text-secondary. Three-level rhythm prevents title/description collision.

## Anti-patterns (don't repeat)

- **Warm tints for surfaces** — tried with ElevenLabs-inspired palette (warm stone, `#f5f2ef`). Read as yellowed/aged against the colorful icon. Moved to neutral grey.
- **Semantic colors for Known/Review** — tried muted green (`#2d8a56`) and amber (`#b8860b`) for the mark buttons. Felt like a Duolingo skin instead of a serious learning tool. Replaced with fill vs outline.
- **Deck name in the header** — crowded the app-identity line and competed with the logo.
- **Footer-only demo picker** — users missed it. Too far from the top of the page.
- **Positive letter-spacing on body** — drifted to `+0.14–0.16px` at various points. Reads as cheap sans-serif. Always negative.

---

Last updated: 2026-04-22
