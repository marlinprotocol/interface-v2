<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import {
		closeModal,
		inputAmountInValidMessage,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import { handleFundsWithdrawFromJob } from '$lib/utils/services/oysterServices';
	import { DEFAULT_PRECISION } from '$lib/utils/constants/constants';
	import { oysterTokenMetadataStore, oysterRateMetadataStore } from '$lib/data-stores/oysterStore';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	//initial states
	let inputAmount: bigint;
	let inputAmountString: string;
	//error message states
	let inputAmountIsValid = true;
	let inValidMessage = '';
	let updatedAmountInputDirty = false;

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
			inputAmountString = bigNumberToString(
				maxAmount,
				$oysterTokenMetadataStore.decimal,
				DEFAULT_PRECISION,
				false
			);
			//reset input error message
			inputAmountIsValid = true;
			updatedAmountInputDirty = false;
			inValidMessage = '';
		}
	};

	const handleSubmitClick = async () => {
		submitLoading = true;
		await handleFundsWithdrawFromJob(jobData, inputAmount, Number(durationReduced));
		submitLoading = false;
		resetInputs();
		closeModal(modalFor);
	};

	function getMaxAmountForJob(rate: bigint, balance: bigint) {
		if (rate && balance) {
			const downScaledRate = rate / $oysterRateMetadataStore.oysterRateScalingFactor;
			const amountForDownTime =
				downScaledRate * BigInt($oysterRateMetadataStore.rateReviseWaitingTime);
			const finalBalance = balance - amountForDownTime;
			return finalBalance >= 0n ? finalBalance : 0n;
		}
		return 0n;
	}

	$: ({ rate, balance, downScaledRate } = jobData);
	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString, $oysterTokenMetadataStore.decimal)
		: 0n;
	$: maxDisabedText =
		updatedAmountInputDirty && inputAmount && inputAmount > maxAmount ? 'Insufficient balance' : '';
	$: submitEnable = inputAmount && inputAmount > 0 && maxAmount >= inputAmount;
	$: maxAmount = getMaxAmountForJob(rate, balance);
	$: durationReduced = inputAmount > 0 ? inputAmount / downScaledRate : 0n;
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
			title="Amount"
			bind:inputAmountString
			{handleUpdatedAmount}
			inputCardVariant={'none'}
			maxAmountText={'Available balance: ' +
				bigNumberToString(maxAmount, $oysterTokenMetadataStore.decimal) +
				' ' +
				$oysterTokenMetadataStore.currency}
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
