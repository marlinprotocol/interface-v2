<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import { withdrawStakingToken } from '$lib/controllers/contractController';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { BigNumberZero, pondPrecisions } from '$lib/utils/constants/constants';
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

	export let modalFor: string;
	const subtitle =
		'Enter the amount of POND to be unstaked from the receiver address. Unstaking POND is immediate and should reflect in your wallet after the transaction is confirmed.';
	const toolTipText =
		'Enter the amount of POND you would like to unstake from the receiver address.';
	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BigNumberZero;

	//loading states
	let submitLoading = false;

	// staked pond amount
	let maxAmount = BigNumber.from(DEFAULT_RECEIVER_STAKING_DATA.stakedBalance);

	let balanceText = 'Staked POND: 0.00';
	const unsubscribeReceiverStakedStore = receiverStakingStore.subscribe((value) => {
		const { stakedBalance, queuedBalance } = value;
		maxAmount = stakedBalance.add(queuedBalance);

		balanceText = `Staked: ${bigNumberToCommaString(stakedBalance, pondPrecisions)}${
			!queuedBalance.isZero()
				? ' + Queued: ' + bigNumberToCommaString(queuedBalance, pondPrecisions)
				: ''
		}`;
	});

	onDestroy(unsubscribeReceiverStakedStore);

	//input amount states
	let inputAmountIsValid = true;
	let updatedAmountInputDirty = false;
	let inValidMessage = '';

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

	$: pondDisabledText = inputAmount && inputAmount.gt(maxAmount) ? 'Insufficient POND' : '';
	$: submitEnable = inputAmount && inputAmount.gt(0) && maxAmount?.gte(inputAmount);

	const handleMaxClick = () => {
		if (maxAmount) {
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
					value.queuedBalance = BigNumberZero;
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
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'UNSTAKE POND'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<AmountInputWithMaxButton
			title={'POND'}
			tooltipText={toolTipText}
			bind:inputAmountString
			{handleUpdatedAmount}
			maxAmountText={balanceText}
		>
			<MaxButton slot="inputMaxButton" onclick={handleMaxClick} />
		</AmountInputWithMaxButton>
		<ErrorTextCard
			showError={!inputAmountIsValid && updatedAmountInputDirty}
			errorMessage={inValidMessage}
		/>
		<ErrorTextCard showError={!!pondDisabledText} errorMessage={pondDisabledText} />
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			size="large"
			styleClass={'btn-block'}
		>
			CONFIRM
		</Button>
	</svelte:fragment>
</Modal>
