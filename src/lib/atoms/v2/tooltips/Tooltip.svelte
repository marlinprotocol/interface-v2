<script lang="ts">
	import type { TooltipPlacement } from '$lib/types/v2/componentTypes';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let placement: TooltipPlacement = 'top';
	export let minWidth: string = '';

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

<div class="group relative inline-block cursor-pointer text-left" data-testid="tooltip">
	<slot name="tooltipIcon" />
	<div
		class={cn(
			'absolute z-[999999999] box-border hidden min-w-[320px] rounded-xl bg-white shadow-[0px_12px_16px_-4px_#10182814] group-hover:block',
			tooltipPosition[placement].container
		)}
		style={`min-width: ${minWidth}`}
	>
		<slot name="tooltipContent" />
		<i
			class={cn(
				'absolute overflow-hidden after:absolute after:h-[15px] after:w-[15px] after:rotate-45 after:bg-white after:shadow-[0px_12px_16px_-4px_#10182814]',
				tooltipPosition[placement].arrow
			)}
		></i>
		<div class="after:left-0 after:top-1/2 after:-translate-y-1/2 after:translate-x-1/2"></div>
	</div>
</div>
