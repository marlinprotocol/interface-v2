<script lang="ts">
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import type { TableModel, TooltipDirection } from '$lib/types/componentTypes';
	import { staticImages } from '../images/staticImages';

	export let heading: TableModel['header'];
	// export let tooltipText = '';
	export let tooltipDirection: TooltipDirection = 'tooltip-right';
	// export let title = '';
	export let styleClass = '';
	export let iconWidth = 16;
	export let handleSortData: (() => void) | undefined = undefined;

	const { title = '', tooltipText = '', sorting = false } = heading;
</script>

<div
	class={`${styleClass} flex gap-1 text-primary justify-center items-center tracking-widest mt-0.5 text-center`}
>
	<!-- TODO: move this to span -->
	{#if sorting}
		<button on:click={handleSortData}>
			<div class="flex gap-1 items-center">
				<img src={staticImages.Sort} alt="sort" width="16px" />
				{title}
			</div>
		</button>
	{:else}
		{title}
	{/if}

	{#if !!tooltipText}
		<TooltipIcon {tooltipText} {tooltipDirection} {iconWidth} />
	{/if}
</div>
