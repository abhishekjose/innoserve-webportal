<script>
  import {
    DS,
    MOCK_TICKETS,
    MOCK_ENGINEERS,
    MOCK_CUSTOMERS,
    priorityColor,
    statusColor,
  } from "$lib/data.js";
  import Card from "$lib/components/Card.svelte";
  import Badge from "$lib/components/Badge.svelte";
  import Btn from "$lib/components/Btn.svelte";
  import Input from "$lib/components/Input.svelte";
  import Select from "$lib/components/Select.svelte";
  import Modal from "$lib/components/Modal.svelte";

  export let role = "Super Admin";

  let tickets = [...MOCK_TICKETS];
  let search = "";
  let filterPriority = "All";
  let filterStatus = "All";
  let filterState = "All";
  let page = 1;
  let selectedTicket = null;
  let showCreate = false;
  const PER_PAGE = 8;

  $: filtered = tickets.filter(
    (t) =>
      (search === "" ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.title.toLowerCase().includes(search.toLowerCase())) &&
      (filterPriority === "All" || t.priority === filterPriority) &&
      (filterStatus === "All" || t.status === filterStatus) &&
      (filterState === "All" || t.state === filterState),
  );
  $: paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  $: totalPages = Math.ceil(filtered.length / PER_PAGE);
  $: canCreate = ["Super Admin", "NOC Team", "Project Head"].includes(role);

  // Ticket detail state
  let comment = "";
  let detailStatus = "";
  let detailEngineer = "";
  let remarks = [];

  $: if (selectedTicket) {
    detailStatus = selectedTicket.status;
    detailEngineer = selectedTicket.engineer || "";
    remarks = [...(selectedTicket.remarks || [])];
  }

  $: canAssign = ["Super Admin", "NOC Team", "State Planner"].includes(role);
  $: canClose = [
    "Super Admin",
    "NOC Team",
    "L2 Engineer",
    "L3 Engineer",
  ].includes(role);

  function addComment() {
    if (!comment.trim()) return;
    remarks = [
      ...remarks,
      { user: role, msg: comment, time: new Date().toLocaleTimeString() },
    ];
    comment = "";
  }

  // Create form
  let form = {
    title: "",
    customer: "HDFC Bank",
    priority: "Medium",
    state: "Maharashtra",
    city: "Mumbai",
    project: "Metro Rail AFC",
    description: "",
  };

  function clearFilters() {
    search = "";
    filterPriority = "All";
    filterStatus = "All";
    filterState = "All";
  }
</script>

