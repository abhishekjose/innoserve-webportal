<script>
  import { DS, MOCK_CUSTOMERS } from '$lib/data.js';
  import Card from '$lib/components/Card.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import Btn from '$lib/components/Btn.svelte';
  import Input from '$lib/components/Input.svelte';
  import Modal from '$lib/components/Modal.svelte';

  export let role = 'Super Admin';
  let showAdd = false;
  $: canManage = ["Super Admin","National Head","Project Head"].includes(role);
</script>

<div class="flex flex-col gap-5">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-black tracking-tight" style="color: {DS.colors.text};">Customer Management</h1>
      <p class="text-sm" style="color: {DS.colors.textMuted};">{MOCK_CUSTOMERS.length} customers registered</p>
    </div>
    {#if canManage}<Btn on:click={() => showAdd = true}>+ Add Customer</Btn>{/if}
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each MOCK_CUSTOMERS as c}
      <Card className="p-5 hover:border-blue-500/40 transition-all cursor-pointer">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black"
              style="background: {DS.colors.purple}33; color: {DS.colors.purple};">🏦</div>
            <div>
              <p class="font-bold" style="color: {DS.colors.text};">{c.name}</p>
              <p class="text-xs" style="color: {DS.colors.textMuted};">{c.id}</p>
            </div>
          </div>
          <Badge color={c.status === 'Active' ? 'green' : 'gray'}>{c.status}</Badge>
        </div>
        <div class="grid grid-cols-3 gap-3 py-3" style="border-top: 1px solid {DS.colors.border}; border-bottom: 1px solid {DS.colors.border};">
          {#each [["Contact", c.contact], ["Projects", c.projects], ["Tickets", c.tickets]] as [k, v]}
            <div class="text-center">
              <p class="font-bold text-sm" style="color: {DS.colors.text};">{v}</p>
              <p class="text-xs" style="color: {DS.colors.textMuted};">{k}</p>
            </div>
          {/each}
        </div>
        <div class="flex justify-between items-center mt-4">
          <p class="text-xs" style="color: {DS.colors.textMuted};">{c.email}</p>
          <div class="flex gap-2">
            <Btn variant="ghost" size="sm">View</Btn>
            {#if canManage}<Btn variant="secondary" size="sm">Edit</Btn>{/if}
          </div>
        </div>
      </Card>
    {/each}
  </div>

  <Modal open={showAdd} title="Add Customer" on:close={() => showAdd = false}>
    <div class="grid grid-cols-2 gap-4">
      <Input label="Customer Name" value="" placeholder="Bank / Organization name" />
      <Input label="Contact Person" value="" placeholder="Primary contact" />
      <Input label="Email" value="" type="email" placeholder="contact@org.com" />
      <Input label="Phone" value="" placeholder="+91 9000000000" />
      <div class="col-span-2 flex gap-3 justify-end mt-2">
        <Btn variant="ghost" on:click={() => showAdd = false}>Cancel</Btn>
        <Btn on:click={() => showAdd = false}>Save Customer</Btn>
      </div>
    </div>
  </Modal>
</div>
