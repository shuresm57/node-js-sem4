<script>
  import { Router, Route } from 'svelte-routing';
  import Login from './pages/Login.svelte';
  import Home from './pages/Home.svelte';
  import { Toaster } from 'svelte-sonner';
</script>
<Toaster position="bottom-center" richColors />
<Router>
  <Route path="/"><Login /></Route>
  <Route path="/home"><Home /></Route>
</Router>