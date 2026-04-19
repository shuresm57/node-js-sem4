# Pages

One Svelte component per route, plus the two helper components that implement the private-route pattern.

| File | Route | Notes |
|---|---|---|
| `Login.svelte` | `/` | Login, signup, and password recovery views (toggled by local state) |
| `Home.svelte` | `/home` | Protected — wrapped in `<PrivateRoute>` |
| `About.svelte` | `/about` | Protected — wrapped in `<PrivateRoute>` |
| `ResetPassword.svelte` | `/reset-password` | Public — reached via the email link |
| `PrivateRoute.svelte` | — | Wraps `<Route>` and delegates to the guard |
| `PrivateRouteGuard.svelte` | — | Renders children if authed, redirects to `/` otherwise |

## Private Routes

Private routes are a way to gate parts of the app behind authentication, so the user is redirected to login if they try to visit a protected page without being signed in.

The starter pattern from sveltestarterkit.com uses `svelte-navigator` and Svelte 4 syntax. To make it work in this project we use `svelte-routing` and Svelte 5 runes, so the syntax is a bit different — `navigate` is imported directly from `svelte-routing` instead of a `useNavigate()` hook, `<slot>` becomes a snippet, and `$:` becomes `$effect`.

The guard itself looks like this:

```javascript
<script>
  import { navigate } from 'svelte-routing';
  import { userStore } from '../stores/userStore.svelte.js';

  let { children } = $props();

  $effect(() => {
    if (userStore.authChecked && !userStore.user) {
      navigate('/', { replace: true });
    }
  });
</script>

{#if userStore.authChecked && userStore.user}
  {@render children()}
{/if}
```

We use an `authChecked` flag on the store, because on a full page reload the in-memory `userStore` resets to `null`. Without the flag the guard would redirect to login before the async `/api/home` request had a chance to confirm the session cookie, so even valid users would get kicked out.

```javascript
export const userStore = $state({ user: null, authChecked: false });
```

`App.svelte` flips the flag once the check resolves, regardless of the outcome:

```javascript
onMount(async () => {
  const response = await fetchGet('/api/home');
  if (response?.ok) {
    const data = await response.json();
    userStore.user = { username: data.data.username };
  }
  userStore.authChecked = true;
});
```

It is important to note that the frontend guard alone is not enough — anyone can edit the store from the browser console and bypass it. The actual access control happens on the backend, where the `requireAuth` middleware verifies the JWT cookie before the route handler runs. The frontend guard is there to keep the UX clean and avoid flashing protected content.

## Sources

The pattern is adapted from a few places — no single source covers this exact stack (`svelte-routing` + Svelte 5 runes + `authChecked`), since most modern Svelte auth tutorials use SvelteKit and the `svelte-routing` ones predate Svelte 5.

> [Private Route in Svelte not SvelteKit (Medium)](https://medium.com/@zayminmaw/private-route-in-svelte-not-sveltekit-2233958a1236) — guard-component pattern for `svelte-routing` (pre-runes). \
> [Svelte Starter Kit – SPA Protected Routes](http://sveltestarterkit.com/blog/sveltekit-spa-protected-routes) — original starter pattern using `svelte-navigator`. \
> [svelte-navigator private-routes example](https://github.com/mefechoel/svelte-navigator/tree/main/example/private-routes) — referenced in the assignment brief; shape we copied. \
> [Svelte 5 migration guide](https://svelte.dev/docs/svelte/v5-migration-guide) — for `<slot>` → snippet and `$:` → `$effect`. \
> [How to await Firebase Auth with SvelteKit (Captain Codeman)](https://www.captaincodeman.com/how-to-await-firebase-auth-with-sveltekit) — same class of bug (auth state not yet settled on refresh) in a different stack. \
> [Content Flash in Protected Route (Auth0 community)](https://community.auth0.com/t/content-flash-in-protected-route-with-react-hoc/122741) — describes the redirect-flash bug the `authChecked` flag solves.
