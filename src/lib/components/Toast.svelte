<script>
  import { DS } from '$lib/data.js';
  export let toasts = [];
</script>

<div class="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
  {#each toasts as t (t.id)}
    <div
      class="px-4 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-3 animate-pulse"
      style="
        background: {t.type === 'success' ? DS.colors.success : t.type === 'error' ? DS.colors.danger : DS.colors.accent};
        color: #fff;
        min-width: 240px;
      "
    >
      {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'} {t.msg}
    </div>
  {/each}
</div>
