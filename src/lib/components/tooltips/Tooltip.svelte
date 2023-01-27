<script lang="ts">
	import type { TooltipDirection, TooltipVariant } from '$lib/types/atomTypes';

	export let tooltipText: string;
	export let styleClass = '';
	export let iconSrc = './images/infoSecondary.svg';
	export let iconWidth = 16;
	export let tooltipVariant: TooltipVariant = 'tooltip-primary';
	export let tooltipDirection: TooltipDirection = 'tooltip-top';

	$: tooltipClass = `tooltip ${tooltipVariant} ${tooltipDirection} ${styleClass}`;
</script>

<div class={tooltipClass} data-tip={tooltipText}>
	<img src={iconSrc} alt="Tooltip" width={iconWidth} />
</div>
