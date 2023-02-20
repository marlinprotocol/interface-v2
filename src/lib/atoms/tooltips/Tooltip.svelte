<script lang="ts">
	import type { TooltipDirection, TooltipVariant } from '$lib/types/componentTypes';

	export let tooltipText: string;
	export let styleClass = '';
	export let tooltipVariant: TooltipVariant = 'tooltip-secondary';
	export let tooltipDirection: TooltipDirection = 'tooltip-top';

	$: tooltipClass = `tooltip ${tooltipVariant} ${tooltipDirection} flex ${styleClass}`;
</script>

<div class={tooltipClass} data-tip={tooltipText}>
	<slot />
</div>
