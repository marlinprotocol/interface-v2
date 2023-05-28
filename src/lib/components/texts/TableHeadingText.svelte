<script lang="ts">
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import type { TableModel, TooltipDirection } from '$lib/types/componentTypes';
	import { staticImages } from '../images/staticImages';

	export let heading: TableModel['header'];
	export let tooltipDirection: TooltipDirection = 'tooltip-right';
	export let styleClass = '';
	export let iconWidth = '16px';
	export let handleSortData: ((id: string) => void) | undefined = undefined;

	const { title = '', tooltipText = '', sorting = false } = heading;
</script>

<div
	class={`${styleClass} flex flex-nowrap gap-1 text-primary text-xs xl:text-sm justify-center items-center mt-0.5 text-center`}
>
	{#if sorting}
		<button class="flex items-center gap-0.5" on:click={() => handleSortData?.(heading.id)}>
			<img class="mt-[2px]" src={staticImages.Sort} alt="sort" width="16px" />
			<span class="tracking-widest w-fit">{title}</span>
			{#if !!tooltipText}
				<TooltipIcon styleClass="mt-[1px]" {tooltipText} {tooltipDirection} {iconWidth} />
			{/if}
		</button>
	{:else}
		<div class="flex items-start gap-1">
			{title}
			{#if !!tooltipText}
				<TooltipIcon styleClass="mt-[1px]" {tooltipText} {tooltipDirection} {iconWidth} />
			{/if}
		</div>
	{/if}
</div>
