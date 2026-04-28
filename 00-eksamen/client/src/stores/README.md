# Stores

## userStore.svelte.js

All this file holdes is a `$state` object called `userStore`.

The reason for this, is that we want to bind an to the result of a fetch, so that we can validate whether or not a user is authorized or not, which is used in the PrivateRoutes and fetched in App.svelte.

```javascript
onMount(async () => {
    const response = await fetchGet('/api/home');
    if(response?.ok){
      const data = await response.json();
      userStore.user = { username: data.data.username };
    }
    userStore.authChecked = true;
  })

```

I added the `authChecked` since without it, there was a race condition, which rendered the user to always be unauthorized.