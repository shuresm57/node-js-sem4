<script>
  import { handleLogout } from '../util/authService.svelte.js';
  import { Link } from 'svelte-routing';
</script>

<nav class="navbar">
  <div class="nav-links">
    <Link to='/home'>Home</Link>
    <Link to='/about'>About</Link>
    <a href='https://ratchetandclank.fandom.com/wiki/Ratchet_%26_Clank_Wiki:Main_Page' target="_blank" rel="noreferrer">Wiki</a>
  </div>
  <button class="button-2" onclick={handleLogout}>Logout</button>
</nav>
