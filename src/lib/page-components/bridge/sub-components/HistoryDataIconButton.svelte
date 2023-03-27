<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import type { CommonVariant, TextModel } from '$lib/types/componentTypes';
	import { getTextColorClassByVariant } from '$lib/utils/constants/componentConstants';

	export let src = '';
	export let imgWidth = 13;
	export let text = '';
	export let variant: CommonVariant = 'primary';
	export let disabled = false;
	export let tooltipText = '';
	export let fontWeight: TextModel['fontWeight'] = 'font-semibold';

	const baseClass = 'flex justify-center text-xs gap-1 align-center';
	const textColor = getTextColorClassByVariant(variant);
</script>

<div class={`${baseClass} ${textColor} ${disabled ? 'cursor-auto' : 'cursor-pointer'}`}>
	{#if src}
		<ImageColored {src} {variant} width={imgWidth} />
	{/if}
	{#if text}
		<Text {text} variant="tiny" {fontWeight} />
	{/if}
	{#if tooltipText}
		<Tooltip tooltipDirection="tooltip-left" {tooltipText} styleClass="text-left">
			<img src={'/images/blue-alert.svg'} alt={'tooltip'} />
		</Tooltip>
	{/if}
</div>
