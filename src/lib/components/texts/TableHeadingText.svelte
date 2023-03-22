<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import type { TooltipDirection } from '$lib/types/componentTypes';
	export let tooltipText = '';
	export let tooltipDirection: TooltipDirection = 'tooltip-right';
	export let title = '';
	export let styleClass = '';
</script>

<div class={`${styleClass} flex gap-1 text-primary justify-center`}>
	<Text
		text={title}
		variant="small"
		fontWeight={'font-semibold'}
		styleClass={'tracking-widest mt-0.5'}
	/>
	{#if tooltipText}
		<TooltipIcon {tooltipText} {tooltipDirection} iconSrc={'/images/alert.svg'} iconWidth={16} />
	{/if}
</div>
