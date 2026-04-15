# FlashForge — Flashcard Study App

## Overview

FlashForge is a single-page flashcard study app inspired by Paprdeck. Users paste markdown content into a textarea, and the app parses it into question/answer flashcards using smart heuristics. Cards can be flipped with a 3D animation, sorted as known/unknown, shuffled, and reviewed in focused sessions. No backend, no AI API — pure client-side parsing with localStorage persistence.

## Tech Stack

- **Framework:** React 18 + TypeScript (Vite)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Persistence:** localStorage
- **Hosting:** Local dev (no deployment)

## Features

### 1. Content Input & Smart Parsing
- Textarea for pasting markdown content
- "Generate Cards" button triggers parsing
- Parsing heuristics:
  - `## Header` followed by paragraph → header is question, paragraph is answer
  - `**Bold term**: definition` → term is question, definition is answer
  - `- Key point` bullet lists → convert to "What is [key point]?" style questions
  - Numbered lists → each item becomes a card
  - `> Blockquote` → used as answer context
  - Sentences with "is", "are", "means" → extract definition-style Q&A
- Minimum viable: at least 3 cards generated from reasonable input

### 2. Card Flip Animation
- CSS 3D transform with perspective
- Click/tap anywhere on card to flip
- Question side: white/light background with accent border-left
- Answer side: subtle gradient or tinted background
- Smooth 600ms transition with ease-in-out
- Card feels physical: shadow, rounded corners (16px), slight elevation

### 3. Study Navigation
- Current position indicator: "3 of 12"
- Previous / Next buttons below the card
- Keyboard support: Left/Right arrows to navigate, Space to flip
- Cards always start on question side when navigating

### 4. Know / Don't Know Sorting
- Two buttons below card: "Know it" (green) and "Review" (amber/orange)
- Marking a card moves to the next card automatically
- Cards track their status: unmarked, known, review
- Visual indicator on progress bar for each card's status

### 5. Progress Tracking
- Progress bar at top showing: known (green) / review (amber) / unmarked (gray)
- When all cards reviewed: summary screen
  - "X cards known, Y cards to review"
  - "Study again" button (all cards, reset)
  - "Review missed" button (only unknown cards)
  - Celebration moment if all known (confetti or simple animation)

### 6. Shuffle & Reset
- Shuffle button: randomizes card order (Fisher-Yates)
- Reset button: clears all known/review marks, goes to card 1

### 7. Dark / Light Mode
- Toggle in header (sun/moon icon)
- Respects system preference on first load
- Persists choice in localStorage
- Card colors adapt to theme

### 8. localStorage Persistence
- Current deck (cards + order) saved automatically
- Progress (known/review status) saved
- Theme preference saved
- On reload: restore last session
- "New deck" clears current and shows input

### 9. Example Deck
- Pre-loaded on first visit (no cards in localStorage)
- Topic: "UX Design Principles" (10-12 cards)
- Demonstrates all card types and the study flow
- Dismissed permanently once user creates their own deck

## File Structure

```
flashforge/
  src/
    App.tsx
    main.tsx
    index.css
    components/
      FlashcardInput.tsx      # Textarea + generate button
      FlashcardViewer.tsx     # Main study view (card + nav + buttons)
      FlashcardCard.tsx       # The flip card component
      ProgressBar.tsx         # Visual progress indicator
      SummaryScreen.tsx       # End-of-deck summary
      ThemeToggle.tsx         # Dark/light toggle
      Header.tsx              # App header with title + controls
    lib/
      parser.ts              # Markdown → flashcard parsing logic
      storage.ts             # localStorage helpers
      types.ts               # TypeScript types
      example-deck.ts        # Pre-loaded example cards
      utils.ts               # Shuffle, etc.
    hooks/
      useFlashcards.ts       # Main state management hook
      useTheme.ts            # Theme state hook
      useKeyboard.ts         # Keyboard navigation hook
  public/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  tailwind.config.ts
```

## Implementation Order

1. Scaffold Vite + React + TS project
2. Install Tailwind CSS v4 + shadcn/ui
3. Types + example deck + parser
4. Card component with flip animation
5. Flashcard viewer with navigation
6. Know/Don't Know + progress bar
7. Summary screen
8. Input mode (textarea + generate)
9. Theme toggle + dark mode
10. localStorage persistence
11. Keyboard navigation
12. Polish: responsive, spacing, transitions

## UX / Design Context

- **Screen type:** Single-page app, two modes (input → study)
- **Theme:** Light default, dark mode available
- **Aesthetic:** Clean, minimal, modern — lots of whitespace, subtle shadows, no visual clutter
- **Design reference:** Paprdeck (paprdeck.com) — simple, focused, card-centric
- **First 60 seconds:** User sees example deck → flips a card → understands the concept → pastes their own content
- **Typography:** System sans-serif stack, clear hierarchy (card text large and readable)
- **Accent color:** Indigo/violet family — distinctive but calm

---

```yaml
run_contract:
  max_iterations: 30
  completion_promise: "V0_COMPLETE"
  on_stuck: defer_and_continue
  on_ambiguity: choose_simpler_option
  on_regression: revert_to_last_clean_commit
  human_intervention: never
  visual_qa_max_passes: 3
  visual_qa_agentation: auto
  phase_skip:
    qa_console: false
    visual_qa: false
    security: false
  complexity_overrides:
    content_parsing: "client-side heuristic parsing, no AI API"
    card_flip: "CSS 3D transform with perspective"
    navigation: "prev/next buttons + keyboard arrows"
    progress: "segmented progress bar with color coding"
    persistence: "localStorage, auto-save on every action"
    theme: "class-based dark mode with system preference detection"
    example_deck: "hardcoded UX design principles cards"
    url_support: "deferred to v1 — paste-only for v0"
```
