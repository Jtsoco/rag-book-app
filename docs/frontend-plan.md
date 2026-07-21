# Frontend Plan — Robustness Rework (DEFERRED until after the chatbot/RAG is set up)

> **Status: NOT the current priority.** Do `frontend-mvp-plan.md` first (minimal, connected
> to backend), then build the RAG/chatbot — that's the point of the project. Come back to
> THIS doc afterward to make the frontend robust. Decisions in the old "Phase 0" below are
> now resolved: for the MVP we follow the backend spec as-is (no ratings/reviews), and this
> doc is where they get re-added later.

This pass turns the minimal frontend into a robust one: the route-driven **modal** UX
(Plan 1), reviews + two rating systems, and a user page with login/auth.

Target interaction model:
- Click a book anywhere (carousel or search result) -> quick-look **modal** opens in place,
  URL updates so it's shareable/refreshable.
- Modal carries the whole per-book experience: cover, ratings (if kept), description,
  reviews scrolling inside the modal. No separate heavy destination page.
- A real `/books/$bookId` route still exists as the direct-load / shared-link fallback,
  rendering the same content full-page. Same presentational core feeds both.

---

## Phase 0 — Re-add what the MVP deferred (backend-spec items)

Decisions from the MVP pass are already made (follow spec as-is). This phase is where the
deferred features come back — each needs backend work first, so they're specs to hand off.

- [ ] **Two rating systems** (literary rating + enjoyment rating). Backend: add rating
  fields/aggregation to the `books` model + `BookSerializer`. Frontend: re-enable the
  already-built `CombinedBookRating` in modal/page.
- [ ] **Reviews.** Backend: add a reviews model + endpoint; spec the shape to match
  `FullReviewCommentProps` (reviewer, reviewerID, comment, rating, ratingType, timestamp).
  Frontend: re-enable `ReviewComment` in the modal (scrollable).
