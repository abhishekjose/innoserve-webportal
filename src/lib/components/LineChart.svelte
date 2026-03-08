<script>
  import { DS } from '$lib/data.js';
  export let data = [];
  export let color = DS.colors.accent;
  export let height = 80;

  const W = 300;
  $: max = data.length ? Math.max(...data.map(d => d.value)) : 1;
  $: min = data.length ? Math.min(...data.map(d => d.value)) : 0;
  $: range = max - min || 1;
  $: pts = data.map((d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * (W - 20) + 10;
    const y = height - 10 - ((d.value - min) / range) * (height - 20);
    return `${x},${y}`;
  }).join(' ');
  $: circles = data.map((d, i) => ({
    cx: (i / Math.max(data.length - 1, 1)) * (W - 20) + 10,
    cy: height - 10 - ((d.value - min) / range) * (height - 20),
  }));
  $: gradId = `grad-${color.replace('#','')}`;
</script>

{#if data.length}
<svg viewBox="0 0 {W} {height}" class="w-full" style="height: {height}px;">
  <defs>
    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color={color} stop-opacity="0.3" />
      <stop offset="100%" stop-color={color} stop-opacity="0.02" />
    </linearGradient>
  </defs>
  <polyline points={pts} fill="none" stroke={color} stroke-width="2" stroke-linejoin="round" />
  {#each circles as c}
    <circle cx={c.cx} cy={c.cy} r="3" fill={color} />
  {/each}
</svg>
{/if}
