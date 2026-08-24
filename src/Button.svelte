<script lang="ts">
	let {
		borderColor = 'orange',
		children,
		onclick
	}: {
		borderColor?: string
		children?: any
		onclick?: () => void
	} = $props()
</script>

<button {onclick} class="glass-bg button" style={`--border-color: ${borderColor}`}>
	{@render children?.()}
</button>

<style>
	.button {
		flex: 1;
		height: calc(100% - 10px);
		margin: 5px 0;
		border: 0;
		cursor: pointer;
		display: flex;
		flex-direction: rows;
		align-items: center;
		justify-content: center;
		gap: 4px;
		border-radius: 99px;
		color: var(--text-h);

		box-shadow:
			0 0 16px var(--subtle),
			inset 0 0 1px var(--subtle);
	}

	.button::before {
		content: '';
		position: absolute;
		inset: 0;
		padding: 0.8px;
		border-radius: inherit;

		background: conic-gradient(
			from 45deg,

			transparent 0deg,
			transparent 35deg,

			color-mix(in srgb, var(--border-color) 85%, transparent) 60deg,
			color-mix(in srgb, var(--border-color) 25%, transparent) 95deg,

			transparent 120deg,
			transparent 210deg,

			color-mix(in srgb, var(--border-color) 75%, transparent) 235deg,
			color-mix(in srgb, var(--border-color) 20%, transparent) 275deg,

			transparent 300deg
		);

		-webkit-mask:
			linear-gradient(#000 0 0) content-box,
			linear-gradient(#000 0 0);

		-webkit-mask-composite: xor;
		mask-composite: exclude;

		pointer-events: none;
	}
</style>
