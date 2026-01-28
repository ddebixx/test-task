## User Management APP

This is a **User Management APP** built with **React + TypeScript + Vite** on top of the **JSONPlaceholder** API.

- **Users list**: browse users (name, email, city, company).
- **User details**: full profile (address, phone, website, company).
- **Posts & comments**: user posts and their comments.
- **User CRUD**: create / edit / delete users with validation and success toasts.
- **Extras**: **full offline support (PWA)**, offline‑aware UX, unit tests, and static build ready for deployment.

---

## Recommended npm scripts

- **Install dependencies**

```bash
npm install
```

- **Run all checks (before dev)**

```bash
npm run check
# Biome lint + vitest (CI) + knip
```

- **Start dev server (with checks first)**

```bash
npm run dev
# runs `npm run check` then starts Vite
```

- **Other**

```bash
npm run build      # production build
npm run preview    # preview production build
npm run lint       # Biome lint
npm run lint:fix   # Biome fix
npm run test       # vitest (watch)
npm run test:ci    # vitest (CI)
npm run knip       # unused files/exports
```

---

## Testing Offline Functionality

The app is a **Progressive Web App (PWA)** that works completely offline:

1. **First visit (online)**:
   - Open the app in your browser
   - Browse users, view details, posts, and comments
   - The Service Worker caches all assets and API responses

2. **Test offline mode**:
   - Open DevTools → Network tab
   - Check "Offline" checkbox
   - **Refresh the page** or open a new tab
   - ✅ The app loads instantly from cache
   - ✅ You see a yellow banner: "You are offline. Using cached data."
   - ✅ All previously loaded data is available

3. **Mutations while offline**:
   - Try to create/edit/delete a user while offline
   - Mutations are **queued automatically**
   - Go back online
   - ✅ Queued mutations execute automatically

4. **Install as PWA** (optional):
   - Chrome/Edge: Look for install icon in address bar
   - The app runs as a standalone application
   - Opens in its own window without browser chrome

---

## Why it was implemented this way

- **Type safety & validation**
  - TypeScript + **Zod** schemas in `src/types/types.ts` ensure JSONPlaceholder responses match the expected shape.
  - Fetchers in `src/fetchers/**` are the single source of truth for HTTP + validation.

- **Offline‑first architecture**
  - **Service Worker + PWA** (via `vite-plugin-pwa`) caches the entire app (HTML, CSS, JS, and API responses).
  - The app **works completely offline** – you can refresh the page or open a new tab without connection.
  - **TanStack React Query** manages caching, background refetching, and network status.
  - `PersistQueryClientProvider` + `createSyncStoragePersister` store queries in `localStorage`, so:
    - data is available offline when previously loaded,
    - mutations are paused while offline and resumed automatically.
  - **Offline indicator** shows a banner when you're working with cached data.
  - **NetworkFirst** strategy for API calls ensures fresh data when online, cached data when offline.
  - Queries use `onlineManager` and `useIsRestoring` to show clear loading, error, and offline‑no‑data states.

- **Clear separation of concerns**
  - Feature modules in `src/features/**` (`UsersList`, `UserManagement`, `UserPosts`, `UserCard`).
  - Fetchers (`src/fetchers/**`) and mutations (`src/mutations/**`) keep data logic out of components.
  - `usePagination` in `src/hooks/usePagination.ts` centralizes pagination for users and posts.
  - Shared UI primitives live in `src/components/ui/**`.

- **Consistent, accessible UI**
  - **TailwindCSS + twMerge** via `cn` helper for safe class merging.
  - **Radix UI** primitives (Dialog, AlertDialog, Avatar) wrapped in project components for accessibility and reuse.
  - Skeletons, cards, dialogs, pagination, and toasts provide a polished UX.

---

## Architecture

- `src/main.tsx` – app bootstrap, React Query client, persistence, global `Toaster`.
- `src/App.tsx` – routing:
  - `/` – users list
  - `/users/manage` – user CRUD
  - `/users/:slug` – user details + posts/comments.
- `src/pages/**` – page shells wiring features together.
- `src/features/**` – feature modules (list, details, posts, management).
- `src/fetchers/**` & `src/mutations/**` – API access and mutations, fully typed and validated.
- `src/components/ui/**` – shared UI components.
- `src/hooks/usePagination.ts` – generic pagination hook.

---

## How this maps to the recruitment task

- **Lista użytkowników / Users list** – `/` route with name, email, city, company from `GET /users`.
- **Szczegóły użytkownika / User details** – `/users/:slug` with full address, phone, website, and company.
- **Posty i komentarze / Posts & comments** – posts (`GET /posts?userId={id}`) and comments per post on the user detail page.
- **CRUD użytkowników / User CRUD** – create/edit/delete via POST/PUT/DELETE, Zod‑validated forms, success notifications.
- **Mile widziane** – **full offline PWA support** (works even when refreshing offline), offline‑aware UX with indicator, unit tests, and a static Vite build ready for hosting (e.g. Cloudflare Pages, Vercel).
