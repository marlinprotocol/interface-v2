<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { handleCopyClick } from '$lib/utils/helpers/componentHelper';
	import { staticImages } from '$lib/components/images/staticImages';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let title: string;
	export let tooltipText = '';
	export let value = '';
	export let textStyle = '';
	export let centered = false;
	export let cliboardContent: string | undefined = '';

	$: successMessage = `${title} copied to clipboard`;
</script>

<InputCard variant="v2Input">
	<div
		class={cn('mb-1 flex items-center gap-1', {
			'justify-center': centered
		})}
	>
		<Text
			variant="small"
			text={title}
			styleClass="absolute left-[18px] top-[-10px] mb-4 bg-white  font-poppins text-sm font-light text-[#030115]"
		/>
		{#if tooltipText}
			<TooltipIcon
				{tooltipText}
				tooltipVariant="tooltip-secondary"
				tooltipDirection="tooltip-right"
			/>
		{/if}
	</div>
	<div
		class={cn('flex', textStyle, {
			'items-center justify-center text-center': centered
		})}
	>
		<Text
			variant="body"
			text={value}
			fontWeight="font-normal"
			styleClass={cn('flex py-[3px]', textStyle, {
				'items-center justify-center text-center': centered
			})}
		/>
		{#if cliboardContent !== '' && cliboardContent !== undefined}
			<button
				id="text-input-card-button"
				class="ml-2 w-6 cursor-pointer"
				on:click={() => {
					handleCopyClick(cliboardContent, successMessage);
				}}
			>
				<img src={staticImages.copyIcon} alt="Copy" />
			</button>
		{/if}
	</div>
</InputCard>
