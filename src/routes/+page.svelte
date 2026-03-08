<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(() => {
    // Auto-login for demo purposes
    goto("/auth/login");
  });
</script>
