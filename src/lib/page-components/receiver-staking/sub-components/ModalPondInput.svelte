<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { buttonClasses, dividerClasses } from '$lib/atoms/componentClasses';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import type { ModalInputModel } from '$lib/types/componentTypes';
	import { bigNumbertoNumber, bigNumbertoString } from '$lib/utils/conversion';

	//TODO: remove default values
	export let title: ModalInputModel['title'];
	export let tooltipText: ModalInputModel['tooltipText'] = '';
	export let inputAmount: number;
	export let maxAmount: ModalInputModel['maxAmount'] | undefined = undefined;
	export let maxAmountText: ModalInputModel['maxAmountText'] = 'Balance';

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center',
		rowClass: 'w-full flex items-center justify-between',
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost w-full p-0 fond-bold text-xl focus-within:text-primary focus:outline-none  focus-within:border-b-2 focus:bg-transparent',
		inputEndButton: `${buttonClasses.text} text-lg text-primary font-medium`,
		inputMaxButton: `${buttonClasses.text} text-sm font-bold text-primary`
	};

	const handleMaxClick = () => {
		if (!!maxAmount) {
			//TODO: check if input can handle big number 18 decimals
			inputAmount = bigNumbertoNumber(maxAmount);
		}
	};
</script>

<InputCard>
	<div class={styles.titleIcon}>
		<Text variant="small" text={title} />
		{#if !!tooltipText}
			<TooltipIcon {tooltipText} tooltipVariant="tooltip-secondary" />
		{/if}
	</div>
	<form>
		<div class="flex items-center">
			<input
				bind:value={inputAmount}
				type="number"
				id="pond"
				class={`hideInputNumberAppearance ${styles.inputNumber}`}
				placeholder="0.00"
				required
			/>
			<slot name="input-end-button" />
		</div>
		<Divider />
		<div class="flex items-center gap-2">
			<!-- TODO: replace/remove text -->
			<Tooltip tooltipText="Can add optional text here" tooltipDirection="tooltip-right">
				<button on:click={handleMaxClick} class={styles.inputMaxButton}>MAX</button>
			</Tooltip>
			<div class={dividerClasses.vertical} />
			<Text
				variant="small"
				styleClass="text-gray-400"
				text={`${maxAmountText}: ${!!maxAmount ? bigNumbertoString(maxAmount) : ''}`}
			/>
		</div>
	</form>
</InputCard>
