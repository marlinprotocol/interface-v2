<script lang="ts">
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { withdrawStakingToken } from '$lib/controllers/contractController';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import ModalPondInput from '$lib/page-components/receiver-staking/sub-components/ModalPondInput.svelte';
	import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
	import {
		bigNumberToCommaString,
		bigNumberToString,
		stringToBigNumber
	} from '$lib/utils/conversion';
	import {
		closeModal,
		inputAmountInValidMessage,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	const modalFor = 'unstake-modal';
	const subtitle =
		'Enter the amount of POND to be unstaked from the receiver address. Unstaking POND is immediate and should reflect in your wallet after the transaction is confirmed.';
	const toolTipText =
		'Enter the amount of POND you would like to unstake from the receiver address.';
	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BigNumber.from(0);

	//loading states
	let submitLoading: boolean = false;

	// staked pond amount
	let maxAmount = BigNumber.from(DEFAULT_RECEIVER_STAKING_DATA.stakedBalance);

	let balanceText = 'Staked POND: 0.00';
	const unsubscribeReceiverStakedStore = receiverStakingStore.subscribe((value) => {
		const { stakedBalance, queuedBalance } = value;
		maxAmount = stakedBalance.add(queuedBalance);

		balanceText = `Staked: ${bigNumberToCommaString(stakedBalance)}${
			!queuedBalance.isZero() ? ' + Queued: ' + bigNumberToCommaString(queuedBalance) : ''
		}`;
	});

	onDestroy(unsubscribeReceiverStakedStore);

	//input amount states
	let inputAmountIsValid: boolean = true;
	let updatedAmountInputDirty: boolean = false;
	let inValidMessage: string = '';

	/**
	 * checks if input amount is valid
	 * @param event
	 */
	const handleUpdatedAmount = (event: Event) => {
		updatedAmountInputDirty = true;
		const target = event.target as HTMLInputElement;
		inputAmountIsValid = target.value ? isInputAmountValid(target.value) : true;
		inValidMessage = inputAmountInValidMessage(target.value);
	};

	$: pondDisabledText = !!inputAmount && inputAmount.gt(maxAmount) ? 'Insufficient POND' : '';
	$: submitEnable = !!inputAmount && inputAmount.gt(0) && maxAmount?.gte(inputAmount);

	const handleMaxClick = () => {
		if (!!maxAmount) {
			inputAmountString = bigNumberToString(maxAmount);
			//reset input error message
			inputAmountIsValid = true;
			updatedAmountInputDirty = false;
			inValidMessage = '';
		}
	};
	const handleSubmitClick = async () => {
		submitLoading = true;
		try {
			await withdrawStakingToken(inputAmount);
			closeModal(modalFor);
			//substract input amount first from queued amount and then from staked amount
			receiverStakingStore.update((value) => {
				if (inputAmount.gt(value.queuedBalance)) {
					value.stakedBalance = value.stakedBalance.sub(inputAmount.sub(value.queuedBalance));
					value.queuedBalance = BigNumber.from(0);
				} else {
					value.queuedBalance = value.queuedBalance.sub(inputAmount);
				}
				return value;
			});

			//reset input
			resetInputs();
		} catch (e) {
			console.log('error submitting', e);
		} finally {
			submitLoading = false;
		}
	};

	//reset input
	const resetInputs = () => {
		inputAmountString = '';
		inputAmountIsValid = true;
		updatedAmountInputDirty = false;
		inValidMessage = '';
	};

	const styles = {
		inputMaxButton: `${buttonClasses.text} text-sm font-bold text-primary`
	};
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'UNSTAKE POND'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<ModalPondInput
			title={'POND'}
			tooltipText={toolTipText}
			bind:inputAmountString
			{handleUpdatedAmount}
			maxAmountText={balanceText}
		>
			<button slot="input-max-button" on:click={handleMaxClick} class={styles.inputMaxButton}
				>MAX</button
			>
		</ModalPondInput>
		{#if !inputAmountIsValid && updatedAmountInputDirty}
			<InputCard variant="warning" styles="mt-4 bg-red-100">
				<Text variant="small" styleClass="text-red-500 my-2" text={inValidMessage} />
			</InputCard>
		{/if}
		{#if !!pondDisabledText}
			<InputCard variant="warning" styles="mt-4 bg-red-100">
				<Text variant="small" styleClass="text-red-500 my-2" text={pondDisabledText} />
			</InputCard>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		<FilledButton
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			styleClass={'btn-block h-14 text-base font-semibold'}>WITHDRAW STAKE</FilledButton
		>
	</svelte:fragment>
</Modal>
