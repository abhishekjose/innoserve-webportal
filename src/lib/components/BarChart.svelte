<script>
  import { DS } from '$lib/data.js';
  export let data = [];
  export let color = DS.colors.accent;
  export let height = 100;

  $: max = Math.max(...data.map(d => d.value));
</script>

<svg viewBox="0 0 {data.length * 40} {height + 30}" class="w-full" style="height: {height}px;">
  {#each data as d, i}
    {@const barH = max ? (d.value / max) * (height - 20) : 0}
    {@const x = i * 40 + 8}
    {@const y = height - barH - 10}
    <g>
      <rect {x} {y} width="24" height={barH} rx="4" fill={color} opacity="0.8" />
      <text x={x + 12} y={height + 16} text-anchor="middle" fill={DS.colors.textMuted} font-size="9">{d.label}</text>
      <text x={x + 12} y={y - 4} text-anchor="middle" fill={DS.colors.textDim} font-size="9">{d.value}</text>
    </g>
  {/each}
</svg>
