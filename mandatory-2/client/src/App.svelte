<script>
  import { Router, Route } from 'svelte-routing';
  import { Toaster } from 'svelte-sonner';
  import { onMount } from 'svelte';

  import Login from './pages/Login.svelte';
  import Home from './pages/Home.svelte';
  import About from './pages/About.svelte';
  import ResetPassword from './pages/ResetPassword.svelte';
  import PrivateRoute from './pages/PrivateRoute.svelte';
  
  import { fetchGet } from './util/fetchUtil.js';
  import { userStore } from './stores/userStore.svelte.js';

  onMount(async () => {
    const response = await fetchGet('/api/home');
    if(response?.ok){
      const data = await response.json();
      userStore.user = { username: data.data.username };
    }
  })

</script>
<Toaster position="top-center" richColors />
<Router>
  <Route path="/"><Login /></Route>
  <PrivateRoute path="/home"><Home /></PrivateRoute>
  <PrivateRoute path="/about"><About /></PrivateRoute>
  <Route path="/reset-password"><ResetPassword /></Route>
</Router>