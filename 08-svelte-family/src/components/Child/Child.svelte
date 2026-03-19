<script>

    let { name, familySheep, isGirl, onShowLove, onGrabACookie, drinkPantry = $bindable() } = $props();

    import { fridgeMessages } from "../../stores/fridgeStore.js";

    let fridgeMessageInput = $state('');

    function handleSubmitFridgeMessage() {
        const fridgeMessageToCreate = {
            name,
            message: fridgeMessageInput
        };
        // $fridgeMessages.push(fridgeMessageToCreate);
        // fridgeMessages.set($fridgeMessages);
        fridgeMessages.update((fridgeMessageStoreValue) => {
            fridgeMessageStoreValue.push(fridgeMessageToCreate);
            return fridgeMessageStoreValue
        })
        fridgeMessageInput = '';
    }
</script>

<div
    class={familySheep || "not-a-sheep"}
    class:is-girl={isGirl}
    class:is-boy={!isGirl}
>
    <h3>I'm just a baby :( known as {name}</h3>
</div>

<button onclick={() => onShowLove(name)}>
    Show love ❤️❤️
</button>

<button onclick={onGrabACookie}>
    Grab the cookie
</button>

<button onclick={() => drinkPantry.pop()}>
    Have a drink
</button>
<br>
<input bind:value="{fridgeMessageInput}" placeholder="Type your fridge message here">
<button onclick={handleSubmitFridgeMessage}>Write the fridge message</button>


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