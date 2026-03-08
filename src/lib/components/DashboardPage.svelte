<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import {
    DS,
    MOCK_TICKETS,
    MOCK_ENGINEERS,
    priorityColor,
    statusColor,
    engineerStatusColor,
  } from "$lib/data.js";
  import Card from "$lib/components/Card.svelte";
  import StatCard from "$lib/components/StatCard.svelte";
  import Badge from "$lib/components/Badge.svelte";
  import Btn from "$lib/components/Btn.svelte";
  import DonutChart from "$lib/components/DonutChart.svelte";
  import LineChart from "$lib/components/LineChart.svelte";
  import BarChart from "$lib/components/BarChart.svelte";

  export let role = "Super Admin";

  const stats = [
    {
      label: "Total Tickets",
      value: "2,847",
      icon: "🎫",
      color: DS.colors.accent,
      trend: 12,
    },
    {
      label: "Open",
      value: "342",
      icon: "📂",
      color: DS.colors.info,
      trend: -5,
    },
    {
      label: "In Progress",
      value: "189",
      icon: "⚙️",
      color: DS.colors.purple,
      trend: 8,
    },
    {
      label: "Pending",
      value: "94",
      icon: "⏳",
      color: DS.colors.warning,
      trend: 3,
    },
    {
      label: "Closed Today",
      value: "127",
      icon: "✅",
      color: DS.colors.success,
      trend: 15,
    },
    {
      label: "SLA Breaches",
      value: "23",
      icon: "⚠️",
      color: DS.colors.danger,
      trend: -18,
    },
    {
      label: "Engineers Online",
      value: "34",
      icon: "👷",
      color: DS.colors.success,
      trend: 0,
    },
    {
      label: "Engineers Busy",
      value: "21",
      icon: "🔧",
      color: DS.colors.warning,
      trend: 5,
    },
  ];

  const priorityData = [
    { label: "Critical", value: 45, color: DS.colors.danger },
    { label: "High", value: 120, color: DS.colors.warning },
    { label: "Medium", value: 230, color: DS.colors.accent },
    { label: "Low", value: 187, color: DS.colors.success },
  ];

  const trendData = [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 58 },
    { label: "Wed", value: 51 },
    { label: "Thu", value: 67 },
    { label: "Fri", value: 73 },
    { label: "Sat", value: 38 },
    { label: "Sun", value: 29 },
  ];

  const stateData = [
    { label: "MH", value: 320 },
    { label: "DL", value: 280 },
    { label: "KA", value: 210 },
    { label: "TN", value: 190 },
    { label: "GJ", value: 150 },
    { label: "RJ", value: 130 },
    { label: "UP", value: 115 },
    { label: "MP", value: 95 },
  ];

  const slaSegments = [
    { color: DS.colors.success, value: 77 },
    { color: DS.colors.warning, value: 15 },
    { color: DS.colors.danger, value: 8 },
  ];

  const recentTickets = MOCK_TICKETS.slice(0, 5);
  const trendPeriods = ["D", "W", "M"];
  let activeTrend = "W";

  function getStatusBg(s: any) {
    return s === "Online"
      ? DS.colors.success
      : s === "Busy"
        ? DS.colors.warning
        : DS.colors.textMuted;
  }

  onMount(() => {
    document.title = "Dashboard - SmartTicket";
    console.log("Current page:", page.url.pathname);
  });
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center justify-between">
    <div>
      <h1
        class="text-2xl font-black tracking-tight"
        style="color: {DS.colors.text};"
      >
        Operations Dashboard
      </h1>
      <p class="text-sm mt-0.5" style="color: {DS.colors.textMuted};">
        Real-time overview · Last updated just now
      </p>
    </div>
    <div class="flex gap-2">
      <Btn variant="ghost" size="sm">↻ Refresh</Btn>
      <Btn variant="secondary" size="sm">📊 Export</Btn>
    </div>
  </div>

  <!-- Stat Cards -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    {#each stats as s}
      <StatCard
        label={s.label}
        value={s.value}
        icon={s.icon}
        color={s.color}
        trend={s.trend}
      />
    {/each}
  </div>

  <!-- Charts Row 1 -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card className="p-5 col-span-1">
      <h3 class="font-bold text-sm mb-4" style="color: {DS.colors.text};">
        Tickets by Priority
      </h3>
      <div class="flex items-center gap-4">
        <DonutChart segments={priorityData} size={88} />
        <div class="flex flex-col gap-2 flex-1">
          {#each priorityData as s}
            <div class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <div
                  class="w-2 h-2 rounded-full"
                  style="background: {s.color};"
                ></div>
                <span style="color: {DS.colors.textDim};">{s.label}</span>
              </div>
              <span class="font-bold" style="color: {DS.colors.text};"
                >{s.value}</span
              >
            </div>
          {/each}
        </div>
      </div>
    </Card>

    <Card className="p-5 col-span-1 md:col-span-2">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-sm" style="color: {DS.colors.text};">
          Weekly Ticket Trend
        </h3>
        <div class="flex gap-1">
          {#each trendPeriods as t}
            <button
              class="text-xs px-2 py-1 rounded"
              style="background: {t === activeTrend
                ? DS.colors.accent
                : DS.colors.surface}; color: {t === activeTrend
                ? '#fff'
                : DS.colors.textMuted};"
              on:click={() => (activeTrend = t)}>{t}</button
            >
          {/each}
        </div>
      </div>
      <LineChart data={trendData} height={90} />
    </Card>
  </div>

  <!-- Charts Row 2 -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card className="p-5 col-span-1 md:col-span-2">
      <h3 class="font-bold text-sm mb-4" style="color: {DS.colors.text};">
        Tickets by State
      </h3>
      <BarChart data={stateData} height={100} />
    </Card>

    <Card className="p-5 col-span-1">
      <h3 class="font-bold text-sm mb-4" style="color: {DS.colors.text};">
        SLA Compliance
      </h3>
      <div class="flex flex-col items-center gap-3">
        <DonutChart segments={slaSegments} size={96} />
        <div class="w-full flex flex-col gap-1.5">
          {#each [["On Track", DS.colors.success, "77%"], ["At Risk", DS.colors.warning, "15%"], ["Breached", DS.colors.danger, "8%"]] as [l, c, v]}
            <div class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <div
                  class="w-2 h-2 rounded-full"
                  style="background: {c};"
                ></div>
                <span style="color: {DS.colors.textDim};">{l}</span>
              </div>
              <span class="font-bold" style="color: {DS.colors.text};">{v}</span
              >
            </div>
          {/each}
        </div>
      </div>
    </Card>
  </div>

  <!-- Recent Tickets -->
  <Card className="overflow-hidden">
    <div
      class="flex items-center justify-between px-5 py-4"
      style="border-bottom: 1px solid {DS.colors.border};"
    >
      <h3 class="font-bold text-sm" style="color: {DS.colors.text};">
        Recent Tickets
      </h3>
      <Btn variant="ghost" size="sm">View All →</Btn>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr style="border-bottom: 1px solid {DS.colors.border};">
            {#each ["Ticket ID", "Title", "Priority", "Status", "State", "Engineer", "SLA"] as h}
              <th
                class="px-4 py-3 text-left font-semibold uppercase tracking-widest text-xs whitespace-nowrap"
                style="color: {DS.colors.textMuted};">{h}</th
              >
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each recentTickets as t}
            <tr
              class="transition-colors hover:bg-blue-500/5"
              style="border-bottom: 1px solid {DS.colors.border}30;"
            >
              <td
                class="px-4 py-3 font-mono font-bold text-xs"
                style="color: {DS.colors.accent};">{t.id}</td
              >
              <td
                class="px-4 py-3 whitespace-nowrap"
                style="color: {DS.colors.text};">{t.title}</td
              >
              <td class="px-4 py-3"
                ><Badge color={priorityColor(t.priority)}>{t.priority}</Badge
                ></td
              >
              <td class="px-4 py-3"
                ><Badge color={statusColor(t.status)}>{t.status}</Badge></td
              >
              <td
                class="px-4 py-3 whitespace-nowrap"
                style="color: {DS.colors.textDim};">{t.state}</td
              >
              <td
                class="px-4 py-3 whitespace-nowrap"
                style="color: {t.engineer
                  ? DS.colors.textDim
                  : DS.colors.textMuted};"
              >
                {t.engineer || "Unassigned"}
              </td>
              <td class="px-4 py-3"
                ><Badge color={t.sla === "Breached" ? "red" : "green"}
                  >{t.sla}</Badge
                ></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Card>

  <!-- Engineer Status -->
  <Card className="overflow-hidden">
    <div
      class="flex items-center justify-between px-5 py-4"
      style="border-bottom: 1px solid {DS.colors.border};"
    >
      <h3 class="font-bold text-sm" style="color: {DS.colors.text};">
        Engineer Status
      </h3>
    </div>
    <div class="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
      {#each MOCK_ENGINEERS.slice(0, 8) as e}
        <div
          class="flex items-center gap-3 p-3 rounded-xl"
          style="background: {DS.colors.surface}; border: 1px solid {DS.colors
            .border};"
        >
          <div class="relative">
            <div
              class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style="background: {DS.colors.accent}33; color: {DS.colors
                .accent};"
            >
              {e.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div
              class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
              style="background: {getStatusBg(e.status)}; border-color: {DS
                .colors.surface};"
            ></div>
          </div>
          <div class="flex-1 min-w-0">
            <p
              class="text-xs font-semibold truncate"
              style="color: {DS.colors.text};"
            >
              {e.name.split(" ")[0]}
            </p>
            <p class="text-xs" style="color: {DS.colors.textMuted};">
              {e.activeTickets} tickets
            </p>
          </div>
        </div>
      {/each}
    </div>
  </Card>
</div>
