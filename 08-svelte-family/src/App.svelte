<script>
  import Home from "./components/Home/Home.svelte";
  import Parent from "./components/Parent/Parent.svelte";
  
  const parents = ["Brian", "Majbritt"];

  const children = [
    {
      name: "Anders",
      familySheep: "black-sheep"
    },
    {
      name: "Kristian",
      familySheep: "grey-sheep"
    },
    {
      name: "Mikkel",
      isGirl: true
    }
  ]

</script>


<!-- self-closing tag -->
<!-- <Home /> -->
<Home>
  <Parent name={parents[0]} children={children}/>
  <Parent name={parents[1]} children={children}/>
</Home>