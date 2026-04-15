<script>
  import { handleLogout } from '../util/authService.svelte.js';
  import { Link } from 'svelte-routing';
</script>
<div class="page-bg home-bg">
  <nav class="navbar">
    <div class="nav-links">
      <Link to='/home'>Home</Link>
      <Link to='/about'>About</Link>
      <a href='https://ratchetandclank.fandom.com/wiki/Ratchet_%26_Clank_Wiki:Main_Page' target="_blank" rel="noreferrer">Wiki</a>
    </div>
    <button class="button-2" onclick={handleLogout}>Logout</button>
  </nav>
  <h1 class=home-page-header>We are happy that you joined!</h1>
  <div class=home-div>
      <p>Thanks for joining the (unofficial) Rachet and Clank Fanclub!</p>
  </div>
  <footer>
    Ratchet & Clank is a registered trademark of Sony Interactive Entertainment LLC. 
    This is an unofficial fan site and is not affiliated with or endorsed by Sony Interactive Entertainment.
  </footer>
</div>

