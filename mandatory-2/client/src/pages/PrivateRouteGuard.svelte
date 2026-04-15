<script>
  import { navigate } from 'svelte-routing';
  import { userStore } from '../stores/userStore.svelte.js';

  let { children } = $props();

// $: is not allowed in runes mode, use $effect instead.
  $effect(() => {
    if (!userStore.user) {
      navigate('/', { replace: true });
    }
  });
</script>


<!-- <slot/ > is deprecated, use @render ... instead --> 

{#if userStore.user}
  {@render children()}
{/if}