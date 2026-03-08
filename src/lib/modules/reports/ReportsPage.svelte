<script>
  import { DS, MOCK_ENGINEERS } from '$lib/data.js';
  import Card from '$lib/components/Card.svelte';
  import Btn from '$lib/components/Btn.svelte';
  import BarChart from '$lib/components/BarChart.svelte';

  let tab = 'tickets';
</script>

<div class="flex flex-col gap-5">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-black tracking-tight" style="color: {DS.colors.text};">Reports & Analytics</h1>
    <Btn variant="secondary" size="sm">📤 Export PDF</Btn>
  </div>

  <div class="flex gap-2">
    {#each ["tickets","engineers","payout"] as t}
      <button
        on:click={() => tab = t}
        class="px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
        style="background: {tab===t ? DS.colors.accent : DS.colors.surface}; color: {tab===t ? '#fff' : DS.colors.textMuted}; border: 1px solid {tab===t ? DS.colors.accent : DS.colors.border};"
      >{t} Report</button>
    {/each}
  </div>

  {#if tab === 'tickets'}
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {#each [["Total Tickets", "2,847", DS.colors.accent], ["Avg Resolution", "3.2h", DS.colors.success], ["SLA Compliance", "92%", DS.colors.info], ["Escalations", "47", DS.colors.warning]] as [l, v, c]}
          <Card className="p-5">
            <p class="text-2xl font-black" style="color: {c};">{v}</p>
            <p class="text-xs font-semibold uppercase tracking-widest mt-1" style="color: {DS.colors.textMuted};">{l}</p>
          </Card>
        {/each}
      </div>
      <Card className="p-5">
        <h3 class="font-bold mb-4" style="color: {DS.colors.text};">Monthly Ticket Volume</h3>
        <BarChart data={[{label:"Jan",value:180},{label:"Feb",value:210},{label:"Mar",value:190},{label:"Apr",value:250},{label:"May",value:230},{label:"Jun",value:280},{label:"Jul",value:310},{label:"Aug",value:295}]} height={120} />
      </Card>
      <Card className="overflow-hidden">
        <div class="px-5 py-3" style="border-bottom: 1px solid {DS.colors.border};">
          <h3 class="font-bold text-sm" style="color: {DS.colors.text};">Tickets by State</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr style="border-bottom: 1px solid {DS.colors.border};">
                {#each ["State","Total","Open","Resolved","SLA%"] as h}
                  <th class="px-4 py-3 text-left font-semibold uppercase tracking-widest text-xs" style="color: {DS.colors.textMuted};">{h}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each [{state:"Maharashtra",total:320,open:45,resolved:275,sla:94},{state:"Delhi",total:280,open:38,resolved:242,sla:91},{state:"Karnataka",total:210,open:29,resolved:181,sla:96},{state:"Tamil Nadu",total:190,open:31,resolved:159,sla:88},{state:"Gujarat",total:150,open:22,resolved:128,sla:93}] as row}
                <tr class="hover:bg-blue-500/5" style="border-bottom: 1px solid {DS.colors.border}30;">
                  <td class="px-4 py-3" style="color: {DS.colors.text};">{row.state}</td>
                  <td class="px-4 py-3" style="color: {DS.colors.textDim};">{row.total}</td>
                  <td class="px-4 py-3" style="color: {DS.colors.textDim};">{row.open}</td>
                  <td class="px-4 py-3" style="color: {DS.colors.textDim};">{row.resolved}</td>
                  <td class="px-4 py-3" style="color: {row.sla > 90 ? DS.colors.success : DS.colors.warning};">{row.sla}%</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  {/if}

  {#if tab === 'engineers'}
    <Card className="overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr style="border-bottom: 1px solid {DS.colors.border};">
              {#each ["Engineer","Tickets Handled","Resolved","SLA%","Avg Resolution"] as h}
                <th class="px-4 py-3 text-left font-semibold uppercase tracking-widest text-xs" style="color: {DS.colors.textMuted};">{h}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each MOCK_ENGINEERS as e}
              <tr class="hover:bg-blue-500/5" style="border-bottom: 1px solid {DS.colors.border}30;">
                <td class="px-4 py-3 font-semibold" style="color: {DS.colors.text};">{e.name}</td>
                <td class="px-4 py-3" style="color: {DS.colors.textDim};">{e.totalResolved + e.activeTickets}</td>
                <td class="px-4 py-3" style="color: {DS.colors.textDim};">{e.totalResolved}</td>
                <td class="px-4 py-3" style="color: {e.slaCompliance > 90 ? DS.colors.success : DS.colors.warning};">{e.slaCompliance}%</td>
                <td class="px-4 py-3" style="color: {DS.colors.textDim};">{e.avgResolution}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Card>
  {/if}

  {#if tab === 'payout'}
    <Card className="overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr style="border-bottom: 1px solid {DS.colors.border};">
              {#each ["Engineer","Tickets","Rate/Ticket","Total Payout","Month"] as h}
                <th class="px-4 py-3 text-left font-semibold uppercase tracking-widest text-xs" style="color: {DS.colors.textMuted};">{h}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each MOCK_ENGINEERS.slice(0, 8) as e}
              <tr class="hover:bg-blue-500/5" style="border-bottom: 1px solid {DS.colors.border}30;">
                <td class="px-4 py-3 font-semibold" style="color: {DS.colors.text};">{e.name}</td>
                <td class="px-4 py-3" style="color: {DS.colors.textDim};">{e.totalResolved}</td>
                <td class="px-4 py-3" style="color: {DS.colors.textDim};">₹250</td>
                <td class="px-4 py-3 font-bold" style="color: {DS.colors.success};">₹{(e.totalResolved * 250).toLocaleString()}</td>
                <td class="px-4 py-3" style="color: {DS.colors.textDim};">March 2026</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Card>
  {/if}
</div>
