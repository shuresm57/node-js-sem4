<script>
  import { Router, Route } from "svelte-routing";
  import { Toaster } from 'svelte-sonner';

  import Navbar from "./components/Navbar.svelte";
  import Home from "./pages/Home.svelte";
  import WhyUs from "./pages/WhyUs.svelte";
  import Contact from "./pages/Contact.svelte";
</script>

<Toaster position="bottom-right"></Toaster>
<Router>
  <Route path="/">
    <Navbar><Home /></Navbar>
  </Route>
  <Route path="/why-us">
    <Navbar><WhyUs /></Navbar>
  </Route>
  <Route path="/contact">
    <Navbar><Contact /></Navbar>
  </Route>
</Router>
