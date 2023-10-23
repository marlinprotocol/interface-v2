<script lang="ts">
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS } from '$lib/utils/constants/constants';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import {
		closeModal,
		inputAmountInValidMessage,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import MPondApproveConfirmModal from '$lib/page-components/bridge/modals/MPondApproveConfirmModal.svelte';

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
			title="From"
			bind:inputAmountString
			{handleUpdatedAmount}
			maxAmountText={balanceText}
			inputCardVariant="none"
		>
			<Text slot="input-end-button" text="MPond" fontWeight="font-medium" />
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
			PROCEED TO CONVERSION
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
