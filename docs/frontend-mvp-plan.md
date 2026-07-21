# Frontend MVP Plan — Minimal, Connected to Backend (PRIORITY)

**Why this exists:** the frontend is a means to an end — a tool to use and *feel* the backend
(and soon the RAG) in action. The backend currently proxies the Open Library API and has no
big local DB yet. So: follow the backend spec **as-is**, connect for real in dev, and stop.
Robustness comes later.

**Definition of done (the whole goal):**
- Books are clickable.
- Can visit a book page (by `open_library_key`).
- Can search.
- Can visit a chatbot page.
- All of it talking to the dev backend, not mocks.

**Follow the current backend contract exactly.** `BookSerializer` returns only:
`{ title, open_library_key, description, cover_id, authors[] }`.
No ratings, no reviews in the UI for this pass. (See "Future" note at bottom.)

---

## What's ready vs. blocked on backend

- READY NOW: `GET /api/book/works/<pk>/` (book detail, fetches from Open Library if missing).
- READY NOW: `POST /api/chatbot/single-message/` — but **auth-required** (login is deferred).
- BLOCKED: `GET /api/search/?q=&page=&limit=50` — `BookSearchAPIView` is a `pass` stub;
  backend must implement it before the search goal works. (Backend-spec item.)
- NO ENDPOINT: home/featured/carousels — don't build one; use a hardcoded key list (below).

---

## Phase 1 — Plumbing (connect to dev backend)

- [ ] Add `VITE_API_BASE_URL` (no `.env` exists yet) -> Django dev server.
- [ ] Thin `fetch` wrapper (no axios installed). Base URL + JSON + error throw.
- [ ] Fill the empty `src/queryUtilities/apiFetches.ts`: `getBook(key)` first.
- [ ] One mapper `Book (backend) -> view model`: `cover_id` ->
  `https://covers.openlibrary.org/b/id/{cover_id}-{size}.jpg` (size `L` detail / `M` card;
  fallback placeholder when null), `authors[]` -> single `author` string (first name / join).
- [ ] Confirm CORS allows the Vite origin (there's a "temporary allow any" commit — fine for
  dev, tighten later).

## Phase 2 — Strip UI to the real contract

- [ ] Add `id` (= `open_library_key`) to card/result prop types so clicks know which book.
- [ ] Remove ratings + reviews from rendered `BookCard` / `BookFocusModal` / `BookPage` /
  `BookFocusComponent`. **Keep the components** (`CombinedBookRating`, `ReviewComment`) in
  the tree, just unused — they return in the post-chatbot rework.
- [ ] Book card/detail shows only: cover, title, author, description.

## Phase 3 — Home that actually loads real books (no home endpoint needed)

- [ ] Add a config array of ~10-15 curated `open_library_key`s (`src/api/curatedKeys.ts`).
- [ ] Home fetches each via `getBook(key)` (TanStack Query, dedup handles it) and renders
  cards in a carousel/grid. This proves the OL-proxy round-trip with zero new backend work.
- [ ] Replace the `console.log` click handlers: card click -> navigate to the book page.

## Phase 4 — Book page (visit by key)

- [ ] Build `/books/$bookId` route ([src/routes/books/$bookId.tsx] is a stub) — `bookId` =
  `open_library_key`. Fetch via `getBook(bookId)`, render cover/title/author/description.
- [ ] `errorComponent` + `notFoundComponent` for bad/missing keys (ties into the existing
  TanStack error-boundary todo).
- [ ] For the MVP, click -> **navigate to the page** (skip the route-driven modal; that's a
  robustness item in the deferred plan). Simple `<Link>`/`navigate` at the card.

## Phase 5 — Search

- [ ] BACKEND FIRST: implement `BookSearchAPIView` against `/api/search/?q=&page=&limit=50`
  (dedupe editions to works). Blocks this whole phase.
- [ ] `/search` route reading `q` from a search param (linkable, back-button friendly).
- [ ] Wire the existing `SearchBar` -> navigate to `/search?q=...` (debounce).
- [ ] Feed real results into `SearchResults` (already has cover/detailed modes); thread the
  OL key onto each result; click -> navigate to book page.
- [ ] Pagination: stub the `page` param now, wire later.

## Phase 6 — Chatbot page (visit only)

- [ ] Add a `/chat` route + page shell (message list + input). Visiting is the goal.
- [ ] Sending posts `{ query }` to `POST /api/chatbot/single-message/`, expects
  `{ response }`. Since it's auth-required and login is deferred: either gate the send behind
  a "needs login" notice, or use a dev token to smoke-test. Decide when you get here — don't
  build login for this.
- [ ] This page is the seam the real RAG work plugs into next.

## Phase 7 — Cleanup

- [ ] Delete `src/routes/index copy.tsx`, the commented `HomePageDefault` block in
  `index.tsx`, and the unused `HomePageDefault`-as-`HomePageLoggedOut` import.
- [ ] Nav between home / search / chat (Header links).
- [ ] Verify each flow end-to-end against the running backend (`/run` or `/verify`).

---

## Order

Backend `BookSearchAPIView` (Phase 5 blocker) is the only backend task. Everything else is
frontend against ready endpoints. Suggested: **1 -> 2 -> 3 -> 4** (fully working browse +
book pages against real backend), then **5** (once search view lands), then **6**, then **7**.

## After this: the RAG / chatbot setup

That's the real project. This frontend just needs to reach it (Phase 6 shell). Once the
chatbot is working, pick up `frontend-plan.md` (the robustness rework).

## Future (deferred, noted so it isn't lost)

- **Reviews** and **two rating systems** (literary rating + enjoyment rating) — backend must
  add models/fields/endpoints, then the frontend re-enables the already-built
  `CombinedBookRating` / `ReviewComment` components. Tracked in `frontend-plan.md`.
