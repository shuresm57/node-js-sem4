<script>

    let { name, familySheep, isGirl } = $props();

</script>

<div
    class={familySheep || "not-a-sheep"}
    class:is-girl={isGirl}
    class:is-boy={!isGirl}
>
    <h3>I'm just a baby :( known as {name}</h3>
</div>

<style>
    div {
        color: white;
    }

    .black-sheep {
        background-color: green;
    }

    .grey-sheep {
        background-color: yellow;
    }

    .not-a-sheep {
        background-color: plum;
    }

    .is-girl {
        border: 0.5rem  dashed palegoldenrod;
    }

    .is-boy {
        border: 0.5rem solid slateblue;
    }
</style>