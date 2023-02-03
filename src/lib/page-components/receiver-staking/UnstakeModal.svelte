<script lang="ts">
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import ModalPondInput from '$lib/page-components/receiver-staking/sub-components/ModalPondInput.svelte';
	import { DEFAULT_RECEIVER_BALANCE_DATA } from '$lib/utils/constants/storeDefaults';
	import { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	const modalFor = 'unstake-modal';

	//initial amount states
	let inputAmount: BigNumber;

	// staked pond amount
	let maxAmount = BigNumber.from(DEFAULT_RECEIVER_BALANCE_DATA);
	const unsubscribeReceiverStakedStore = receiverStakingStore.subscribe((value) => {
		maxAmount = BigNumber.from(value.balance);
	});

	onDestroy(unsubscribeReceiverStakedStore);

	$: pondDisabledText = !!inputAmount && maxAmount < inputAmount ? 'Insufficient POND' : '';
	$: submitEnable = !!inputAmount && maxAmount >= inputAmount;

	const handleMaxClick = () => {
		if (!!maxAmount) {
			inputAmount = maxAmount;
		}
	};
	const handleSubmitClick = () => {
		// TODO: call submit function and reset input value
		console.log('Submit :>>', inputAmount);
	};

	const styles = {
		inputMaxButton: `${buttonClasses.text} text-sm font-bold text-primary`
	};
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{'UNSTAKE POND'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<ModalPondInput
			title={'POND'}
			tooltipText={'Some text here'}
			bind:inputAmount
			{maxAmount}
			maxAmountText={'Staked'}
		>
			<Tooltip
				slot="input-max-button"
				tooltipText="Can add optional text here"
				tooltipDirection="tooltip-right"
			>
				<button on:click={handleMaxClick} class={styles.inputMaxButton}>MAX</button>
			</Tooltip>
		</ModalPondInput>

		{#if !!pondDisabledText}
			<Text variant="small" styleClass="text-red-500 my-2" text={pondDisabledText} />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		<FilledButton disabled={!submitEnable} onclick={handleSubmitClick} styleClass={'btn-block mt-4'}
			>WITHDRAW STAKE</FilledButton
		>
	</svelte:fragment>
</Modal>
