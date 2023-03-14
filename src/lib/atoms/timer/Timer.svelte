<script lang="ts">
	import { tweened } from 'svelte/motion';

	export let endEpochTime: number;
	export let onTimerEnd: () => void = () => {};

	const original = Math.floor(endEpochTime - Date.now() / 1000);
	let timer = tweened(original);

	setInterval(() => {
		if ($timer > 0) {
			$timer--;
		}
		if ($timer === 0) {
			onTimerEnd();
		}
	}, 1000);
</script>

<div class="flex items-center gap-1">
	{#if $timer > 0}
		<slot name="active" timer={$timer} />
	{:else}
		<slot name="inactive" />
	{/if}
</div>
