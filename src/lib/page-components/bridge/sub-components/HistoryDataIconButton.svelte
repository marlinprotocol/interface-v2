<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import type { CommonVariant, TextModel } from '$lib/types/componentTypes';
	import { getTextColorClassByVariant } from '$lib/utils/helpers/componentHelper';

	export let src = '';
	export let imgWidth = 13;
	export let text = '';
	export let variant: CommonVariant = 'primary';
	export let disabled = false;
	export let tooltipText = '';
	export let fontWeight: TextModel['fontWeight'] = 'font-semibold';

	const textColor = getTextColorClassByVariant(variant);
</script>

<div
	class="align-center flex justify-center gap-1 text-xs {textColor} {disabled
		? 'cursor-auto'
		: 'cursor-pointer'}"
>
	{#if src}
		<ImageColored {src} {variant} width={imgWidth} />
	{/if}
	{#if text}
		<Text {text} variant="tiny" {fontWeight} />
	{/if}
	{#if tooltipText}
		<Tooltip tooltipDirection="tooltip-left" {tooltipText} styleClass="text-left">
			<img src={staticImages.BlueAlert} alt="tooltip" />
		</Tooltip>
	{/if}
</div>
