<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { handleCopyClick } from '$lib/utils/helpers/componentHelper';
	import { staticImages } from '../images/staticImages';

	export let title: string;
	export let tooltipText = '';
	export let value = '';
	export let textStyle = '';
	export let centered = false;
	export let cliboardContent: string | undefined = '';

	$: successMessage = `${title} copied to clipboard`;
</script>

<InputCard variant={'primary'}>
	<div class="mb-1 flex items-center gap-1 {centered ? 'justify-center' : ''}">
		<Text variant="small" text={title} />
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
			variant="small"
			text={value}
			fontWeight="font-medium"
			styleClass="flex {textStyle} {centered ? 'items-center justify-center text-center' : ''}"
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
