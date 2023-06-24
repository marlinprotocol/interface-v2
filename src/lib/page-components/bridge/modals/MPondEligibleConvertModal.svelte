<script lang="ts">
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { BIG_NUMBER_ZERO, MPOND_PRECISIONS } from '$lib/utils/constants/constants';
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
	import type { BigNumber } from 'ethers';
	import MPondApproveConfirmModal from './MPondApproveConfirmModal.svelte';

	export let modalFor: string;
	export let maxAmount: BigNumber;
	export let requestEpoch: BigNumber;
	export let rowIndex: number;
	export let handleOnSuccess: (convertedMPond: BigNumber, txnHash: string) => void;

	$: balanceText = `Eligible Balance: ${bigNumberToCommaString(maxAmount, MPOND_PRECISIONS)}`;

	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;
	let modalForMPondApproveConfirm = 'mpond-approve-confirm-modal';

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BIG_NUMBER_ZERO;

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

	$: mPondDisabledText = inputAmount && inputAmount.gt(maxAmount) ? 'Insufficient balance' : '';
	$: submitEnable = inputAmount && inputAmount.gt(0) && maxAmount?.gte(inputAmount);
	$: modalIdWithRowIndex = `${modalForMPondApproveConfirm}-${rowIndex}`;

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
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'Enter an amount'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<AmountInputWithMaxButton
			title="From"
			bind:inputAmountString
			{handleUpdatedAmount}
			maxAmountText={balanceText}
			inputCardVariant={'none'}
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
