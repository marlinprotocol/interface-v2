<script lang="ts">
	import type { TextModel } from '$lib/types/componentTypes';
	import { epochToDurationString } from '$lib/utils/conversion';
	import { tweened } from 'svelte/motion';
	import Text from '../texts/Text.svelte';

	export let initialText: string;
	export let endEpochTime: number;
	export let textVariant: TextModel['variant'] = 'small';

	const original = endEpochTime - Math.floor(Date.now() / 1000);
	let timer = tweened(original);

	setInterval(() => {
		if ($timer > 0) $timer--;
	}, 1000);
</script>

<div class="flex items-center gap-1">
	<!-- <img src="./images/done.svg" alt="Pop-over" width="18" /> -->
	{#if $timer > 0}
		<Text
			variant={textVariant}
			text={`${!!initialText ? initialText + ' in ' : ''}${epochToDurationString($timer)}`}
		/>
	{:else}
		<Text variant={textVariant} text={`${!!initialText ? initialText + ' soon ' : ''}`} />
	{/if}
</div>
