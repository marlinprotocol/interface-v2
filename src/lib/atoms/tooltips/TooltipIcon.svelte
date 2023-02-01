<script lang="ts">
	import type { TooltipDirection, TooltipVariant } from '$lib/types/componentTypes';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import info from 'svelte-awesome/icons/info';

	export let tooltipText: string;
	export let styleClass = '';
	export let iconWidth = 15;
	export let tooltipVariant: TooltipVariant = 'tooltip-primary';
	export let tooltipDirection: TooltipDirection = 'tooltip-top';

	$: tooltipClass = `tooltip ${tooltipVariant} ${tooltipDirection} flex ${styleClass}`;
</script>

<div class={tooltipClass} data-tip={tooltipText}>
	<Icon data={info} size={iconWidth} border={true} />
</div>
