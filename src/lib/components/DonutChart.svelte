<script>
  import { DS } from '$lib/data.js';
  export let segments = [];
  export let size = 80;

  const r = 28, cx = 40, cy = 40;
  const circumference = 2 * Math.PI * r;

  $: total = segments.reduce((a, s) => a + s.value, 0);
  $: computed = (() => {
    let offset = 0;
    return segments.map(s => {
      const pct = s.value / total;
      const dash = pct * circumference;
      const gap = circumference - dash;
      const dashOffset = -offset * circumference;
      offset += pct;
      return { ...s, dash, gap, dashOffset };
    });
  })();
</script>

<svg viewBox="0 0 80 80" style="width: {size}px; height: {size}px;">
  {#each computed as s}
    <circle
      {cx} {cy} r={r}
      fill="none"
      stroke={s.color}
      stroke-width="10"
      stroke-dasharray="{s.dash} {s.gap}"
      stroke-dashoffset={s.dashOffset}
      transform="rotate(-90 {cx} {cy})"
      stroke-linecap="butt"
    />
  {/each}
  <circle {cx} {cy} r="22" fill={DS.colors.surfaceHigh} />
</svg>
