<script lang="ts">
	import type { TooltipDirection, TooltipVariant } from '$lib/types/atomTypes';

	export let tooltipText: string;
	export let styleClass: string = '';
	export let iconSrc: string = './images/infoSecondary.svg';
	export let iconWidth: number = 15;
	export let tooltipVariant: TooltipVariant = 'tooltip-primary';
	export let tooltipDirection: TooltipDirection = 'tooltip-top';

	$: tooltipClass = `tooltip ${tooltipVariant} ${styleClass} ${tooltipDirection}`;
</script>

<div class={tooltipClass} data-tip={'Fix style: ' + tooltipText}>
	<img src={iconSrc} alt="Tooltip" width={iconWidth} />
</div>
