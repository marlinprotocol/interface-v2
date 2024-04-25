<script lang="ts">
	import InputCard from '$lib/atoms/v2/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';

	export let styleClass = '';
	export let tooltipText = '';
	export let title: string;

	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<InputCard {styleClass}>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-1">
			<Text variant="small" text={title} />
			{#if !!tooltipText}
				<TooltipIcon {tooltipText} />
			{/if}
		</div>
		<slot name="titleEndButton" />
	</div>
	<div class="flex items-center justify-between">
		<slot />
		<slot name="endInfoBox" />
		<slot name="endButton" />
	</div>
</InputCard>
