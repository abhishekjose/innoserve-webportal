<script lang="ts">
  import { onMount } from "svelte";
  import { page as pageStore } from "$app/stores";
  import { DS, ROLES, NAV_ITEMS, ROLE_PAGES } from "$lib/data.js";
  import NotificationsList from "$lib/components/ui/NotificationsList.svelte";
  let sidebarOpen = true;
  let showNotifs = false;
  let pageLabel = "Dashboard";
  let authed = true;
  let role = "Super Admin";
  let roleInitials = "SA";
  let roleFirstName = "Super";
  onMount(() => {
    pageLabel = $pageStore.url.pathname.split("/").pop() || "dashboard";
  });
</script>

<header
  class="flex items-center justify-between px-6 py-3 shrink-0 sticky top-0 z-30"
  style="background: {DS.colors.surface}EE; border-bottom: 1px solid {DS.colors
    .border}; backdrop-filter: blur(12px);"
>
  <div class="flex items-center gap-3">
    <button
      on:click={() => (sidebarOpen = !sidebarOpen)}
      class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
      style="color: {DS.colors.textMuted};">☰</button
    >
    <div
      class="hidden md:flex items-center gap-2 text-xs"
      style="color: {DS.colors.textMuted};"
    >
      <span>SmartTicket</span>
      <span>›</span>
      <span style="color: {DS.colors.text}; font-weight: 600;">{pageLabel}</span
      >
    </div>
  </div>

  <div class="flex items-center gap-2">
    <!-- Notifications -->
    <div class="relative">
      <button
        on:click={() => (showNotifs = !showNotifs)}
        class="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/10 relative"
        style="color: {DS.colors.textDim}; background: {DS.colors
          .surfaceHigh}; border: 1px solid {DS.colors.border};"
      >
        🔔
        <span
          class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center"
          style="background: {DS.colors.danger}; color: #fff;">2</span
        >
      </button>
      {#if showNotifs}
        <div
          class="absolute right-0 top-12 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden"
          style="background: {DS.colors.surfaceHigh}; border: 1px solid {DS
            .colors.border};"
        >
          <div
            class="px-4 py-3 flex justify-between items-center"
            style="border-bottom: 1px solid {DS.colors.border};"
          >
            <span class="font-bold text-sm" style="color: {DS.colors.text};"
              >Notifications</span
            >
            <span
              class="text-xs cursor-pointer"
              style="color: {DS.colors.accent};">Mark all read</span
            >
          </div>
          <NotificationsList />
        </div>
      {/if}
    </div>

    <!-- User / Logout -->
    <button
      class="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors"
      style="border: 1px solid {DS.colors.border};"
      on:click={() => {
        authed = false;
      }}
    >
      <div
        class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
        style="background: {DS.colors.accent}33; color: {DS.colors.accent};"
      >
        {roleInitials}
      </div>
      <span
        class="text-xs font-semibold hidden md:block"
        style="color: {DS.colors.text};">{roleFirstName}</span
      >
    </button>
  </div>
</header>
