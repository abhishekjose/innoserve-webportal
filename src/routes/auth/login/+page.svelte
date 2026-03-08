<script lang="ts">
  import { goto } from "$app/navigation";
  import LoginPage from "$lib/modules/auth/LoginPage.svelte";

  const handleLogin = (event: any) => {
    const selectedRole = event.detail;
    // For demo, just log the role. In a real app, you'd set auth state here.
    console.log("Logged in as:", selectedRole);
    goto("/data/dashboard");
  };
</script>

<LoginPage on:login={handleLogin} />
