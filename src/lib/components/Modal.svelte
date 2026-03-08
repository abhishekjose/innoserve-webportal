<script>
  import { DS } from '$lib/data.js';
  export let open = false;
  export let title = '';
  export let width = 'max-w-2xl';

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) dispatch('close');
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

{#if open}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    style="background: #00000088;"
    on:click={handleBackdrop}
    role="dialog"
    aria-modal="true"
    on:keydown={() => {}}
  >
    <div
      class="w-full {width} rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      style="background: {DS.colors.surfaceHigh}; border: 1px solid {DS.colors.border};"
    >
      <div class="flex items-center justify-between px-6 py-4" style="border-bottom: 1px solid {DS.colors.border};">
        <h2 class="font-bold text-lg" style="color: {DS.colors.text};">{title}</h2>
        <button
          on:click={() => dispatch('close')}
          class="w-8 h-8 rounded-lg flex items-center justify-center text-lg hover:bg-red-500/20 transition-colors"
          style="color: {DS.colors.textMuted};"
        >✕</button>
      </div>
      <div class="p-6">
        <slot />
      </div>
    </div>
  </div>
{/if}
