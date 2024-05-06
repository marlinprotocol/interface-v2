<script lang="ts">
	import InputCard from '$lib/atoms/v2/cards/InputCard.svelte';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { handleCopyClick } from '$lib/utils/helpers/componentHelper';
	import { staticImages } from '$lib/components/images/staticImages';

	export let title: string;
	export let tooltipText = '';
	export let value = '';
	export let textStyle = '';
	export let centered = false;
	export let cliboardContent: string | undefined = '';

	$: successMessage = `${title} copied to clipboard`;
</script>

<InputCard variant="v2Input">
	<div class="mb-1 flex items-center gap-1 {centered ? 'justify-center' : ''}">
		<Text
			variant="small"
			text={title}
			styleClass="
		absolute left-[18px] top-[-10px] mb-4 bg-white px-2 font-poppins text-sm font-light text-[#030115]
		"
		/>
		{#if tooltipText}
			<TooltipIcon
				{tooltipText}
				tooltipVariant="tooltip-secondary"
				tooltipDirection="tooltip-right"
			/>
		{/if}
	</div>
	<div class="flex {textStyle} {centered ? 'items-center justify-center text-center' : ''}">
		<Text
			variant="body"
			text={value}
			fontWeight="font-normal"
			styleClass="flex py-[3px] {textStyle} {centered
				? 'items-center justify-center text-center'
				: ''}"
		/>
		{#if cliboardContent !== '' && cliboardContent !== undefined}
			<button
				class="ml-2 w-6 cursor-pointer"
				on:click={(e) => {
					const element = e.currentTarget;
					element.setAttribute('id', 'text-input-card-button');
					handleCopyClick(cliboardContent, successMessage);
				}}
			>
				<ImageColored src={staticImages.CopyGrey} alt="Copy" variant="grey" />
			</button>
		{/if}
	</div>
</InputCard>
