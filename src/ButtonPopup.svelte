<script lang="ts">
  import Button from './Button.svelte'
  import './style.css'
  import { onMount } from 'svelte'

  let {
    color = 'gray',
    winWidth = 300,
    winHeight = 400,
    expandInPlace = false,
    trigger,
    children,
  } = $props<{
    color?: string
    winWidth?: number
    winHeight?: number
    expandInPlace?: boolean
    trigger?: any
    children?: any
  }>()

  let open = $state(false)
  let initialized = $state(false)

  let anchorEl: HTMLDivElement

  let startX = $state(0)
  let startY = $state(0)
  let centerX = $state(0)
  let centerY = $state(0)

  function updateStartPosition() {
    const rect = anchorEl.getBoundingClientRect()
    startX = rect.left + rect.width / 2
    startY = rect.top + rect.height / 2
  }

  function openWindow() {
    const rect = anchorEl.getBoundingClientRect()
    startX = rect.left + rect.width / 2
    startY = rect.top + rect.height / 2

    let posX = 0
    let posY = 0

    if (expandInPlace) {
      posX = startX
      posY = startY
    } else {
      posX = window.innerWidth / 2
      posY = window.innerHeight / 2
    }

    const width = Math.min(winWidth, window.innerWidth)
    const height = Math.min(winHeight, window.innerHeight)

    // Keep final window inside viewport
    posX = Math.max(width / 2, Math.min(posX, window.innerWidth - width / 2))
    posY = Math.max(height / 2, Math.min(posY, window.innerHeight - height / 2))

    centerX = posX
    centerY = posY

    open = true
  }

  onMount(() => {
    updateStartPosition()

    // Wait until position was rendered before enabling transitions
    requestAnimationFrame(() => {
      initialized = true
    })

    function updatePosition() {
      if (!open) {
        updateStartPosition()
      }
    }

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    }
  })
</script>

{#if open}
  <button type="button" class="backdrop" aria-label="close" onclick={() => (open = false)}
  ></button>
{/if}

<div bind:this={anchorEl} class="anchor">
  <div
    class="window"
    class:open
    class:initialized
    style="
			--start-x: {startX}px;
			--start-y: {startY}px;
			--center-x: {centerX}px;
			--center-y: {centerY}px;
			--win-width: {Math.min(
      winWidth,
      typeof window === 'undefined' ? winWidth : window.innerWidth,
    )}px;
			--win-height: {Math.min(
      winHeight,
      typeof window === 'undefined' ? winHeight : window.innerHeight,
    )}px;
		"
  >
    {#if open}
      <button class="close" onclick={() => (open = false)}>×</button>

      <div class="content">
        {@render children()}
      </div>
    {:else}
      <Button {color} onclick={openWindow}>
        {@render trigger()}
      </Button>
    {/if}
  </div>
</div>

<style>
  .anchor {
    width: 100px;
    height: 44px;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 99;

    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: default;
  }

  .window {
    position: fixed;
    z-index: 100;

    left: var(--start-x);
    top: var(--start-y);

    transform: translate(-50%, -50%);

    width: 100px;
    height: 44px;

    border-radius: 22px;
    background: var(--bg);
    /* box-shadow: 0 8px 30px rgb(0 0 0 / 100%); */
  }

  /*
	 * Transitions only enabled after initial position was set
	 */
  .window.initialized {
    transition:
      left 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
      top 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
      width 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
      height 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
      border-radius 400ms ease;
  }

  .window.open {
    left: var(--center-x);
    top: var(--center-y);

    width: var(--win-width);
    height: var(--win-height);

    border-radius: 16px;
  }

  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1;
  }

  .content {
    width: 100%;
    height: 100%;
  }
</style>
