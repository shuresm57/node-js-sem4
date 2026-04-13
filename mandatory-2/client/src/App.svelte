<script>
  // This could be done in $stores, maybe we should do that
  import { Router, Link, Route } from 'svelte-routing';
  import Login from './pages/Login.svelte';
  import { Toaster } from 'svelte-sonner';
</script>
<Toaster />
<Router>
  <div>
      <Login />
  </div>
</Router>