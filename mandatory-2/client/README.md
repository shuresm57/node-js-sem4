# Client

Svelte 5 + Vite SPA. Uses [`svelte-routing`](https://github.com/EmilTholin/svelte-routing) for client-side routing (not SvelteKit — this app has no SSR), and [`svelte-sonner`](https://github.com/wobsoriano/svelte-sonner) for toast notifications.

## Running

```bash
npm install
npm run dev      # http://localhost:5173
```

The dev server expects `VITE_BASE_URL` to point at the backend in `.env`:

```
VITE_BASE_URL=http://localhost:8080
```

## Layout

```
src/
  App.svelte           # mounts <Router>, runs the initial /api/home auth check
  main.js              # Vite entry point
  pages/               # one component per route, plus the Private Routes wrapper
  stores/
    userStore.svelte.js   # { user, authChecked } — see Private Routes docs
  util/
    fetchUtil.js          # fetchGet / fetchPost wrappers (sets credentials: 'include')
    authService.svelte.js # handleLogin, handleSignup, etc.
```

## fetch with credentials

`fetchUtil.js` sets `credentials: 'include'` on every request. This is what tells the browser to send the JWT cookie cross-origin to `localhost:8080`. Without it, the cookie set by `/api/login` would never be sent back, and `requireAuth` would always 401.

```javascript
const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
  credentials: 'include'
});
```

The backend has to allow this with `cors({ origin: 'http://localhost:5173', credentials: true })` — the two have to match.

## Auth state

`userStore.svelte.js` is a tiny `$state` object — `{ user, authChecked }` — that the whole app reads from. `App.svelte` populates it on mount by calling `/api/home`; the protected routes consume it. See [`pages/`](./src/pages/README.md) for the private-route mechanics.
