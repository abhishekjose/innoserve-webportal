<script>
  export let color = 'blue';
  export let size = 'sm';

  const colors = {
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    green: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    yellow: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    gray: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  };
  const sizes = { sm: 'text-xs px-2 py-0.5', md: 'text-sm px-3 py-1' };
</script>

<span class="inline-flex items-center gap-1 rounded-full border font-medium {colors[color]} {sizes[size]}">
  <slot />
</span>
