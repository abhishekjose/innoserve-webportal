<script>
  import { DS, ROLES } from "$lib/data.js";
  import Card from "$lib/components/Card.svelte";
  import Input from "$lib/components/Input.svelte";
  import Select from "$lib/components/Select.svelte";
  import Btn from "$lib/components/Btn.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let email = "admin@smartticket.in";
  let password = "password123";
  let role = "Super Admin";
  let loading = false;

  function handleLogin() {
    loading = true;
    setTimeout(() => {
      loading = false;
      dispatch("login", role);
    }, 1200);
  }
</script>

<div
  class="min-h-screen flex items-center justify-center p-4"
  style="background: {DS.colors.bg};"
>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
      style="background: radial-gradient(circle, {DS.colors
        .accent}, transparent); filter: blur(80px);"
    ></div>
    <div
      class="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
      style="background: radial-gradient(circle, {DS.colors
        .purple}, transparent); filter: blur(100px);"
    ></div>
  </div>

  <div class="w-full max-w-md relative z-10">
    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl"
        style="background: linear-gradient(135deg, {DS.colors.accent}, {DS
          .colors.purple});"
      >
        🎫
      </div>
      <h1
        class="text-3xl font-black tracking-tight"
        style="color: {DS.colors.text};"
      >
        SmartTicket
      </h1>
      <p class="text-sm mt-1" style="color: {DS.colors.textMuted};">
        Nationwide Smart Ticketing Platform
      </p>
    </div>

    <Card className="p-8">
      <div class="flex flex-col gap-5">
        <Input
          label="Email Address"
          bind:value={email}
          type="email"
          placeholder="admin@smartticket.in"
        />
        <Input
          label="Password"
          bind:value={password}
          type="password"
          placeholder="••••••••"
        />
        <Select label="Login As (Demo)" bind:value={role} options={ROLES} />
        <Btn
          on:click={handleLogin}
          disabled={loading}
          size="lg"
          className="w-full mt-2"
        >
          {loading ? "Authenticating..." : "Sign In"}
        </Btn>
        <div
          class="flex justify-between text-xs"
          style="color: {DS.colors.accent};"
        >
          <span class="cursor-pointer hover:underline">Forgot Password?</span>
          <span class="cursor-pointer hover:underline">Login with OTP</span>
        </div>
      </div>
    </Card>
    <p class="text-center text-xs mt-6" style="color: {DS.colors.textMuted};">
      Protected by JWT Authentication · v2.4.1
    </p>
  </div>
</div>
