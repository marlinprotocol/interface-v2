<script lang="ts">
	import type { AlertModel } from '$lib/types/componentTypes';
	import {
		getColorClassByVariant,
		getIconbyVariant,
		getTextColorClassByVariant
	} from '$lib/utils/constants/componentConstants';
	import Icon from '$lib/atoms/icons/Icon.svelte';

	export let show: boolean = false;
	export let text: AlertModel['text'];
	export let variant: AlertModel['variant'] = 'info';
	export let alertVariant: AlertModel['alertVariant'];
	export let duration: AlertModel['duration'] = 3000;

	$: setTimeout(() => {
		if (show) show = false;
	}, duration);

	const baseClass =
		'alert shadow-lg fixed bottom-0 right-0 m-4 w-96 py-2 px-4 z-1000 font-medium flex items-center justify-start gap-1';
	const color = getColorClassByVariant(variant);
	const textColor = getTextColorClassByVariant(variant);
	const iconData = getIconbyVariant(variant);

	$: classList = `${baseClass} ${alertVariant ?? ''} ${textColor}`;
</script>

<!-- TODO: add multiple snackbar option by stacking one over another -->
<div class={classList} class:hidden={!show}>
	<Icon data={iconData} size={20} styleClass={`color: ${color}`} />
	<span>{text}</span>
</div>
