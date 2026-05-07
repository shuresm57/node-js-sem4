# Pages

One page per route. All pages use [Footer.svelte](../components/Footer.svelte) and [Navbar.svelte](../components/Navbar.svelte), except Login and ResetPassword which skip the navbar.

| Route | Component | Protected |
|---|---|---|
| `/` | `Login.svelte` | No |
| `/home` | `Home.svelte` | Yes |
| `/about` | `About.svelte` | Yes |
| `/reset-password` | `ResetPassword.svelte` | No |

## userStore.svelte.js, PrivateRoute & PrivateRouteGuard

The userStore is an in-memory Svelte 5 state object holding the user and an authChecked flag.

authChecked flips to true after App.svelte's initial auth check resolves. Without it, PrivateRouteGuard would redirect valid users to login on every page refresh, since the store resets before the auth check has a chance to come back.

PrivateRouteGuard renders its children only when both flags are truthy, and redirects to the login page otherwise. 

The guard is UX-only, the real protection is in the requireAuth JWT middleware in the backend.

This is a frankenstein way of doing the PrivateRoutes, with inspiration from many sources. There doesn't seem to be one tutorial or doocumentation for implementing it with Svelte 5 and JS - only with deprecated Svelte versions and/or Sveltekit.

## Sources

> [Private Route in Svelte not SvelteKit (Medium, Zay Min Maw)](https://medium.com/@zayminmaw/private-route-in-svelte-not-sveltekit-2233958a1236) \
> [SvelteKit Protected Routes in SPA mode (Svelte Starter Kit)](http://sveltestarterkit.com/blog/sveltekit-spa-protected-routes) \
> [svelte-navigator private-routes example](https://github.com/mefechoel/svelte-navigator/tree/main/example/private-routes) \
> [Svelte 5 migration guide](https://svelte.dev/docs/svelte/v5-migration-guide) \
> [effect rune docs](https://svelte.dev/docs/svelte/$effect) \
