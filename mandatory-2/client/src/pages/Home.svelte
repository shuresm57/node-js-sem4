<script>
  import { onMount } from 'svelte';
  import { fetchGet } from '../util/fetchUtil';

  onMount(async () => {
    const response = await fetchGet('/api/home');
    if (!response || !response.ok) {
      window.location.href = '/';
      return;
    }
    const data = await response.json();
  });
</script>
<div class="page-bg home-bg">
  <h1>We are happy that you joined!</h1>
</div>

