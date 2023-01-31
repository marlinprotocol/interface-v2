<script lang="ts">
	import type { AlertModel } from '$lib/types/componentTypes';
	import {
		getColorClassByVariant,
		getIconbyVariant
	} from '$lib/utils/constants/componentConstants';

	export let show: boolean = false;
	export let text: AlertModel['text'];
	export let variant: AlertModel['variant'] = 'info';
	export let alertVariant: AlertModel['alertVariant'];
	export let duration: AlertModel['duration'] = 3000;

	$: setTimeout(() => {
		if (show) show = false;
	}, duration);

	const baseClass = 'alert shadow-lg fixed bottom-0 right-0 m-4 w-96 py-2 px-4 z-1000 font-medium';
	const colorClass = getColorClassByVariant(variant);
	const image = getIconbyVariant(variant);
</script>

<div class={`${baseClass} ${alertVariant ?? ''} ${colorClass}`} class:hidden={!show}>
	<div>
		<!-- TODO: check color change for svg or use package and check theme settings-->
		<img src={image} alt={variant} class={colorClass} width="18" height="18" />
		<span>{text}</span>
	</div>
</div>
