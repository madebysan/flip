# Flip — Backlog

## Features

- [ ] **Home/index page with 4 tiles** — replace the current "input screen = home" model. Home shows 4 stacks: 3 demo decks (Design / History / Geography) + 1 "Create new" tile that opens the current paste/drop flow. Makes demos discoverable at a glance instead of buried in a footer. Each tile can carry a signature accent color; interface stays unified (no full per-deck theming). Deferred to keep scope contained.
- [ ] **Per-deck signature color** — once the home index exists, each deck gets one accent color drawn from a brand in the `designmd` corpus. Shows up on the tile and subtly on the progress bar during study. Unified interface otherwise.
- [ ] **Manual card creation** — simple UI with front + back fields, save/add-another flow. Lets users build a deck by typing or pasting each card manually, no AI needed. Good for users without an API key who have specific content to study.
- [ ] **URL support** — paste a URL and fetch its content for card generation (client-side CORS proxy vs server-side Edge function is an open question)
- [ ] **Deck management** — save and switch between multiple decks (currently only one deck at a time in localStorage)
- [ ] **Spaced repetition** — track review intervals, surface cards due for review instead of always studying the full deck in order
- [ ] **Export / import** — save decks as JSON files, share them with others
- [ ] **More demo decks** — Film Terminology, Photography Essentials, Classic Literature, Claude API Basics

## Known issues

- [ ] localStorage keys were renamed from `flashforge-*` to `flip-*` — anyone coming from a prior FlashForge build on the same browser would lose their data. Acceptable for a fresh launch.
