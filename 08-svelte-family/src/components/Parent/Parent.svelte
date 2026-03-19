<script>
  import Child from "../Child/Child.svelte";

    let { name, children } = $props();


    function handleShowLove(name) {
        console.log(`${name} loves you`);
    }

    let cookieJar = $state(['🍪', '🍪', '🍪', '🍪']);

    let drinkPantry = $state(['🍼', '🍼', '🍼'])

    function handleGrabACookie() {
        cookieJar.pop()
    }

    /* ASSIGNMENT
     create a cookie jar in the parent
     a child should be able to take a cookie
     which should remove the cookie from the jar
     use the correct ...on and. ..ahndle convention
     🍪🍪🍪
    */
</script>

<h1>
    My name is {name}
</h1>


{#each drinkPantry as drink}
    <p>{drink}</p>
{/each}


{#each cookieJar as cookie}
    <p>{cookie}</p>
{/each}

{#each children as child(child.name)}
    <Child {...child} onShowLove={handleShowLove} onGrabACookie={handleGrabACookie} drinkPantry={drinkPantry}/>
{/each}