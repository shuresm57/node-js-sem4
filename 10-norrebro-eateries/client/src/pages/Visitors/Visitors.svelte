<script>

    import { onMount } from 'svelte';

    let visitorsCount;

    onMount(async () => {
        const response = await fetch('http://localhost:8080/api/visitors', {
            credentials: 'include'
        })
        const result = await response.json();
        visitorsCount = result.data;
    });

    async function visitRestaurant() {
        const response = await fetch('http://localhost:8080/api/visitors', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        visitorsCount = result.data;
    }

</script>

<h1>Visitors</h1>

<h3>{visitorsCount}</h3>

<button onclick={visitRestaurant}>Visit</button>