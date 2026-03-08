<script>
  import { DS, MOCK_INVENTORY } from "$lib/data.js";
  import Card from "$lib/components/Card.svelte";
  import Badge from "$lib/components/Badge.svelte";
  import Btn from "$lib/components/Btn.svelte";
</script>

<div class="flex flex-col gap-5">
  <div class="flex items-center justify-between">
    <h1
      class="text-2xl font-black tracking-tight"
      style="color: {DS.colors.text};"
    >
      Inventory / Devices
    </h1>
    <Btn>+ Add Inventory</Btn>
  </div>
  <div class="grid grid-cols-3 gap-4">
    {#each [["Total Devices", 156, DS.colors.accent], ["Available", 102, DS.colors.success], ["Faulty", 18, DS.colors.danger]] as [l, v, c]}
      <Card className="p-5">
        <p class="text-3xl font-black" style="color: {c};">{v}</p>
        <p
          class="text-xs font-semibold uppercase tracking-widest mt-1"
          style="color: {DS.colors.textMuted};"
        >
          {l}
        </p>
      </Card>
    {/each}
  </div>
  <Card className="overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr style="border-bottom: 1px solid {DS.colors.border};">
            {#each ["ID", "Device Type", "Serial No", "Qty", "Location", "Status"] as h}
              <th
                class="px-4 py-3 text-left font-semibold uppercase tracking-widest text-xs"
                style="color: {DS.colors.textMuted};">{h}</th
              >
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each MOCK_INVENTORY as item}
            <tr
              class="transition-colors hover:bg-blue-500/5"
              style="border-bottom: 1px solid {DS.colors.border}30;"
            >
              <td
                class="px-4 py-3 font-mono text-xs"
                style="color: {DS.colors.accent};">{item.id}</td
              >
              <td
                class="px-4 py-3 font-semibold"
                style="color: {DS.colors.text};">{item.device}</td
              >
              <td
                class="px-4 py-3 font-mono text-xs"
                style="color: {DS.colors.textDim};">{item.serial}</td
              >
              <td class="px-4 py-3 font-bold" style="color: {DS.colors.text};"
                >{item.stock}</td
              >
              <td class="px-4 py-3" style="color: {DS.colors.textDim};"
                >{item.state}</td
              >
              <td class="px-4 py-3">
                <Badge
                  color={item.status === "Available"
                    ? "green"
                    : item.status === "Faulty"
                      ? "red"
                      : "yellow"}>{item.status}</Badge
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Card>
</div>
