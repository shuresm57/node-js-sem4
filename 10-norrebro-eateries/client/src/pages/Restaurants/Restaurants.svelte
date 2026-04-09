<script>

    import { onMount } from 'svelte';

    let restaurants;


    // we only want to serve the restaurants when mounting the page
    // else, we risk memory leaks
    onMount(() => {
        fetch('http://localhost:8080/api/restaurants')
        .then((response) => response.json())
        .then((result) => restaurants = result.data);
    });

</script>

<h1>Restaurants</h1>

{#each restaurants as restaurant}
    <h4>{restaurant}</h4>
{/each}