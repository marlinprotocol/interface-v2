<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Dialog from '$lib/atoms/modals/Dialog.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import ModalPondInput from '$lib/page-components/receiver-staking/sub-components/ModalPondInput.svelte';
	import { BigNumberZero, mPondPrecisions } from '$lib/utils/constants/constants';
	import {
		bigNumberToCommaString,
		bigNumberToString,
		stringToBigNumber
	} from '$lib/utils/conversion';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import type { BigNumber } from 'ethers';
	import MPondApproveConfirmModal from './MPondApproveConfirmModal.svelte';

	export let showEligibleConvertDialog = false;
	export let maxAmount: BigNumber;
	export let requestEpoch: BigNumber;
	export let handleOnSuccess: (convertedMPond: BigNumber, txnHash: string) => void;

	$: balanceText = `Eligible Balance: ${bigNumberToCommaString(maxAmount, mPondPrecisions)}`;

	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;
	let showMPondApproveConfirmDialog = false;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BigNumberZero;

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

	$: mPondDisabledText =
		inputAmount && inputAmount.gt(maxAmount) ? 'Insufficient Eligible MPond Amount' : '';
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

	//reset input
	const resetInputs = () => {
		inputAmountString = '';
		inputAmountIsValid = true;
		updatedAmountInputDirty = false;
		inValidMessage = '';
	};
</script>

<Dialog bind:showDialog={showEligibleConvertDialog} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'Enter an amount'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<ModalPondInput
			title="From"
			bind:inputAmountString
			{handleUpdatedAmount}
			maxAmountText={balanceText}
			inputCardVariant={'none'}
		>
			<Text slot="input-end-button" text="MPond" fontWeight="font-medium" />
			<MaxButton slot="inputMaxButton" onclick={handleMaxClick} />
		</ModalPondInput>
		<ErrorTextCard
			showError={!inputAmountIsValid && updatedAmountInputDirty}
			errorMessage={inValidMessage}
		/>
		<ErrorTextCard showError={!!mPondDisabledText} errorMessage={mPondDisabledText} />
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<MPondApproveConfirmModal
			bind:showMPondApproveConfirmDialog
			{requestEpoch}
			mpondToConvert={inputAmount}
			handleOnSuccess={(txn) => {
				console.log('handleOnSuccess 2 :>> ', txn);
				handleOnSuccess(inputAmount, txn);
				showEligibleConvertDialog = false;
				showMPondApproveConfirmDialog = false;
			}}
		/>
		<Button
			variant="filled"
			disabled={!submitEnable}
			onclick={() => {
				showMPondApproveConfirmDialog = true;
			}}
			size="large"
			styleClass={'btn-block'}
		>
			PROCEED TO CONVERSION
		</Button>
	</svelte:fragment>
</Dialog>
