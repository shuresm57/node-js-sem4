<script>
    let { venue = {}, shows = [] } = $props();
</script>

<div class="bg-surface border border-border rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
    <div class="flex items-center gap-4 mb-6">
        <div class="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-text">V</div>
        <div>
            <h2 class="font-serif text-accent text-2xl font-bold tracking-wide">{venue.name ?? 'Venue Name'}</h2>
            <p class="text-muted text-sm">{venue.contact_email ?? 'venue@example.com'}</p>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-bg border border-border rounded-lg px-4 py-3">
            <p class="text-muted text-xs uppercase tracking-widest mb-1">Address</p>
            <p class="text-text font-medium">{venue.address ?? ''}</p>
        </div>
        <div class="bg-bg border border-border rounded-lg px-4 py-3">
            <p class="text-muted text-xs uppercase tracking-widest mb-1">Capacity</p>
            <p class="text-text font-medium">{venue.capacity ?? ''}</p>
        </div>
    </div>

    <div>
        <h3 class="text-muted text-sm uppercase tracking-widest font-semibold mb-3">Shows</h3>
        <div class="flex flex-col gap-2">
            {#each shows as show}
                <div class="bg-bg border border-border rounded-lg px-4 py-3 flex justify-between items-center">
                    <div>
                        <p class="text-text font-medium">{show.artist_name}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-accent font-semibold">{show.date}</p>
                        <p class="text-muted text-sm">Doors {show.doors_time} · Show {show.show_time}</p>
                    </div>
                </div>
            {:else}
                <p class="text-muted text-sm">No shows scheduled.</p>
            {/each}
        </div>
    </div>
</div>
