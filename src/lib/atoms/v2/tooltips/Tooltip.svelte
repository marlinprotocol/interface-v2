<script lang="ts">
	import type { TooltipDirection, TooltipVariant } from '$lib/types/componentTypes';

	export let tooltipText: string;
	export let styleClass = '';
	export let tooltipVariant: TooltipVariant = 'tooltip-secondary';
	export let tooltipDirection: TooltipDirection = 'tooltip-top';

	$: tooltipClass = `${styleClass} ${tooltipVariant} ${tooltipDirection}`;
</script>

<div
	data-testid="tooltip"
	class="tooltip inline-flex text-left font-normal {tooltipClass}"
	data-tip={tooltipText}
>
	<slot />
</div>
