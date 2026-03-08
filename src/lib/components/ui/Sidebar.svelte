<script lang="ts">
  import { page as pageStore } from "$app/stores";
  import { goto } from "$app/navigation";
  import { DS, ROLES, NAV_ITEMS, ROLE_PAGES } from "$lib/data.js";

  let sidebarOpen = true;
  let role: keyof typeof ROLE_PAGES = "Super Admin";

  $: allowedPages = ROLE_PAGES[role] || ["dashboard"];
  $: navItems = NAV_ITEMS.filter((n) => allowedPages.includes(n.id));
  $: page = $pageStore.url.pathname.split("/").pop() || "dashboard";
</script>

<aside
  class="shrink-0 flex flex-col transition-all duration-300"
  style="
        width: {sidebarOpen ? 220 : 64}px;
        background: {DS.colors.surface};
        border-right: 1px solid {DS.colors.border};
        max-height: 100vh;
      "
>
  <!-- Logo -->
  <div
    class="flex items-center gap-3 px-4 py-5"
    style="border-bottom: 1px solid {DS.colors.border};"
  >
    <div
      class="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0"
      style="background: linear-gradient(135deg, {DS.colors.accent}, {DS.colors
        .purple});"
    >
      🎫
    </div>
    {#if sidebarOpen}
      <span
        class="font-black text-sm tracking-tight"
        style="color: {DS.colors.text};">SmartTicket</span
      >
    {/if}
  </div>

  <!-- Nav -->
  <nav class="flex-1 py-4 flex flex-col gap-1 px-2">
    {#each navItems as n}
      <button
        on:click={() => goto("/data/" + n.id)}
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 w-full text-left"
        style="
              background: {page === n.id
          ? DS.colors.accent + '22'
          : 'transparent'};
              color: {page === n.id ? DS.colors.accent : DS.colors.textMuted};
              border-left: 3px solid {page === n.id
          ? DS.colors.accent
          : 'transparent'};
            "
      >
        <span class="text-base shrink-0">{n.icon}</span>
        {#if sidebarOpen}<span>{n.label}</span>{/if}
      </button>
    {/each}
  </nav>

  <!-- Role Badge -->
  {#if sidebarOpen}
    <div class="px-4 py-4" style="border-top: 1px solid {DS.colors.border};">
      <div class="p-3 rounded-xl" style="background: {DS.colors.surfaceHigh};">
        <p class="text-xs font-bold" style="color: {DS.colors.text};">
          {role}
        </p>
        <p class="text-xs mt-0.5" style="color: {DS.colors.textMuted};">
          Current Session
        </p>
      </div>
    </div>
  {/if}
</aside>
