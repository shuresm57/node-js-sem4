<script>
  import { Navbar, NavBrand, NavHamburger, NavUl, NavLi } from "flowbite-svelte";
  let { children } = $props();
</script>

<Navbar>
  <NavBrand href="/">
    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BetterTour</span>
  </NavBrand>
  <NavHamburger />
  <NavUl>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/why-us">Why BetterTour?</NavLi>
    <NavLi href="/contact">Contact</NavLi>
  </NavUl>
</Navbar>

<div class="max-w-prose mx-auto px-6 py-12">
  {@render children()}
</div>
