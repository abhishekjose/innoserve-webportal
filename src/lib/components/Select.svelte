<script>
  import { DS } from '$lib/data.js';
  export let label = '';
  export let value = '';
  export let options = [];
  export let className = '';
</script>

<div class="flex flex-col gap-1.5 {className}">
  {#if label}
    <label class="text-xs font-semibold uppercase tracking-widest" style="color: {DS.colors.textMuted}">{label}</label>
  {/if}
  <select
    bind:value
    on:change
    class="w-full rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
    style="background: {DS.colors.surface}; border: 1px solid {DS.colors.border}; color: {DS.colors.text};"
  >
    {#each options as o}
      <option value={o.value ?? o}>{o.label ?? o}</option>
    {/each}
  </select>
</div>
