<script>
  import Card from './Card.svelte';
  import { DS } from '$lib/data.js';
  export let label = '';
  export let value = '';
  export let icon = '';
  export let color = DS.colors.accent;
  export let trend = null;
</script>

<Card className="p-5 flex flex-col gap-3 hover:border-blue-500/50 transition-all duration-300 group">
  <div class="flex items-start justify-between">
    <div class="flex flex-col gap-1">
      <span class="text-xs font-semibold uppercase tracking-widest" style="color: {DS.colors.textMuted};">{label}</span>
      <span class="text-3xl font-black tracking-tight" style="color: {DS.colors.text};">{value}</span>
    </div>
    <div
      class="w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-transform group-hover:scale-110"
      style="background: {color}22; color: {color};"
    >
      {icon}
    </div>
  </div>
  {#if trend !== null && trend !== undefined}
    <span class="text-xs font-medium" style="color: {trend > 0 ? DS.colors.success : DS.colors.danger};">
      {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last week
    </span>
  {/if}
</Card>
