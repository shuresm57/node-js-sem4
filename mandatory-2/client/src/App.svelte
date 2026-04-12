<script>
  // This could be done in $stores, maybe we should do that 
  import { Router, Link, Route } from 'svelte-routing';
  import Login from './pages/Login.svelte';
</script>
<Router>
  <div>
      <Login />
  </div>
</Router>