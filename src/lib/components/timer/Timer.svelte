<script lang="ts">
	import { epochToDurationString } from '$lib/utils/conversion';
	import { tweened } from 'svelte/motion';
	import Text from '../texts/Text.svelte';

	export let endEpochTime: number;

	const original = endEpochTime - Math.floor(Date.now() / 1000);
	let timer = tweened(original);

	setInterval(() => {
		if ($timer > 0) $timer--;
	}, 1000);
</script>

<div class="flex items-center gap-1">
	<!-- <img src="./images/done.svg" alt="Pop-over" width="18" /> -->
	{#if $timer > 0}
		<Text variant="body" text={`Will be staked in ${epochToDurationString($timer)}`} />
	{:else}
		<Text variant="body" text="Will be staked soon" />
	{/if}
</div>
