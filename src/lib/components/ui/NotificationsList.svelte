<script>
  import { DS } from "$lib/data.js";

  const notifs = [
    {
      type: "assigned",
      msg: "TKT-2024001 assigned to Rajesh Kumar",
      time: "2m ago",
      read: false,
    },
    {
      type: "sla",
      msg: "SLA breach: TKT-2024015 overdue by 2h",
      time: "15m ago",
      read: false,
    },
    {
      type: "escalated",
      msg: "TKT-2024022 escalated to L3",
      time: "1h ago",
      read: true,
    },
    {
      type: "closed",
      msg: "TKT-2024008 resolved by Priya Sharma",
      time: "2h ago",
      read: true,
    },
    {
      type: "assigned",
      msg: "TKT-2024031 new ticket created",
      time: "3h ago",
      read: true,
    },
  ];
  const icons = { assigned: "🎫", sla: "⚠️", escalated: "🔺", closed: "✅" };
</script>

<div class="flex flex-col">
  {#each notifs as n}
    <div
      class="flex items-start gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
      style="border-bottom: 1px solid {DS.colors.border}30; background: {!n.read
        ? DS.colors.accent + '08'
        : 'transparent'};"
    >
      <span class="text-lg mt-0.5">{icons[n.type]}</span>
      <div class="flex-1">
        <p
          class="text-xs leading-relaxed"
          style="color: {n.read ? DS.colors.textDim : DS.colors.text};"
        >
          {n.msg}
        </p>
        <p class="text-xs mt-0.5" style="color: {DS.colors.textMuted};">
          {n.time}
        </p>
      </div>
      {#if !n.read}
        <div
          class="w-2 h-2 rounded-full mt-1.5 shrink-0"
          style="background: {DS.colors.accent};"
        ></div>
      {/if}
    </div>
  {/each}
</div>
