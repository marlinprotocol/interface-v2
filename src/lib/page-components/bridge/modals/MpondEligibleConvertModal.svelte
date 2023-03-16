<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Dialog from '$lib/atoms/modals/Dialog.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import ModalPondInput from '$lib/page-components/receiver-staking/sub-components/ModalPondInput.svelte';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/conversion';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import { BigNumber } from 'ethers';
	import MPondFinalConversionButton from '../buttons/MPondFinalConversionButton.svelte';

	export let showModal: boolean = false;
	export let maxAmount: BigNumber;
	export let requestEpoch: BigNumber;
	export let handleOnSuccess: (convertedMpond: BigNumber, txnHash: string) => void;

	$: balanceText = `Eligible Balance: ${bigNumberToString(maxAmount)}`;

	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BigNumber.from(0);

	//input amount states
	let inputAmountIsValid: boolean = true;
	let updatedAmountInputDirty: boolean = false;
	let inValidMessage: string = '';

	// checks if input amount is valid
	const handleUpdatedAmount = (event: Event) => {
		updatedAmountInputDirty = true;
		const target = event.target as HTMLInputElement;
		inputAmountIsValid = target.value ? isInputAmountValid(target.value) : true;
		inValidMessage = inputAmountInValidMessage(target.value);
	};

	$: mPondDisabledText =
		!!inputAmount && inputAmount.gt(maxAmount) ? 'Insufficient Eligible MPond Amount' : '';
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

	//reset input
	const resetInputs = () => {
		inputAmountString = '';
		inputAmountIsValid = true;
		updatedAmountInputDirty = false;
		inValidMessage = '';
	};
</script>

<Dialog bind:showModal onClose={resetInputs}>
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
			<Text slot="input-end-button" text="MPond" styleClass="font-medium" />
			<button slot="inputMaxButton" on:click={handleMaxClick} class={buttonClasses.maxButton}
				>MAX</button
			>
		</ModalPondInput>
		<ErrorTextCard
			showError={!inputAmountIsValid && updatedAmountInputDirty}
			errorMessage={inValidMessage}
		/>
		<ErrorTextCard showError={!!mPondDisabledText} errorMessage={mPondDisabledText} />
	</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		<MPondFinalConversionButton
			{inputAmount}
			{submitEnable}
			{requestEpoch}
			handleOnSuccess={(txnHash) => {
				handleOnSuccess(inputAmount, txnHash);
				resetInputs();
				// TODO: check these
				// closeModal(modalFor);
				// closeModal(`mpond-convert-modal-${modalFor}`);
			}}
		/>
	</svelte:fragment>
</Dialog>
