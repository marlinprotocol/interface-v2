<script lang="ts">
	import Modal from '$lib/atoms/v2/modals/Modal.svelte';
	import ModalButton from '$lib/atoms/v2/modals/ModalButton.svelte';
	import MaxButton from '$lib/components/v2/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithMaxButton from '$lib/components/v2/inputs/AmountInputWithMaxButton.svelte';
	import { DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS } from '$lib/utils/constants/constants';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import {
		closeModal,
		inputAmountInValidMessage,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import MPondApproveConfirmModal from '$lib/page-components/v2/bridge/modals/MPondApproveConfirmModal.svelte';

	export let modalFor: string;
	export let maxAmount: bigint;
	export let requestEpoch: bigint;
	export let rowIndex: number;
	export let handleOnSuccess: (convertedMPond: bigint, txnHash: string) => void;

	//initial amount states
	let inputAmount: bigint;
	let inputAmountString: string;
	let modalForMPondApproveConfirm = 'mpond-approve-confirm-modal';
	//input amount states
	let inputAmountIsValid = true;
	let updatedAmountInputDirty = false;
	let inValidMessage = '';

	// checks if input amount is valid
	const handleUpdatedAmount = (event: Event) => {
		updatedAmountInputDirty = true;
		const target = event.target as HTMLInputElement;
		inputAmountIsValid = target.value ? isInputAmountValid(target.value) : true;
		inValidMessage = inputAmountInValidMessage(target.value);
	};

	const handleMaxClick = () => {
		if (maxAmount) {
			inputAmountString = bigNumberToString(maxAmount);
			//reset input error message
			inputAmountIsValid = true;
			updatedAmountInputDirty = false;
			inValidMessage = '';
		}
	};

	//reset input
	const resetInputs = () => {
		inputAmountString = '';
		inputAmountIsValid = true;
		updatedAmountInputDirty = false;
		inValidMessage = '';
	};

	const onSuccess = (txn: string) => {
		handleOnSuccess(inputAmount, txn);
		closeModal(modalFor);
		closeModal(modalIdWithRowIndex);
	};

	$: balanceText = `Eligible Balance: ${bigNumberToString(
		maxAmount,
		DEFAULT_CURRENCY_DECIMALS,
		MPOND_PRECISIONS
	)}`;
	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: 0n;
	$: mPondDisabledText = inputAmount && inputAmount > maxAmount ? 'Insufficient balance' : '';
	$: submitEnable = inputAmount && inputAmount > 0 && maxAmount >= inputAmount;
	$: modalIdWithRowIndex = `${modalForMPondApproveConfirm}-${rowIndex}`;
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">Enter an amount</svelte:fragment>
	<svelte:fragment slot="content">
		<AmountInputWithMaxButton
			currency="POND"
			bind:inputAmountString
			{handleUpdatedAmount}
			maxAmountText={balanceText}
			inputCardVariant="none"
		>
			<MaxButton slot="inputMaxButton" onclick={handleMaxClick} />
		</AmountInputWithMaxButton>
		<ErrorTextCard
			showError={!inputAmountIsValid && updatedAmountInputDirty}
			errorMessage={inValidMessage}
		/>
		<ErrorTextCard showError={!!mPondDisabledText} errorMessage={mPondDisabledText} />
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<ModalButton
			modalFor={modalIdWithRowIndex}
			disabled={!submitEnable}
			styleClass="h-14 btn-block"
		>
			Proceed to conversion
		</ModalButton>
	</svelte:fragment>
</Modal>

<MPondApproveConfirmModal
	modalFor={modalIdWithRowIndex}
	{requestEpoch}
	mpondToConvert={inputAmount}
	modalToClose={modalFor}
	handleOnSuccess={onSuccess}
	{rowIndex}
/>
