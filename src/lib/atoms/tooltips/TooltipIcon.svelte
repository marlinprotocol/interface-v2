<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import type { TooltipDirection, TooltipVariant } from '$lib/types/componentTypes';

	export let tooltipText: string;
	export let styleClass = '';
	export let iconWidth = 14;
	export let iconSrc = staticImages.Alert;
	export let tooltipVariant: TooltipVariant = 'tooltip-secondary';
	export let tooltipDirection: TooltipDirection = 'tooltip-top';

	$: tooltipClass = `tooltip text-left shrink-0 font-normal ${styleClass} ${tooltipVariant} ${tooltipDirection} flex`;
</script>

<div class={tooltipClass} data-tip={tooltipText}>
	<img src={iconSrc} alt="Info" width={iconWidth} />
</div>
