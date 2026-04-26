<script>
  import { Link } from 'svelte-routing';
  import { handleLogout } from '../util/authService.svelte.js';
</script>

<nav>
  <div>
    <Link to='/home'>Home</Link>
    <Link to='/about'>About</Link>
  </div>
  <button type="button" onclick={handleLogout}>Logout</button>
</nav>
