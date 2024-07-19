<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import type { TooltipPlacement } from '$lib/types/componentTypes';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let placement: TooltipPlacement = 'top';
	export let styleClass: string = '';

	const tooltipPosition = {
		top: {
			container: '-top-5 left-1/2 -translate-x-1/2 -translate-y-full',
			arrow:
				'after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 top-full left-1/2 -ml-[15px] w-[30px] h-[15px]'
		},
		bottom: {
			container: 'top-10 left-1/2 -translate-x-1/2 translate-y-0',
			arrow:
				'after:left-1/2 after:-translate-x-1/2 after:translate-y-1/2 bottom-full left-1/2 -ml-[15px] w-[30px] h-[15px]'
		},
		left: {
			container: 'top-1/2 right-full mr-5 translate-x-0 -translate-y-1/2',
			arrow:
				'after:left-0 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 left-full top-1/2 -mt-[15px] w-[15px] h-[30px]'
		},
		right: {
			container: 'top-1/2 left-full ml-5 translate-x-0 -translate-y-1/2',
			arrow:
				'after:left-0 after:top-1/2 after:translate-x-1/2 after:-translate-y-1/2 right-full top-1/2 -mt-[15px] w-[15px] h-[30px]'
		}
	};
</script>

<div
	class={cn('group relative inline-block cursor-pointer text-left', styleClass)}
	data-testid="tooltip"
>
	<!-- adds a default icon for tooltip when no icon is passed to the slot -->
	{#if !$$slots.tooltipIcon}
		<img src={staticImages.alertV2Icon} alt="Info" width="16px" class="icon-invert" />
	{/if}
	<slot name="tooltipIcon" />
	<div
		class={cn(
			'absolute z-100 box-border hidden w-max max-w-[320px] rounded-xl bg-secondary-content p-3 shadow-[0px_12px_16px_-4px_#10182814] group-hover:block',
			tooltipPosition[placement].container
		)}
	>
		<slot name="tooltipContent" />
		<i
			class={cn(
				'absolute overflow-hidden after:absolute after:h-[15px] after:w-[15px] after:rotate-45 after:bg-secondary-content after:shadow-[0px_12px_16px_-4px_#10182814]',
				tooltipPosition[placement].arrow
			)}
		></i>
		<div class="after:left-0 after:top-1/2 after:-translate-y-1/2 after:translate-x-1/2"></div>
	</div>
</div>
