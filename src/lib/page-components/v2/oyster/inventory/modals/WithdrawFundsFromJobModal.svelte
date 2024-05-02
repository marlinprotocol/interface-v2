<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import Modal from '$lib/atoms/v2/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithMaxButton from '$lib/components/v2/inputs/AmountInputWithMaxButton.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import {
		closeModal,
		inputAmountInValidMessage,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import {
		handleFundsWithdrawFromCreditJob,
		handleFundsWithdrawFromJob
	} from '$lib/utils/services/oysterServices';
	import { DEFAULT_PRECISION } from '$lib/utils/constants/constants';
	import { oysterTokenMetadataStore, oysterRateMetadataStore } from '$lib/data-stores/oysterStore';
	import { OYSTER_MARLIN_CREDIT_METADATA } from '$lib/utils/constants/oysterConstants';
	import Divider from '$lib/atoms/v2/divider/Divider.svelte';

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
		if (isCreditJob) {
			await handleFundsWithdrawFromCreditJob(jobData, inputAmount, Number(durationReduced));
		} else {
			await handleFundsWithdrawFromJob(jobData, inputAmount, Number(durationReduced));
		}
		submitLoading = false;
		resetInputs();
		closeModal(modalFor);
	};

	function getMaxAmountForJob(rateScaled: bigint, balance: bigint) {
		if (rateScaled && balance) {
			const _rate = rateScaled / $oysterRateMetadataStore.oysterRateScalingFactor;
			const amountForDownTime = _rate * BigInt($oysterRateMetadataStore.rateReviseWaitingTime);
			const finalBalance = balance - amountForDownTime;
			return finalBalance >= 0n ? finalBalance : 0n;
		}
		return 0n;
	}

	function getMaxAmountText(isCreditJob: boolean | undefined) {
		return isCreditJob
			? `Available balance: ${bigNumberToString(
					maxAmount,
					OYSTER_MARLIN_CREDIT_METADATA.decimal
				)} ${OYSTER_MARLIN_CREDIT_METADATA.currency.split('_')[1]}`
			: `Available balance: ${bigNumberToString(maxAmount, $oysterTokenMetadataStore.decimal)} ${
					$oysterTokenMetadataStore.currency
				}`;
	}

	$: ({ rateScaled, balance, rate, isCreditJob } = jobData);
	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString, $oysterTokenMetadataStore.decimal)
		: 0n;
	$: maxDisabedText =
		updatedAmountInputDirty && inputAmount && inputAmount > maxAmount ? 'Insufficient balance' : '';
	$: submitEnable = inputAmount && inputAmount > 0 && maxAmount >= inputAmount;
	$: maxAmount = getMaxAmountForJob(rateScaled, balance);
	$: durationReduced = inputAmount > 0 ? inputAmount / rate : 0n;
	$: maxAmountText = getMaxAmountText(isCreditJob);
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">Withdraw Funds</svelte:fragment>

	<svelte:fragment slot="content">
		<AmountInputWithMaxButton
			bind:inputAmountString
			{handleUpdatedAmount}
			inputCardVariant="none"
			{maxAmountText}
			currency="Amount"
			showBalance={false}
		/>
		<div class="mt-4 flex items-center justify-end gap-2">
			<MaxButton styleClass="font-medium" onclick={handleMaxClick} />
			<Divider direction="divider-vertical" />
			<div class="flex items-center gap-1">
				<Text
					text={maxAmountText}
					variant="small"
					styleClass="text-[#030115]"
					fontWeight="font-normal"
				/>
			</div>
		</div>
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
			styleClass="btn-block w-full my-0">WITHDRAW</Button
		>
	</svelte:fragment>
</Modal>
