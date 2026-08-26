<script lang="ts">
  let {
    active = false,
    color = 'gray',
    children,
    href,
    onclick,
  }: {
    active?: boolean
    color?: string
    children?: any
    href?: string
    onclick?: (event?: MouseEvent) => void
  } = $props()
</script>

{#if href}
  <a {href} {onclick} class="glass-bg button" class:active style={`--color: ${color}`}>
    {@render children?.()}
  </a>
{:else}
  <button {onclick} class="glass-bg button" class:active style={`--color: ${color}`}>
    {@render children?.()}
  </button>
{/if}

<style>
  .button {
    position: relative;
    flex: 1;
    height: 100%;
    width: 100%;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    border-radius: 99px;
    color: var(--fg);
    text-decoration: none;
  }

  .button::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    pointer-events: none;

    background: conic-gradient(
      from 45deg,

      transparent 0deg,
      transparent 35deg,

      color-mix(in srgb, var(--color) 85%, transparent) 60deg,
      color-mix(in srgb, var(--color) 25%, transparent) 95deg,

      transparent 120deg,
      transparent 210deg,

      color-mix(in srgb, var(--color) 75%, transparent) 235deg,
      color-mix(in srgb, var(--color) 20%, transparent) 275deg,

      transparent 300deg
    );

    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);

    mask-composite: exclude;
    -webkit-mask-composite: xor;
  }

  .button:active,
  .button.active {
    background-color: color-mix(in srgb, var(--color) 30%, transparent);
  }
</style>
