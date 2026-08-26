<script lang="ts">
  import type { IconProps } from '@lucide/svelte'

  let {
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    class: className = '',
    ...rest
  }: IconProps = $props()
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  {...rest}
>
  <path
    d="M10.905 17.5a1 1 0 0110.87 3.835 1 1 0 01-.945.665H5.938a4 4 0 01-3.923-4.784L4.899 2.804A1 1 0 015.88 2h4.6a1 1 0 01.869.504l1.264 2.212a1 1 0 01-.286 1.31l-2.769 1.98a1 1 0 01-1.37-.2L7.558 7"
  />
  <path d="M8.835 8.183 11.06 17" />
</svg>
