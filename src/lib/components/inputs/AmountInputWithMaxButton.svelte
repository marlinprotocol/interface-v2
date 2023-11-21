<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { InputCardVariant, ModalInputModel } from '$lib/types/componentTypes';
	import AmountInput from '$lib/components/inputs/AmountInput.svelte';

	export let title: ModalInputModel['title'];
	export let tooltipText: ModalInputModel['tooltipText'] = '';
	export let inputAmountString = '';
	export let maxAmountText: ModalInputModel['maxAmountText'] = 'Balance';
	export let maxAmountTooltipText: ModalInputModel['maxAmountTooltipText'] = '';
	export let handleUpdatedAmount: any = undefined;
	export let inputCardVariant: InputCardVariant = 'primary';
</script>

<InputCard variant={inputCardVariant}>
	<div class="flex items-center gap-1">
		<Text variant="small" text={title} />
		{#if tooltipText}
			<TooltipIcon
				{tooltipText}
				tooltipVariant="tooltip-secondary"
				tooltipDirection="tooltip-right"
			/>
		{/if}
	</div>
	<form>
		<div class="flex items-center gap-2">
			<AmountInput
				bind:value={inputAmountString}
				onChange={handleUpdatedAmount}
				styleClass="input input-ghost input-primary text-[1.4rem] p-0 ml-0.5 placeholder:text-primary/[.2]"
				disabled={!handleUpdatedAmount || !$connected}
			/>
			<slot name="input-end-button" />
		</div>
		{#if $$slots.inputMaxButton}
			{#if inputCardVariant !== 'none'}
				<Divider />
			{/if}
			<div class="flex items-center gap-2">
				<slot name="inputMaxButton" />
				<Divider direction="divider-vertical" />
				<div class="flex gap-1">
					<Text
						text={maxAmountText}
						variant="small"
						styleClass="text-[#657183]"
						fontWeight="font-normal"
					/>
					{#if maxAmountTooltipText}
						<TooltipIcon
							tooltipText={maxAmountTooltipText}
							iconWidth="16px"
							tooltipVariant="tooltip-secondary"
							tooltipDirection="tooltip-bottom"
						/>
					{/if}
				</div>
			</div>
		{/if}
	</form>
</InputCard>
