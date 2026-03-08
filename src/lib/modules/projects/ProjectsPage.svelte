<script>
  import { DS } from '$lib/data.js';
  import Card from '$lib/components/Card.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import Btn from '$lib/components/Btn.svelte';

  export let role = 'Super Admin';

  const projects = [
    { id: "PRJ-001", name: "Metro Rail AFC", customer: "HDFC Bank", state: "Maharashtra", sla: "4h", tickets: 120, status: "Active" },
    { id: "PRJ-002", name: "Bus Rapid Transit", customer: "SBI", state: "Delhi", sla: "8h", tickets: 89, status: "Active" },
    { id: "PRJ-003", name: "Airport Ticketing", customer: "ICICI Bank", state: "Karnataka", sla: "2h", tickets: 56, status: "Active" },
    { id: "PRJ-004", name: "Railway Stations", customer: "Axis Bank", state: "Tamil Nadu", sla: "6h", tickets: 203, status: "Paused" },
    { id: "PRJ-005", name: "City Buses AFC", customer: "PNB", state: "Gujarat", sla: "12h", tickets: 78, status: "Active" },
  ];

  $: canCreate = ["Super Admin","Project Head","National Head"].includes(role);
</script>

<div class="flex flex-col gap-5">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-black tracking-tight" style="color: {DS.colors.text};">Projects</h1>
    {#if canCreate}<Btn>+ Create Project</Btn>{/if}
  </div>
  <Card className="overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr style="border-bottom: 1px solid {DS.colors.border};">
            {#each ["ID","Project Name","Customer","State","SLA","Tickets","Status","Actions"] as h}
              <th class="px-4 py-3 text-left font-semibold uppercase tracking-widest text-xs whitespace-nowrap" style="color: {DS.colors.textMuted};">{h}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each projects as p}
            <tr class="transition-colors hover:bg-blue-500/5" style="border-bottom: 1px solid {DS.colors.border}30;">
              <td class="px-4 py-3 font-mono text-xs" style="color: {DS.colors.accent};">{p.id}</td>
              <td class="px-4 py-3 font-semibold" style="color: {DS.colors.text};">{p.name}</td>
              <td class="px-4 py-3" style="color: {DS.colors.textDim};">{p.customer}</td>
              <td class="px-4 py-3" style="color: {DS.colors.textDim};">{p.state}</td>
              <td class="px-4 py-3"><Badge color="cyan">{p.sla} Response</Badge></td>
              <td class="px-4 py-3 font-bold" style="color: {DS.colors.text};">{p.tickets}</td>
              <td class="px-4 py-3"><Badge color={p.status === 'Active' ? 'green' : 'yellow'}>{p.status}</Badge></td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <Btn variant="ghost" size="sm">View</Btn>
                  <Btn variant="secondary" size="sm">Edit</Btn>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Card>
</div>