<div class="flex flex-col gap-5">
  <div class="flex items-center justify-between">
    <div>
      <h1
        class="text-2xl font-black tracking-tight"
        style="color: {DS.colors.text};"
      >
        Ticket Management
      </h1>
      <p class="text-sm" style="color: {DS.colors.textMuted};">
        {filtered.length} tickets found
      </p>
    </div>
    <div class="flex gap-2">
      {#if canCreate}<Btn on:click={() => (showCreate = true)}>+ New Ticket</Btn
        >{/if}
      <Btn variant="secondary" size="sm">📥 Bulk Upload</Btn>
      <Btn variant="ghost" size="sm">📤 Export</Btn>
    </div>
  </div>

  <!-- Filters -->
  <Card className="p-4">
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <Input
        placeholder="Search by ID or title..."
        bind:value={search}
        className="col-span-2 md:col-span-1"
      />
      <Select
        bind:value={filterPriority}
        options={["All", "Critical", "High", "Medium", "Low"]}
      />
      <Select
        bind:value={filterStatus}
        options={[
          "All",
          "Open",
          "In Progress",
          "Pending",
          "Resolved",
          "Closed",
        ]}
      />
      <Select
        bind:value={filterState}
        options={[
          "All",
          "Maharashtra",
          "Delhi",
          "Karnataka",
          "Tamil Nadu",
          "Gujarat",
        ]}
      />
      <Btn variant="ghost" size="sm" on:click={clearFilters}>Clear Filters</Btn>
    </div>
  </Card>

  <!-- Table -->
  <Card className="overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr style="border-bottom: 1px solid {DS.colors.border};">
            {#each ["Ticket ID", "Issue", "Priority", "Status", "State/City", "Engineer", "SLA", "Created"] as h}
              <th
                class="px-4 py-3 text-left font-semibold uppercase tracking-widest text-xs whitespace-nowrap"
                style="color: {DS.colors.textMuted};">{h}</th
              >
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each paginated as t}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <tr
              on:click={() => (selectedTicket = t)}
              class="transition-colors hover:bg-blue-500/5 cursor-pointer"
              style="border-bottom: 1px solid {DS.colors.border}30;"
            >
              <td
                class="px-4 py-3 font-mono font-bold text-xs"
                style="color: {DS.colors.accent};">{t.id}</td
              >
              <td class="px-4 py-3">
                <p class="font-medium text-sm" style="color: {DS.colors.text};">
                  {t.title}
                </p>
                <p class="text-xs" style="color: {DS.colors.textMuted};">
                  {t.customer}
                </p>
              </td>
              <td class="px-4 py-3"
                ><Badge color={priorityColor(t.priority)}>{t.priority}</Badge
                ></td
              >
              <td class="px-4 py-3"
                ><Badge color={statusColor(t.status)}>{t.status}</Badge></td
              >
              <td class="px-4 py-3 text-xs">
                <p style="color: {DS.colors.text};">{t.state}</p>
                <p style="color: {DS.colors.textMuted};">{t.city}</p>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                {#if t.engineer}
                  <span class="text-xs" style="color: {DS.colors.text};"
                    >{t.engineer}</span
                  >
                {:else}
                  <Badge color="gray">Unassigned</Badge>
                {/if}
              </td>
              <td class="px-4 py-3"
                ><Badge color={t.sla === "Breached" ? "red" : "green"} size="sm"
                  >{t.sla}</Badge
                ></td
              >
              <td class="px-4 py-3 text-xs" style="color: {DS.colors.textDim};"
                >{t.created}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div
      class="flex items-center justify-between px-5 py-4"
      style="border-top: 1px solid {DS.colors.border};"
    >
      <span class="text-xs" style="color: {DS.colors.textMuted};">
        Showing {(page - 1) * PER_PAGE + 1}–{Math.min(
          page * PER_PAGE,
          filtered.length,
        )} of {filtered.length}
      </span>
      <div class="flex gap-1">
        <Btn
          variant="ghost"
          size="sm"
          disabled={page === 1}
          on:click={() => page--}>← Prev</Btn
        >
        {#each Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1) as p}
          <button
            on:click={() => (page = p)}
            class="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
            style="background: {p === page
              ? DS.colors.accent
              : DS.colors.surface}; color: {p === page
              ? '#fff'
              : DS.colors.textMuted};">{p}</button
          >
        {/each}
        <Btn
          variant="ghost"
          size="sm"
          disabled={page === totalPages}
          on:click={() => page++}>Next →</Btn
        >
      </div>
    </div>
  </Card>

  <!-- Ticket Detail Modal -->
  {#if selectedTicket}
    <Modal
      open={true}
      title="{selectedTicket.id} — Ticket Details"
      width="max-w-3xl"
      on:close={() => (selectedTicket = null)}
    >
      <div class="flex flex-col gap-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="font-bold text-lg" style="color: {DS.colors.text};">
              {selectedTicket.title}
            </h2>
            <div class="flex items-center gap-2 mt-2 flex-wrap">
              <Badge color={priorityColor(selectedTicket.priority)}
                >{selectedTicket.priority}</Badge
              >
              <Badge color={statusColor(detailStatus)}>{detailStatus}</Badge>
              <Badge color={selectedTicket.sla === "Breached" ? "red" : "green"}
                >{selectedTicket.sla}</Badge
              >
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-4">
            <div
              class="p-4 rounded-xl"
              style="background: {DS.colors.surface};"
            >
              <h4
                class="text-xs font-bold uppercase tracking-widest mb-3"
                style="color: {DS.colors.textMuted};"
              >
                Ticket Info
              </h4>
              {#each [["Customer", selectedTicket.customer], ["Project", selectedTicket.project], ["Created", selectedTicket.created], ["State", selectedTicket.state], ["City", selectedTicket.city]] as [k, v]}
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

            {#if canAssign}
              <div
                class="p-4 rounded-xl"
                style="background: {DS.colors.surface};"
              >
                <h4
                  class="text-xs font-bold uppercase tracking-widest mb-3"
                  style="color: {DS.colors.textMuted};"
                >
                  Assign Engineer
                </h4>
                <Select
                  bind:value={detailEngineer}
                  options={["Unassigned", ...MOCK_ENGINEERS.map((e) => e.name)]}
                />
                <div class="flex gap-2 mt-3">
                  {#if canClose}
                    <Select
                      bind:value={detailStatus}
                      options={[
                        "Open",
                        "In Progress",
                        "Pending",
                        "Resolved",
                        "Closed",
                      ]}
                    />
                  {/if}
                  <Btn size="sm">Save</Btn>
                </div>
              </div>
            {/if}
          </div>

          <div class="flex flex-col gap-4">
            <div
              class="p-4 rounded-xl"
              style="background: {DS.colors.surface};"
            >
              <h4
                class="text-xs font-bold uppercase tracking-widest mb-3"
                style="color: {DS.colors.textMuted};"
              >
                Ticket History
              </h4>
              <div class="flex flex-col gap-2 text-xs max-h-32 overflow-y-auto">
                {#each [{ action: "Ticket Created", time: selectedTicket.created, user: "System" }, { action: "Assigned to NOC", time: "2 hrs ago", user: "National Head" }, { action: "Engineer Dispatched", time: "1 hr ago", user: "NOC Team" }] as h}
                  <div class="flex items-start gap-2">
                    <div
                      class="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style="background: {DS.colors.accent};"
                    ></div>
                    <div>
                      <p style="color: {DS.colors.text};">{h.action}</p>
                      <p style="color: {DS.colors.textMuted};">
                        {h.time} · {h.user}
                      </p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <div
              class="p-4 rounded-xl"
              style="background: {DS.colors.surface};"
            >
              <h4
                class="text-xs font-bold uppercase tracking-widest mb-3"
                style="color: {DS.colors.textMuted};"
              >
                Attachments
              </h4>
              <div class="grid grid-cols-2 gap-2">
                {#each ["site_image.jpg", "device_photo.png"] as f}
                  <div
                    class="p-2 rounded-lg text-xs flex items-center gap-2"
                    style="background: {DS.colors
                      .surfaceHigh}; border: 1px solid {DS.colors
                      .border}; color: {DS.colors.textDim};"
                  >
                    📎 {f}
                  </div>
                {/each}
                <button
                  class="p-2 rounded-lg text-xs flex items-center gap-2"
                  style="border: 1px dashed {DS.colors.border}; color: {DS
                    .colors.textMuted};"
                >
                  + Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <div class="p-4 rounded-xl" style="background: {DS.colors.surface};">
          <h4
            class="text-xs font-bold uppercase tracking-widest mb-3"
            style="color: {DS.colors.textMuted};"
          >
            Comments
          </h4>
          <div class="flex flex-col gap-2 mb-3 max-h-28 overflow-y-auto">
            {#if remarks.length === 0}
              <p class="text-xs" style="color: {DS.colors.textMuted};">
                No comments yet.
              </p>
            {/if}
            {#each remarks as r}
              <div
                class="p-2 rounded-lg text-xs"
                style="background: {DS.colors.surfaceHigh};"
              >
                <span class="font-semibold" style="color: {DS.colors.accent};"
                  >{r.user}</span
                >
                <span style="color: {DS.colors.textMuted};"> · {r.time}</span>
                <p class="mt-0.5" style="color: {DS.colors.text};">{r.msg}</p>
              </div>
            {/each}
          </div>
          <div class="flex gap-2">
            <input
              bind:value={comment}
              placeholder="Add a comment..."
              class="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
              style="background: {DS.colors.surfaceHigh}; border: 1px solid {DS
                .colors.border}; color: {DS.colors.text};"
            />
            <Btn size="sm" on:click={addComment}>Post</Btn>
          </div>
        </div>

        <div class="flex gap-3 justify-end">
          <Btn variant="ghost" on:click={() => (selectedTicket = null)}
            >Cancel</Btn
          >
          <Btn variant="danger" size="sm">⚠ Escalate</Btn>
          {#if canClose}<Btn variant="success" size="sm">✓ Close Ticket</Btn
            >{/if}
        </div>
      </div>
    </Modal>
  {/if}

  <!-- Create Ticket Modal -->
  <Modal
    open={showCreate}
    title="Create New Ticket"
    on:close={() => (showCreate = false)}
  >
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-4">
        <Input
          label="Title"
          bind:value={form.title}
          placeholder="Brief issue description"
          className="col-span-2"
        />
        <Select
          label="Customer"
          bind:value={form.customer}
          options={MOCK_CUSTOMERS.map((c) => c.name)}
        />
        <Select
          label="Project"
          bind:value={form.project}
          options={[
            "Metro Rail AFC",
            "Bus Rapid Transit",
            "Airport Ticketing",
            "Railway Stations",
          ]}
        />
        <Select
          label="Priority"
          bind:value={form.priority}
          options={["Critical", "High", "Medium", "Low"]}
        />
        <Select
          label="State"
          bind:value={form.state}
          options={["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"]}
        />
        <div class="flex flex-col gap-1.5 col-span-2">
          <label
            class="text-xs font-semibold uppercase tracking-widest"
            style="color: {DS.colors.textMuted};">Description</label
          >
          <textarea
            bind:value={form.description}
            rows="3"
            class="w-full rounded-lg px-3 py-2 text-sm outline-none resize-none"
            style="background: {DS.colors.surface}; border: 1px solid {DS.colors
              .border}; color: {DS.colors.text};"
            placeholder="Detailed description of the issue..."
          ></textarea>
        </div>
      </div>
      <div class="flex gap-3 justify-end">
        <Btn variant="ghost" on:click={() => (showCreate = false)}>Cancel</Btn>
        <Btn on:click={() => (showCreate = false)}>Create Ticket</Btn>
      </div>
    </div>
  </Modal>
</div>
