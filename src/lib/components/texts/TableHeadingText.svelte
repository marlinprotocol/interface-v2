<script lang="ts">
	import type { TableModel } from '$lib/types/componentTypes';
	import { staticImages } from '$lib/components/images/staticImages';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import type { TooltipPlacement } from '$lib/types/componentTypes';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let heading: TableModel['header'];
	export let placement: TooltipPlacement = 'right';
	export let styleClass = '';
	export let iconWidth = '16px';
	export let handleSortData: ((id: string) => void) | undefined = undefined;
	const { title = '', tooltipText = '', sorting = false, centered = false } = heading;
</script>

<div
	class={cn(
		'mt-0.5 flex flex-nowrap items-center justify-start gap-1 text-center text-[14px] font-normal text-grey-800',
		centered && 'justify-center',
		styleClass
	)}
	data-testid="table-heading-text"
>
	{#if sorting}
		<button
			class="relative flex items-center gap-0.5"
			on:click={() => handleSortData?.(heading.id)}
		>
			<img
				class="icon-invert absolute left-[-5px]"
				src={staticImages.sortV2Icon}
				alt="sort"
				width="16px"
			/>
			<span class="w-fit pl-4 tracking-widest">{title}</span>
			{#if tooltipText !== ''}
				<Tooltip {placement}>
					<img
						slot="tooltipIcon"
						src={staticImages.alertV2Icon}
						alt="Info"
						class="icon-invert"
						width={iconWidth}
					/>
					<span slot="tooltipContent">{tooltipText}</span></Tooltip
				>
			{/if}
		</button>
	{:else}
		<div class="relative flex items-center gap-1">
			<span class="w-fit tracking-widest">{title}</span>
			{#if tooltipText !== ''}
				<Tooltip {placement}>
					<img
						slot="tooltipIcon"
						src={staticImages.alertV2Icon}
						class="icon-invert"
						alt="Info"
						width={iconWidth}
					/>
					<span slot="tooltipContent">{tooltipText}</span></Tooltip
				>
			{/if}
		</div>
	{/if}
</div>
