<script>
  import Child from "../Child/Child.svelte";

    let { name, children } = $props();



</script>

<h1>
    My name is {name}
</h1>

{#each children as child(child.name)}
    <Child {...child}/>
{/each}