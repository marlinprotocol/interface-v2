<script lang="ts">
	import type { TooltipDirection, TooltipVariant } from '$lib/types/componentTypes';

	export let tooltipText: string;
	export let styleClass = '';
	export let tooltipVariant: TooltipVariant = 'tooltip-secondary';
	export let tooltipDirection: TooltipDirection = 'tooltip-top';

	$: tooltipClass = `tooltip text-left shrink-0 font-normal ${styleClass} ${tooltipVariant} ${tooltipDirection} flex`;
</script>

<!-- TODO: check tooltip hidden issue: something to do with position -->

<div class={tooltipClass} data-tip={tooltipText}>
	<slot />
</div>
