<script>
  import { DS, priorityColor } from '$lib/data.js';
  import Card from '$lib/components/Card.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import Btn from '$lib/components/Btn.svelte';

  let step = 0;
  let progress = 0;

  const mockPreview = Array.from({length: 6}, (_, i) => ({
    row: i + 1,
    title: ["Card Reader Error","Network Failure","Server Down","UPS Fault","Display Issue","Printer Jam"][i],
    priority: ["Critical","High","Medium","Low","High","Medium"][i],
    state: ["Maharashtra","Delhi","Karnataka","Tamil Nadu","Gujarat","Rajasthan"][i],
    valid: i !== 3,
  }));

  function handleUpload() {
    step = 1;
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      progress = p;
      if (p >= 100) { clearInterval(interval); step = 2; }
    }, 200);
  }
</script>

<div class="flex flex-col gap-5">
  <h1 class="text-2xl font-black tracking-tight" style="color: {DS.colors.text};">Bulk Ticket Upload</h1>

  <div class="flex items-center gap-3 mb-2">
    {#each ["Upload File","Preview & Validate","Submit"] as s, i}
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
          style="background: {i <= step ? DS.colors.accent : DS.colors.surface}; color: {i <= step ? '#fff' : DS.colors.textMuted}; border: 2px solid {i <= step ? DS.colors.accent : DS.colors.border};">
          {i < step ? '✓' : i + 1}
        </div>
        <span class="text-sm" style="color: {i <= step ? DS.colors.text : DS.colors.textMuted};">{s}</span>
        {#if i < 2}<span style="color: {DS.colors.border};">→</span>{/if}
      </div>
    {/each}
  </div>

  {#if step === 0}
    <Card className="p-8 flex flex-col items-center gap-4">
      <div class="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
        style="background: {DS.colors.accent}22; border: 2px dashed {DS.colors.accent};">📎</div>
      <div class="text-center">
        <p class="font-bold text-lg" style="color: {DS.colors.text};">Drop Excel File Here</p>
        <p class="text-sm mt-1" style="color: {DS.colors.textMuted};">Supports .xlsx, .xls, .csv — Max 10MB</p>
      </div>
      <Btn on:click={handleUpload}>Select File & Upload</Btn>
      <Btn variant="ghost" size="sm">📥 Download Template</Btn>
    </Card>
  {/if}

  {#if step === 1}
    <Card className="p-8 flex flex-col items-center gap-4">
      <p class="font-bold" style="color: {DS.colors.text};">Processing file...</p>
      <div class="w-full max-w-sm">
        <div class="w-full rounded-full h-3" style="background: {DS.colors.surface};">
          <div class="h-3 rounded-full transition-all" style="width: {progress}%; background: {DS.colors.accent};"></div>
        </div>
        <p class="text-xs mt-1 text-center" style="color: {DS.colors.textMuted};">{progress}% parsed</p>
      </div>
    </Card>
  {/if}

  {#if step === 2}
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Badge color="green">5 Valid</Badge>
        <Badge color="red">1 Invalid</Badge>
      </div>
      <Card className="overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr style="border-bottom: 1px solid {DS.colors.border};">
                {#each ["#","Issue Title","Priority","State","Validation"] as h}
                  <th class="px-4 py-3 text-left font-semibold uppercase tracking-widest text-xs" style="color: {DS.colors.textMuted};">{h}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each mockPreview as row}
                <tr class="hover:bg-blue-500/5" style="border-bottom: 1px solid {DS.colors.border}30;">
                  <td class="px-4 py-3" style="color: {DS.colors.textDim};">{row.row}</td>
                  <td class="px-4 py-3" style="color: {DS.colors.text};">{row.title}</td>
                  <td class="px-4 py-3"><Badge color={priorityColor(row.priority)}>{row.priority}</Badge></td>
                  <td class="px-4 py-3" style="color: {DS.colors.textDim};">{row.state}</td>
                  <td class="px-4 py-3">
                    {#if row.valid}
                      <Badge color="green">✓ Valid</Badge>
                    {:else}
                      <Badge color="red">✕ Missing Fields</Badge>
                    {/if}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </Card>
      <div class="flex gap-3">
        <Btn variant="ghost" on:click={() => step = 0}>← Back</Btn>
        <Btn>Submit 5 Valid Tickets</Btn>
      </div>
    </div>
  {/if}
</div>
