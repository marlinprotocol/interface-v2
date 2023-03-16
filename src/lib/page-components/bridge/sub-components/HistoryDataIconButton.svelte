<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import { getTextColorClassByVariant } from '$lib/utils/constants/componentConstants';

	export let src: string = '';
	export let imgWidth: number = 13;
	export let text: string = '';
	export let variant: CommonVariant = 'primary';
	export let disabled: boolean = false;
	export let tooltipText: string = '';
	export let styleClass: string = '';

	const baseClass = 'flex justify-center text-xs gap-1 align-center';
	const textColor = getTextColorClassByVariant(variant);
</script>

<div
	class={`${styleClass} ${baseClass} ${textColor} ${disabled ? 'cursor-auto' : 'cursor-pointer'}`}
>
	{#if !!src}
		<ImageColored {src} {variant} width={imgWidth} />
	{/if}
	{#if !!text}
		<Text {text} variant="tiny" fontWeight={'font-medium'} styleClass="mt-0.5" />
	{/if}
	{#if !!tooltipText}
		<Tooltip {tooltipText} styleClass="text-left">
			<img src={'/images/blue-alert.svg'} alt={'tooltip'} />
		</Tooltip>
	{/if}
</div>
