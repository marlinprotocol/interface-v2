<script lang="ts">
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import type { TableModel, TooltipDirection } from '$lib/types/componentTypes';
	import { staticImages } from '$lib/components/images/staticImages';

	export let heading: TableModel['header'];
	export let tooltipDirection: TooltipDirection = 'tooltip-right';
	export let styleClass = '';
	export let iconWidth = '16px';
	export let handleSortData: ((id: string) => void) | undefined = undefined;

	const { title = '', tooltipText = '', sorting = false } = heading;
</script>

<div
	class="mt-0.5 flex flex-nowrap items-center justify-center gap-1 text-center text-xs text-primary xl:text-sm {styleClass}"
	data-testid="table-heading-text"
>
	{#if sorting}
		<button
			class="relative flex items-center gap-0.5"
			on:click={() => handleSortData?.(heading.id)}
		>
			<img class="absolute mt-[2px]" src={staticImages.Sort} alt="sort" width="16px" />
			<span class="w-fit px-4 tracking-widest">{title}</span>
			{#if !!tooltipText}
				<TooltipIcon
					styleClass="mt-[1px] absolute right-[-2px]"
					{tooltipText}
					{tooltipDirection}
					{iconWidth}
				/>
			{/if}
		</button>
	{:else}
		<div class="relative flex items-start gap-1">
			<span class="w-fit tracking-widest">{title}</span>
			{#if !!tooltipText}
				<TooltipIcon
					styleClass="mt-[1px] absolute right-[-18px]"
					{tooltipText}
					{tooltipDirection}
					{iconWidth}
				/>
			{/if}
		</div>
	{/if}
</div>
