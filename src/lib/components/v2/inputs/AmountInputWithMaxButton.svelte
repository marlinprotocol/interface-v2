<script lang="ts">
	import InputCard from '$lib/atoms/v2/cards/InputCard.svelte';
	import Divider from '$lib/atoms/v2/divider/Divider.svelte';
	import Text from '$lib/atoms/v2/texts/Text.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { InputCardVariant, ModalInputModel } from '$lib/types/componentTypes';
	import AmountInput from '$lib/components/v2/inputs/AmountInput.svelte';
	import Tooltip from '$lib/atoms/v2/tooltips/Tooltip.svelte';
	export let inputAmountString = '';
	export let maxAmountText: ModalInputModel['maxAmountText'] = 'Balance: 0.00';
	export let maxAmountTooltipText: ModalInputModel['maxAmountTooltipText'] = '';
	export let handleUpdatedAmount: any = undefined;
	export let inputCardVariant: InputCardVariant = 'primary';
	export let currency = '';
	export let showBalance: boolean = true;
</script>

<InputCard variant="primary">
	<form>
		<div class="flex items-center justify-between gap-2">
			<AmountInput
				bind:value={inputAmountString}
				onChange={handleUpdatedAmount}
				styleClass="input input-ghost input-primary text-3xl placeholder:text-[#030115]/[.2]"
				disabled={!handleUpdatedAmount || !$connected}
			/>
			{#if currency !== ''}
				<span class="text-[22px] font-medium">{currency}</span>
			{/if}
		</div>
		{#if inputCardVariant !== 'none'}
			<Divider />
		{/if}
		{#if showBalance}
			<div class="mt-[-10px] flex items-center justify-end gap-2">
				<div class="flex items-center gap-1">
					<Text
						text={maxAmountText}
						variant="small"
						styleClass="text-[#657183]"
						fontWeight="font-normal"
					/>
					{#if maxAmountTooltipText}
						<Tooltip>
							<span slot="tooltipContent" class="text-sm leading-[18px]"
								>{maxAmountTooltipText}</span
							>
						</Tooltip>
					{/if}
				</div>
				{#if $$slots.inputMaxButton}
					<Divider direction="divider-vertical" />
					<slot name="inputMaxButton" />
				{/if}
			</div>
		{/if}
	</form>
</InputCard>