- [ ] **Home-page data source.** There is no featured-books endpoint and no
  carousels-by-category endpoint. Decide how home gets populated for logged-out:
  - featured = curated list of `open_library_key`s (hardcoded/config), fetched via
    `/api/book/works/<pk>/` per book, or a new `/api/home/` endpoint?
  - carousels: each category ("Trending This Week", etc.) = a canned search query, a
    curated key list, or a new endpoint? ("Personalized Picks" for logged-in = rec engine,
    later — leave a seam, don't build it.)
- [ ] **Book identity = `open_library_key`.** Backend keys works on OL work keys (e.g.
  `OL12345W`) via `/api/book/works/<pk>/`. Frontend cards currently have no id. Confirm the
  key is what routes/modals use as `bookId`.
- [ ] **Cover URL.** Serializer returns `cover_id` (int), not a URL. Frontend expects
  `coverUrl`. Confirm derivation: `https://covers.openlibrary.org/b/id/{cover_id}-L.jpg`
  (and a size variant `-M` for cards). Decide fallback when `cover_id` is null.
- [ ] **Author shape.** Serializer returns `authors: [{ name, open_library_key, bio }]`;
  frontend wants a single `author` string. Confirm mapping (join names / take first).
- [ ] **Auth for logged-out browse.** Book + search endpoints are `AllowAny` (good). Chat is
  auth-required. Confirm logged-out home/search need no token; defer auth wiring to the rec
  phase.

---

## Phase 1 — Book identity refactor

Thread the OL key through so a click knows *which* book. This is your recurring todo
("add id to bookCards").

- [ ] Add `id` (= `open_library_key`) to `BookCardProps`, `CarouselBookApiData`,
  `FeaturedBookApiData`, `SearchResultBook`.
- [ ] Update mock data (`src/api/mockData.ts`) with fake OL keys so stories/dev still work.
- [ ] Pass the key through `BookCard` -> `BookCarousel` -> `onBookClick`, and through
  `BookFocusComponent`.
- [ ] Keep Storybook green — `HomePageDefault.stories.ts` and card stories will need the new
  field.

## Phase 2 — Route-driven modal (Plan 1)

- [ ] Decide mechanism: search param (`/?book=OL123W`) vs. pathless layout route. Recommend
  **search param** first — simplest, works from any page, easy shareable URL. (Resolves the
  open todo "investigate optional parameters in tanstack router".)
- [ ] Build a `useBookModal()` helper: reads/writes the `book` search param via the router,
  exposes `openBook(key)` / `closeBook()`.
- [ ] Factor shared presentational core `BookSummary` = `BookImageLarge` + ratings (if kept)
  + `BookTextInfo`. Used by BOTH modal and page (kills the modal/page duplication).
- [ ] Rework `BookFocusModal`: `BookSummary` + scrollable reviews inside + dismiss. Remove
  the redundant "More Info" button (no deeper tier now). Keep backdrop-click close +
  `stopPropagation` (already there).
- [ ] Build `/books/$bookId` route ([src/routes/books/$bookId.tsx] is a stub): renders the
  same `BookSummary` + reviews full-page as the direct-load fallback. Remove its redundant
  "More Info" button.
- [ ] Add `errorComponent` + `notFoundComponent` for a bad `bookId` (ties into your
  root-boundary todo).
- [ ] Wire clicks: carousel + search result -> `openBook(key)`.

## Phase 3 — Real data layer (replace mocks)

- [ ] Add an API client. No axios installed — use `fetch` in a thin wrapper. Add
  `VITE_API_BASE_URL` (no `.env` exists yet) pointing at the Django server.
- [ ] Fill in the empty `src/queryUtilities/apiFetches.ts`: `getBook(key)`, `searchBooks(q,
  page)`, plus home fetchers per the Phase 0 home decision. Move the inline `fetchX`
  functions out of the wrapper components into here.
- [ ] Write a mapper: backend `Book` (`cover_id`, `authors[]`) -> frontend view model
  (`coverUrl`, `author`). One place, so the OL-vs-DB shape lives in a single seam
  (addresses "reconcile open library api and own database").
- [ ] Point `BookFocusCarouselWrapper` and `BookCarouselBulkWrapper` at real fetchers.
- [ ] Fix the two latent query bugs: both wrappers put `categories` in the `queryKey` but
  ignore it in the `queryFn` (returns all mock data) — make the fetch actually use it.
- [ ] Shared loading/error handling instead of copy-pasted `Loading...` / `No data` in each
  wrapper (addresses "error branch for queries"). Consider one `<QueryBoundary>`.

## Phase 4 — Search system

- [ ] Backend: `BookSearchAPIView` is stubbed (`pass`). It needs implementing against the
  documented contract `/api/search/?q=<term>&page=<n>&limit=50` (dedupe editions to works).
  This is a backend-spec item — frontend can build against the contract in parallel.
- [ ] Create `/search` route (open todo). Read `q` from a search param so searches are
  linkable/back-button friendly.
- [ ] Wire `SearchBar` -> navigate to `/search?q=...` (debounce input).
- [ ] `SearchResults` already has `cover` / `detailed` modes — feed it real results, thread
  the OL key onto each result, click -> `openBook(key)` (consistent with carousels).
- [ ] Pagination (page param) — infinite scroll or pager; decide later, stub the query shape
  now.
- [ ] Empty/loading/error states for search.

## Phase 5 — Backend integration plumbing

- [ ] CORS: confirm Django allows the Vite origin (there's a "temporary allow any" commit —
  tighten to the dev origin).
- [ ] Verify each endpoint end-to-end from the running frontend: `/api/book/works/<pk>/`,
  `/api/search/`. Use the `/run` or `/verify` skill to drive the real flow, not just types.
- [ ] Leave a documented seam for the chat endpoint (`POST /api/chatbot/single-message/`,
  auth-required, body `{ query }`, returns `{ response }`) — do NOT build the chat UI here,
  just note the contract so the next phase starts clean.

## Phase 6 — Cleanup (fold in as you go)

- [ ] Delete dead/misleading code: `src/routes/index copy.tsx`; the commented-out
  `HomePageDefault` block in `index.tsx`; the `HomePageDefault`-aliased-as-`HomePageLoggedOut`
  import that's never used.
- [ ] Replace `console.log` click handlers and the `alert('Show all reviews')` /
  `alert('...')` stubs with real behavior.
- [ ] Decide the fate of the now-unused prop-drilling `HomePageDefault` (keep as a
  Storybook-only presentational shell, or delete in favor of the wrapper composition).
- [ ] CSS polish items from old todo (focus-component image sizing, review styling, borders).

## Phase 7 — User page + login/auth

- [ ] Auth flow against `dj-rest-auth` (`/api/dj-rest-auth/` + `/registration/`): login,
  register, logout, token storage.
- [ ] Route guard + a user/profile page.
- [ ] Unlock the real chatbot send (it's auth-required) — the MVP's chat page shell becomes
  fully functional once login exists.
- [ ] Logged-in home variation ("Personalized Picks" via the rec engine) — the seam the
  whole RAG project feeds into.

---

## Suggested order for one sitting

1. Phase 0 decisions (write them down — they're specs you'll hand to the backend).
2. Phase 1 (identity) — small, unblocks everything.
3. Phase 2 (route-driven modal) — the headline UX change; can use mock data still.
4. Phase 3 (real data) — flip mocks to backend.
5. Phase 4 (search) — needs the backend search view implemented.
6. Phases 5-6 interleaved.

Rationale: 1-3 are frontend-only and give you the working modal UX against mocks fast;
3-4 depend on backend endpoints (home data source + search view) that Phase 0 defines.
