<script lang="ts">
	import type { TooltipDirection, TooltipVariant } from '$lib/types/componentTypes';

	export let tooltipText: string;
	export let styleClass = '';
	export let tooltipVariant: TooltipVariant = 'tooltip-secondary';
	export let tooltipDirection: TooltipDirection = 'tooltip-top';

	$: tooltipClass = `tooltip text-left shrink-0 font-normal ${styleClass} ${tooltipVariant} ${tooltipDirection} flex`;
</script>

<div class={tooltipClass} data-tip={tooltipText}>
	<slot />
</div>
