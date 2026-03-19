<!--components are pascal case when naming the files-->
<script>
    import { fridgeMessages } from '../../stores/fridgeStore.js'
</script>

{#each $fridgeMessages as fridgeMessage}
    <p>{fridgeMessage.name || 'Household'}: {fridgeMessage.message}</p>
{/each}

<slot></slot>

<div id="welcome-mat">
    <p>
        Go Away
    </p>
</div>

<style>
    #welcome-mat {
        color: azure;
        background-color: #6f4e37;
        padding: 2rem;
        margin: 0 20rem 0 20rem;
        border-radius: 0 0 2rem 2rem;
    }
</style>
