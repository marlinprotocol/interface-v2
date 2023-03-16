<script lang="ts">
	import type { TooltipDirection, TooltipVariant } from '$lib/types/componentTypes';

	export let tooltipText: string;
	export let styleClass = '';
	export let iconWidth = 14;
	export let iconSrc = '/images/info.svg';
	export let tooltipVariant: TooltipVariant = 'tooltip-secondary';
	export let tooltipDirection: TooltipDirection = 'tooltip-top';

	$: tooltipClass = `tooltip text-left shrink-0 ${tooltipVariant} ${tooltipDirection} flex ${styleClass}`;
</script>

<div class={tooltipClass} data-tip={tooltipText}>
	<img src={iconSrc} alt="Info" width={iconWidth} />
</div>
