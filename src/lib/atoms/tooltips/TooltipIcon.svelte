<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import type { TooltipDirection, TooltipVariant } from '$lib/types/componentTypes';

	export let tooltipText: string;
	export let styleClass = '';
	export let iconWidth = '14px';
	export let iconSrc = staticImages.Alert;
	export let tooltipVariant: TooltipVariant = 'tooltip-secondary';
	export let tooltipDirection: TooltipDirection = 'tooltip-top';

	$: tooltipClass = `${styleClass} ${tooltipVariant} ${tooltipDirection}`;
</script>

<div data-testid="tooltip-icon" class="tooltip flex shrink-0 text-left font-normal {tooltipClass}" data-tip={tooltipText}>
	<img src={iconSrc} alt="Info" width={iconWidth} />
</div>
