<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import type { InputCardVariant } from '$lib/types/componentTypes';
	import { staticImages } from '../images/staticImages';

	export let styleClass = '';
	export let tooltipText = '';
	export let title: string;
	export let variant: InputCardVariant | undefined;
	export let label: string = '';
	export let showTitle: boolean = true;
	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<InputCard {variant} {styleClass}>
	{#if label}
		<p
			class="absolute left-7 top-[-1px] z-[1] inline-flex bg-base-100 font-poppins text-sm font-normal leading-[1px] text-grey-800"
		>
			{label}
			{#if !!tooltipText}
				<Tooltip styleClass="ml-[5px] mt-[-7px]" placement="right">
					<span slot="tooltipContent" class="whitespace-normal leading-[1.2]">{tooltipText}</span>
				</Tooltip>
			{/if}
		</p>
	{/if}
	<div class="flex items-center justify-between">
		{#if showTitle}
			<div class="flex items-center gap-1">
				<Text variant="small" text={title} />
				{#if !!tooltipText}
					<TooltipIcon {tooltipText} />
				{/if}
			</div>
		{/if}
		<slot name="titleEndButton" />
	</div>
	<div class="flex items-center justify-between">
		<slot />
		<slot name="endInfoBox" />
		<slot name="endButton" />
	</div>
</InputCard>
