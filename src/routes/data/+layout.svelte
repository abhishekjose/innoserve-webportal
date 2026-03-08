<script lang="ts">
  import { DS, ROLES, NAV_ITEMS, ROLE_PAGES } from "$lib/data.js";
  import Sidebar from "$lib/components/ui/Sidebar.svelte";
  import Topbar from "$lib/components/ui/Topbar.svelte";
  let { children } = $props();
</script>

<div
  class="min-h-screen flex"
  style="background: {DS.colors
    .bg}; font-family: 'DM Sans', system-ui, sans-serif;"
>
  <Sidebar />
  <div class="flex-1 flex flex-col max-h-screen overflow-auto">
    <Topbar />
    <main class="flex-1 p-6 overflow-y-auto">
      {@render children()}
    </main>
  </div>
</div>
