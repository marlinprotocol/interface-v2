<script lang="ts">
	import type { TooltipModel } from '$lib/types/atomTypes';

	export let tooltipText: string;
	export let styleClass: string = '';
	export let iconSrc: string = './images/infoSecondary.svg';
	export let iconWidth: number = 15;
	export let variant: TooltipModel['variant'] = 'primary';
	export let direction: TooltipModel['direction'] = 'top';

	$: tooltipClass = `tooltip tooltip-${variant} tooltip-${direction} ${styleClass}`;
</script>

<div class={tooltipClass} data-tip={tooltipText}>
	<img src={iconSrc} alt="Tooltip" width={iconWidth} />
</div>
