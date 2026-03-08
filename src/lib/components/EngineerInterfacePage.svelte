<script>
  import { DS, MOCK_TICKETS, MOCK_ENGINEERS, priorityColor, statusColor } from '$lib/data.js';
  import Card from '$lib/components/Card.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import Btn from '$lib/components/Btn.svelte';
  import Modal from '$lib/components/Modal.svelte';

  const engineerName = MOCK_ENGINEERS[0].name;
  let selected = null;
</script>

<div class="flex flex-col gap-5">
  <div>
    <h1 class="text-2xl font-black tracking-tight" style="color: {DS.colors.text};">My Dashboard</h1>
    <p class="text-sm" style="color: {DS.colors.textMuted};">Welcome, {engineerName}</p>
  </div>
  <div class="grid grid-cols-3 gap-4">
    {#each [["Assigned", 5, DS.colors.accent], ["In Progress", 2, DS.colors.purple], ["Resolved Today", 3, DS.colors.success]] as [l, v, c]}
      <Card className="p-5">
        <p class="text-3xl font-black" style="color: {c};">{v}</p>
        <p class="text-xs font-semibold uppercase tracking-widest mt-1" style="color: {DS.colors.textMuted};">{l}</p>
      </Card>
    {/each}
  </div>
  <Card className="overflow-hidden">
    <div class="px-5 py-3" style="border-bottom: 1px solid {DS.colors.border};">
      <h3 class="font-bold text-sm" style="color: {DS.colors.text};">My Tickets</h3>
    </div>
    {#each MOCK_TICKETS.slice(0, 5) as t}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => selected = t}
        role="button"
        tabindex="0"
        on:keydown={() => {}}
        class="flex items-center gap-4 px-5 py-4 hover:bg-white/5 cursor-pointer transition-colors"
        style="border-bottom: 1px solid {DS.colors.border}20;"
      >
        <div class="flex-1">
          <p class="font-semibold text-sm" style="color: {DS.colors.text};">{t.title}</p>
          <p class="text-xs mt-0.5" style="color: {DS.colors.textMuted};">{t.id} · {t.city}, {t.state}</p>
        </div>
        <Badge color={priorityColor(t.priority)}>{t.priority}</Badge>
        <Badge color={statusColor(t.status)}>{t.status}</Badge>
      </div>
    {/each}
  </Card>

  {#if selected}
    <Modal open={true} title="Ticket Actions" on:close={() => selected = null}>
      <div class="flex flex-col gap-4">
        <div class="p-4 rounded-xl" style="background: {DS.colors.surface};">
          <p class="font-bold" style="color: {DS.colors.text};">{selected.title}</p>
          <p class="text-xs mt-1" style="color: {DS.colors.textMuted};">{selected.id} · {selected.city}</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          {#each ["Accept Ticket","Mark Reached Site","Work In Progress","Upload Images","Resolve Ticket"] as a}
            <Btn variant={a === "Resolve Ticket" ? "success" : "secondary"} size="sm">{a}</Btn>
          {/each}
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold uppercase tracking-widest" style="color: {DS.colors.textMuted};">Upload Files</label>
          <div class="grid grid-cols-2 gap-2">
            {#each [["Site Image","📷"],["Device Photo","📸"],["IR Report","📄"],["Document","📎"]] as [f, icon]}
              <div class="p-3 rounded-lg flex flex-col items-center gap-1 cursor-pointer hover:border-blue-500/50 transition-colors"
                style="border: 1px dashed {DS.colors.border}; color: {DS.colors.textMuted};">
                <span class="text-xl">{icon}</span>
                <span class="text-xs">{f}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </Modal>
  {/if}
</div>
