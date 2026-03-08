<script>
  import { DS } from '$lib/data.js';
  export let columns = [];
  export let data = [];
  export let onRowClick = null;
</script>

<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr style="border-bottom: 1px solid {DS.colors.border};">
        {#each columns as col}
          <th
            class="px-4 py-3 text-left font-semibold uppercase tracking-widest text-xs whitespace-nowrap"
            style="color: {DS.colors.textMuted};"
          >
            {col.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-interactive-element-to-noninteractive-role -->
        <tr
          on:click={() => onRowClick && onRowClick(row)}
          class="transition-colors duration-150 hover:bg-blue-500/5 {onRowClick ? 'cursor-pointer' : ''}"
          style="border-bottom: 1px solid {DS.colors.border}30;"
        >
          {#each columns as col}
            <td class="px-4 py-3 whitespace-nowrap" style="color: {DS.colors.textDim};">
              {#if col.render}
                {@html col.render(row[col.key], row)}
              {:else}
                {row[col.key] ?? ''}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
