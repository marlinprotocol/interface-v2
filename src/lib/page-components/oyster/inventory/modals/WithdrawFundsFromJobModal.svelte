<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/conversion';
	import {
		closeModal,
		inputAmountInValidMessage,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import { handleFundsWithdrawFromJob } from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	const { currency, decimal } = kOysterRateMetaData;
	$: ({ rate, balance: maxAmount, id } = jobData);

	//initial states
	let inputAmount: BigNumber;
	let inputAmountString: string;
	//error message states
	let inputAmountIsValid = true;
	let inValidMessage = '';
	let updatedAmountInputDirty = false;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BIG_NUMBER_ZERO;

	//loading states
	let submitLoading = false;

	//reset amount
	const resetInputs = () => {
		inputAmountString = '';
		inputAmountIsValid = true;
		updatedAmountInputDirty = false;
		inValidMessage = '';
	};

	const handleUpdatedAmount = async (event: Event) => {
		updatedAmountInputDirty = true;
		const target = event.target as HTMLInputElement;
		inputAmountIsValid = target.value ? isInputAmountValid(target.value) : true;
		inValidMessage = inputAmountInValidMessage(target.value);
	};

	const handleMaxClick = () => {
		if (maxAmount) {
			inputAmountString = bigNumberToString(maxAmount, decimal);
			//reset input error message
			inputAmountIsValid = true;
			updatedAmountInputDirty = false;
			inValidMessage = '';
		}
	};

	const handleSubmitClick = async () => {
		submitLoading = true;
		await handleFundsWithdrawFromJob(jobData, inputAmount);
		submitLoading = false;
		resetInputs();
		closeModal(modalFor);
	};

	$: maxDisabedText =
		updatedAmountInputDirty && inputAmount && inputAmount.gt(maxAmount)
			? 'Insufficient balance'
			: '';
	$: submitEnable = inputAmount && inputAmount.gt(0) && maxAmount?.gte(inputAmount);
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'WITHDRAW FUNDS'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle"
		>{"Enter the amount you'd like to withdraw from this job."}</svelte:fragment
	>
	<svelte:fragment slot="content">
		<AmountInputWithMaxButton
			title="From"
			bind:inputAmountString
			{handleUpdatedAmount}
			inputCardVariant={'none'}
			maxAmountText={'Available balance: ' + bigNumberToString(maxAmount, decimal) + ' ' + currency}
		>
			<Text slot="input-end-button" text="Amount" fontWeight="font-medium" />
			<MaxButton slot="inputMaxButton" onclick={handleMaxClick} />
		</AmountInputWithMaxButton>
		<ErrorTextCard
			showError={!inputAmountIsValid && updatedAmountInputDirty}
			errorMessage={inValidMessage}
		/>
		<ErrorTextCard showError={!!maxDisabedText} errorMessage={maxDisabedText} />
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			size="large"
			styleClass={'btn-block w-full my-0'}>WITHDRAW</Button
		>
	</svelte:fragment>
</Modal>
