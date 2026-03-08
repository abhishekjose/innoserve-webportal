<script>
  import { DS } from "$lib/data.js";
  import Card from "$lib/components/Card.svelte";

  export let role = "Super Admin";

  const settings = [
    {
      title: "Profile Settings",
      desc: "Update name, email, and password",
      icon: "👤",
    },
    {
      title: "Notification Preferences",
      desc: "Configure email, WhatsApp, in-app alerts",
      icon: "🔔",
    },
    {
      title: "SLA Configuration",
      desc: "Set response and resolution SLAs by priority",
      icon: "⏱",
    },
    {
      title: "Role Permissions",
      desc: "Manage role-based access control",
      icon: "🔒",
    },
    {
      title: "API / GraphQL Config",
      desc: "Endpoint, auth tokens, query settings",
      icon: "⚙️",
    },
    {
      title: "WhatsApp Integration",
      desc: "Configure WhatsApp notification channel",
      icon: "💬",
    },
  ];
</script>

<div class="flex flex-col gap-5">
  <h1
    class="text-2xl font-black tracking-tight"
    style="color: {DS.colors.text};"
  >
    Settings
  </h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each settings as s}
      <Card
        className="p-5 hover:border-blue-500/40 transition-all cursor-pointer flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style="background: {DS.colors.accent}22;"
        >
          {s.icon}
        </div>
        <div>
          <p class="font-bold" style="color: {DS.colors.text};">{s.title}</p>
          <p class="text-xs mt-0.5" style="color: {DS.colors.textMuted};">
            {s.desc}
          </p>
        </div>
        <span class="ml-auto" style="color: {DS.colors.textMuted};">→</span>
      </Card>
    {/each}
  </div>
</div>
