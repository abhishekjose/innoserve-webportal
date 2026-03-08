<script>
  import { DS } from '$lib/data.js';
  export let label = '';
  export let value = '';
  export let type = 'text';
  export let placeholder = '';
  export let className = '';
</script>

<div class="flex flex-col gap-1.5 {className}">
  {#if label}
    <label class="text-xs font-semibold uppercase tracking-widest" style="color: {DS.colors.textMuted}">{label}</label>
  {/if}
  <input
    {type}
    bind:value
    {placeholder}
    on:input
    class="w-full rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 transition-all"
    style="background: {DS.colors.surface}; border: 1px solid {DS.colors.border}; color: {DS.colors.text}; --tw-ring-color: {DS.colors.accent};"
  />
</div>
