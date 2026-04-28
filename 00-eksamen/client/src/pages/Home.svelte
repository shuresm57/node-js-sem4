<script>
  import { onMount } from 'svelte';
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import ArtistDashboard from './artist/ArtistDashboard.svelte';
  import VenueDashboard from './venue/VenueDashboard.svelte';
  import { fetchGet } from '../util/fetchUtil.js';

  let artist = $state(null);
  let venue = $state(null);

  onMount(async () => {
    const [artistRes, venueRes] = await Promise.all([
      fetchGet('/api/artist'),
      fetchGet('/api/venue')
    ]);

    if (artistRes?.ok) {
      artist = await artistRes.json();
    }

    if (venueRes?.ok) {
      venue = await venueRes.json();
    }
  });
</script>

<div class="min-h-screen bg-bg flex flex-col">
  <Navbar />
  <main class="flex-1 flex justify-center items-start p-8">
    {#if artist}
      <ArtistDashboard {artist} shows={artist.shows} />
    {:else if venue}
      <VenueDashboard {venue} shows={venue.shows} />
    {/if}
  </main>
  <Footer />
</div>
