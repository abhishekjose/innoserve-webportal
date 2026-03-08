<script>
  export let variant = 'primary';
  export let size = 'md';
  export let disabled = false;
  export let className = '';
  export let type = 'button';

  import { DS } from '$lib/data.js';

  const variants = {
    primary: `background: ${DS.colors.accent}; color: #fff; border: none;`,
    secondary: `background: ${DS.colors.surfaceHigh}; color: ${DS.colors.textDim}; border: 1px solid ${DS.colors.border};`,
    danger: `background: ${DS.colors.danger}; color: #fff; border: none;`,
    ghost: `background: transparent; color: ${DS.colors.textDim}; border: 1px solid ${DS.colors.border};`,
    success: `background: ${DS.colors.success}; color: #fff; border: none;`,
  };
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' };
</script>

<button
  {type}
  {disabled}
  on:click
  class="rounded-lg font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-40 {sizes[size]} {className}"
  style={variants[variant]}
>
  <slot />
</button>
