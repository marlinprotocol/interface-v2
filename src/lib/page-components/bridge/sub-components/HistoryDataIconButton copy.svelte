<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import { getTextColorClassByVariant } from '$lib/utils/constants/componentConstants';

	export let src: string = '';
	export let imgWidth: number = 13;
	export let text: string;
	export let variant: CommonVariant = 'primary';
	export let disabled: boolean = false;
	export let tooltipText: string = '';

	const baseClass = 'flex mt-2 justify-center text-xs gap-1 align-center cursor-pointer';
	const textColor = getTextColorClassByVariant(variant);
</script>

<label
	for="pending-mpond-conversion"
	class={`${baseClass} ${textColor} ${disabled ? 'cursor-not-allowed' : ''}`}
>
	{#if !!src}
		<ImageColored {src} {variant} width={imgWidth} />
	{/if}
	{text}
	{#if !!tooltipText}
		<Tooltip {tooltipText} styleClass="text-left">
			<img src={'/images/blue-alert.svg'} alt={'tooltip'} />
		</Tooltip>
	{/if}
</label>
