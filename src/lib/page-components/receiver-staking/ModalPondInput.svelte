<script lang="ts">
	import InputCard from '$lib/components/cards/InputCard.svelte';
	import { buttonClasses, dividerClasses } from '$lib/components/componentClasses';
	import Text from '$lib/components/texts/Text.svelte';
	import Tooltip from '$lib/components/tooltips/Tooltip.svelte';
	import type { ModalInputModel } from '$lib/types/atomTypes';
	import { bigNumbertoNumber, bigNumbertoString } from '$lib/utils/conversion';
	import { BigNumber } from 'ethers';

	//TODO: remove default values
	export let title: ModalInputModel['title'] = 'POND';
	export let tooltipText: ModalInputModel['tooltipText'] = 'Some info here';
	export let maxAmount: ModalInputModel['maxAmount'] | undefined =
		BigNumber.from('20000000000000000000000');
	export let maxAmountText: ModalInputModel['maxAmountText'] = 'Balance';
	export let handleApproveClick: ModalInputModel['handleApproveClick'] | undefined = undefined;

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center',
		rowClass: 'w-full flex items-center justify-between',
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost w-full p-0 fond-bold text-xl focus-within:text-primary focus:outline-none  focus-within:border-b-2 focus:bg-transparent',
		inputEndButton: `${buttonClasses.text} text-lg text-primary font-medium`,
		inputMaxButton: `${buttonClasses.text} text-sm font-bold text-primary`
	};

	let pondAmount: number = 0;
	$: approveDisabled =
		!!maxAmount && (pondAmount <= 0 || pondAmount > bigNumbertoNumber(maxAmount));
	$: pondDisabledText = !!pondAmount && approveDisabled ? 'Insufficient POND' : '';

	const handleMaxClick = () => {
		if (!!maxAmount) {
			pondAmount = bigNumbertoNumber(maxAmount);
		}
	};
</script>

<InputCard>
	<div class={styles.titleIcon}>
		<Text variant="small" text={title} />
		{#if !!tooltipText}
			<Tooltip {tooltipText} variant="secondary" />
		{/if}
	</div>
	<form>
		<div class="flex items-center">
			<input
				bind:value={pondAmount}
				type="number"
				id="pond"
				class={`hideInputNumberAppearance ${styles.inputNumber}`}
				placeholder="0.00"
				required
			/>
			<!-- TODO: check handleApproveClick undefined scenario -->
			{#if handleApproveClick}
				<button
					disabled={approveDisabled}
					type="submit"
					class={styles.inputEndButton}
					on:click={() => (handleApproveClick ? handleApproveClick(pondAmount) : null)}
					>Approve</button
				>
			{/if}
		</div>
		{#if pondDisabledText}
			<Text variant="small" styleClass="text-red-500 mb-4" text={pondDisabledText} />
		{/if}
		<div class={dividerClasses.horizontal} />
		{#if !!maxAmount}
			<div class="flex items-center gap-2 mt-2">
				<button on:click={handleMaxClick} class={styles.inputMaxButton}>MAX</button>
				<div class={dividerClasses.vertical} />
				<Text
					variant="small"
					styleClass="text-gray-400"
					text={`${maxAmountText}: ${bigNumbertoString(maxAmount)}`}
				/>
			</div>
		{/if}
	</form>
</InputCard>
