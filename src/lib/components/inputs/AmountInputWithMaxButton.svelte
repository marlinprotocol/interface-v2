<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { dividerClasses } from '$lib/atoms/componentClasses';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { InputCardVariant, ModalInputModel } from '$lib/types/componentTypes';
	import AmountInput from './AmountInput.svelte';

	export let title: ModalInputModel['title'];
	export let tooltipText: ModalInputModel['tooltipText'] = '';
	export let inputAmountString = '';
	export let maxAmountText: ModalInputModel['maxAmountText'] = 'Balance';
	export let maxAmountTooltipText: ModalInputModel['maxAmountTooltipText'] = '';
	export let handleUpdatedAmount: any = undefined;
	export let inputCardVariant: InputCardVariant = 'primary';

	const styles = {
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost input-primary text-[1.4rem] p-0 ml-0.5 placeholder:text-primary/[.2]'
	};
</script>

<InputCard variant={inputCardVariant}>
	<div class={styles.titleIcon}>
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
				styleClass={styles.inputNumber}
				disabled={!handleUpdatedAmount || !$connected}
				bind:value={inputAmountString}
				onChange={handleUpdatedAmount}
			/>
			<slot name="input-end-button" />
		</div>
		{#if $$slots.inputMaxButton}
			{#if inputCardVariant !== 'none'}
				<Divider />
			{/if}
			<div class="flex items-center gap-2">
				<slot name="inputMaxButton" />
				<div class={dividerClasses.vertical} />
				<div class="flex gap-1">
					<Text
						variant="small"
						styleClass="text-gray-400"
						fontWeight="font-normal"
						text={maxAmountText}
					/>
					{#if maxAmountTooltipText}
						<TooltipIcon
							iconWidth={'16px'}
							tooltipText={maxAmountTooltipText}
							tooltipVariant="tooltip-secondary"
							tooltipDirection="tooltip-bottom"
						/>
					{/if}
				</div>
			</div>
		{/if}
	</form>
</InputCard>
