<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import {
		receiverStakingStore,
		withdrawStakedBalanceFromReceiverStakingStore
	} from '$lib/data-stores/receiverStakingStore';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import {
		closeModal,
		inputAmountInValidMessage,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import { addPondToWalletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import { withdrawStakingToken } from '$lib/controllers/contract/receiverStaking';

	export let modalFor: string;

	const subtitle =
		'Enter the amount of POND to be unstaked from the receiver address. Unstaking POND is immediate and should reflect in your wallet after the transaction is confirmed.';
	const toolTipText =
		'Enter the amount of POND you would like to unstake from the receiver address.';

	//initial amount states
	let inputAmount: bigint;
	let inputAmountString: string;
	//input amount states
	let inputAmountIsValid = true;
	let updatedAmountInputDirty = false;
	let inValidMessage = '';
	//loading states
	let submitLoading = false;
	// staked pond amount
	let maxAmount = DEFAULT_RECEIVER_STAKING_DATA.stakedBalance;
	let balanceText = 'Staked POND: 0.00';

	const handleUpdatedAmount = (event: Event) => {
		updatedAmountInputDirty = true;
		const target = event.target as HTMLInputElement;
		inputAmountIsValid = target.value ? isInputAmountValid(target.value) : true;
		inValidMessage = inputAmountInValidMessage(target.value);
	};

	const handleMaxClick = () => {
		if (maxAmount) {
			inputAmountString = bigNumberToString(maxAmount);
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
			withdrawStakedBalanceFromReceiverStakingStore(inputAmount);
			addPondToWalletBalanceStore(inputAmount);
			resetInputs();
		} catch (e) {
			console.log('error submitting', e);
		} finally {
			submitLoading = false;
		}
	};

	const resetInputs = () => {
		inputAmountString = '';
		inputAmountIsValid = true;
		updatedAmountInputDirty = false;
		inValidMessage = '';
	};

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: 0n;
	$: pondDisabledText = inputAmount && inputAmount > maxAmount ? 'Insufficient POND' : '';
	$: maxAmount = $receiverStakingStore.stakedBalance + $receiverStakingStore.queuedBalance;
	$: balanceText = `Staked: ${bigNumberToString(
		$receiverStakingStore.stakedBalance,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)}${
		!($receiverStakingStore.queuedBalance === 0n)
			? ' + Queued: ' +
			  bigNumberToString(
					$receiverStakingStore.queuedBalance,
					DEFAULT_CURRENCY_DECIMALS,
					POND_PRECISIONS
			  )
			: ''
	}`;
	$: submitEnable = inputAmount && inputAmount > 0 && maxAmount >= inputAmount;
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">UNSTAKE POND</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<AmountInputWithMaxButton
			title="POND"
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
			styleClass="btn-block w-full"
		>
			CONFIRM
		</Button>
	</svelte:fragment>
</Modal>
