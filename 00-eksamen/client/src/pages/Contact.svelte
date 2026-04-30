<script>
  import { Textarea, Button } from "flowbite-svelte";
  import { Input } from "flowbite-svelte";
  import { toast } from 'svelte-sonner';
  let textareaprops = {
    id: "message",
    name: "message",
    label: "Your message",
    rows: 4,
    placeholder: "Leave a comment..."
  };

  let loading = $state(false);
  let contactMessage = $state('');
  let contactEmail = $state('');

  async function handleSubmit() {
    if(!contactMessage || !contactEmail  ){
        toast.error('Please fill out the form');
        return;
    }
    loading = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success('Thanks for reaching out! We will get back as soon as possible.')
    loading = false;
  }

</script>
<h1>Contact</h1>
<p>Don't hesitate to write us an email!</p>
<Textarea value={contactMessage} {...textareaprops} class="w-full" />
<div class="mb-6">
  <Input value={contactEmail} placeholder="Small input" />
</div>
<Button color="blue" onclick={handleSubmit} {loading}>Send</Button>


