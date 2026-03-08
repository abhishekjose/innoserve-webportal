<script>
  import { DS, MOCK_ENGINEERS, MOCK_TICKETS, statusColor } from "$lib/data.js";
  import Card from "$lib/components/Card.svelte";
  import Badge from "$lib/components/Badge.svelte";
  import Btn from "$lib/components/Btn.svelte";
  import Input from "$lib/components/Input.svelte";
  import Select from "$lib/components/Select.svelte";
  import Modal from "$lib/components/Modal.svelte";

  export let role = "Super Admin";
  let selected = null;
  let showAdd = false;

  $: canManage = ["Super Admin", "State Planner", "National Head"].includes(
    role,
  );

  function statusBg(s) {
    return s === "Online"
      ? DS.colors.success
      : s === "Busy"
        ? DS.colors.warning
        : DS.colors.textMuted;
  }
</script>

<div class="flex flex-col gap-5">
  <div class="flex items-center justify-between">
    <div>
      <h1
        class="text-2xl font-black tracking-tight"
        style="color: {DS.colors.text};"
      >
        Engineer Management
      </h1>
      <p class="text-sm" style="color: {DS.colors.textMuted};">
        {MOCK_ENGINEERS.length} engineers registered
      </p>
    </div>
    {#if canManage}<Btn on:click={() => (showAdd = true)}>+ Add Engineer</Btn
      >{/if}
  </div>

  <div class="grid grid-cols-3 gap-4">
    {#each [{ label: "Online", value: MOCK_ENGINEERS.filter((e) => e.status === "Online").length, color: DS.colors.success, icon: "🟢" }, { label: "Busy", value: MOCK_ENGINEERS.filter((e) => e.status === "Busy").length, color: DS.colors.warning, icon: "🟡" }, { label: "Offline", value: MOCK_ENGINEERS.filter((e) => e.status === "Offline").length, color: DS.colors.textMuted, icon: "⚫" }] as s}
      <Card className="p-4 flex items-center gap-4">
        <span class="text-2xl">{s.icon}</span>
        <div>
          <p class="text-2xl font-black" style="color: {DS.colors.text};">
            {s.value}
          </p>
          <p
            class="text-xs font-semibold uppercase tracking-widest"
            style="color: {DS.colors.textMuted};"
          >
            {s.label}
          </p>
        </div>
      </Card>
    {/each}
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each MOCK_ENGINEERS as e}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <Card
        className="p-5 cursor-pointer hover:border-blue-500/50 transition-all duration-200"
      >
        <div
          class="flex items-start gap-4"
          on:click={() => (selected = e)}
          role="button"
          tabindex="0"
          on:keydown={() => {}}
        >
          <div class="relative shrink-0">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg"
              style="background: {DS.colors.accent}33; color: {DS.colors
                .accent};"
            >
              {e.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div
              class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
              style="background: {statusBg(e.status)}; border-color: {DS.colors
                .surfaceHigh};"
            ></div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-bold" style="color: {DS.colors.text};">{e.name}</p>
            <p class="text-xs" style="color: {DS.colors.textMuted};">
              {e.id} · {e.city}, {e.state}
            </p>
            <div class="flex flex-wrap gap-1 mt-2">
              {#each e.skills as s}
                <Badge color="blue" size="sm">{s}</Badge>
              {/each}
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-3 gap-3 mt-4 pt-4"
          style="border-top: 1px solid {DS.colors.border};"
        >
          {#each [["Active", e.activeTickets, DS.colors.warning], ["Resolved", e.totalResolved, DS.colors.success], ["SLA %", e.slaCompliance + "%", DS.colors.accent]] as [l, v, c]}
            <div class="text-center">
              <p class="font-bold text-sm" style="color: {c};">{v}</p>
              <p class="text-xs" style="color: {DS.colors.textMuted};">{l}</p>
            </div>
          {/each}
        </div>
      </Card>
    {/each}
  </div>

  {#if selected}
    <Modal
      open={true}
      title="Engineer Profile"
      width="max-w-2xl"
      on:close={() => (selected = null)}
    >
      <div class="flex flex-col gap-5">
        <div class="flex items-center gap-5">
          <div
            class="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl"
            style="background: {DS.colors.accent}33; color: {DS.colors.accent};"
          >
            {selected.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h2 class="text-xl font-black" style="color: {DS.colors.text};">
              {selected.name}
            </h2>
            <p style="color: {DS.colors.textMuted};">{selected.email}</p>
            <p style="color: {DS.colors.textMuted};">{selected.phone}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 rounded-xl" style="background: {DS.colors.surface};">
            <h4
              class="text-xs font-bold uppercase tracking-widest mb-3"
              style="color: {DS.colors.textMuted};"
            >
              Coverage Area
            </h4>
            {#each [["State", selected.state], ["City", selected.city]] as [k, v]}
              <div
                class="flex justify-between py-1.5 text-sm"
                style="border-bottom: 1px solid {DS.colors.border}30;"
              >
                <span style="color: {DS.colors.textMuted};">{k}</span>
                <span class="font-medium" style="color: {DS.colors.text};"
                  >{v}</span
                >
              </div>
            {/each}
          </div>
          <div class="p-4 rounded-xl" style="background: {DS.colors.surface};">
            <h4
              class="text-xs font-bold uppercase tracking-widest mb-3"
              style="color: {DS.colors.textMuted};"
            >
              Performance
            </h4>
            {#each [["Total Resolved", selected.totalResolved], ["SLA Compliance", selected.slaCompliance + "%"], ["Avg Resolution", selected.avgResolution]] as [k, v]}
              <div
                class="flex justify-between py-1.5 text-sm"
                style="border-bottom: 1px solid {DS.colors.border}30;"
              >
                <span style="color: {DS.colors.textMuted};">{k}</span>
                <span class="font-medium" style="color: {DS.colors.text};"
                  >{v}</span
                >
              </div>
            {/each}
          </div>
        </div>
        <div>
          <h4
            class="text-xs font-bold uppercase tracking-widest mb-2"
            style="color: {DS.colors.textMuted};"
          >
            Active Tickets ({selected.activeTickets})
          </h4>
          {#each MOCK_TICKETS.filter((t) => t.engineer === selected.name).slice(0, 3) as t}
            <div
              class="flex items-center gap-3 p-3 rounded-lg mb-2"
              style="background: {DS.colors.surface};"
            >
              <span class="font-mono text-xs" style="color: {DS.colors.accent};"
                >{t.id}</span
              >
              <span class="flex-1 text-sm" style="color: {DS.colors.text};"
                >{t.title}</span
              >
              <Badge color={statusColor(t.status)} size="sm">{t.status}</Badge>
            </div>
          {/each}
        </div>
      </div>
    </Modal>
  {/if}

  <Modal
    open={showAdd}
    title="Add New Engineer"
    on:close={() => (showAdd = false)}
  >
    <div class="grid grid-cols-2 gap-4">
      <Input label="Full Name" value="" placeholder="Engineer name" />
      <Input
        label="Email"
        value=""
        type="email"
        placeholder="engineer@company.com"
      />
      <Input label="Phone" value="" placeholder="+91 9800000000" />
      <Select
        label="State"
        value="Maharashtra"
        options={["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"]}
      />
      <div class="col-span-2 flex gap-3 justify-end mt-2">
        <Btn variant="ghost" on:click={() => (showAdd = false)}>Cancel</Btn>
        <Btn on:click={() => (showAdd = false)}>Add Engineer</Btn>
      </div>
    </div>
  </Modal>
</div>
