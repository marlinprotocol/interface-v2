<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';
	import ModalApproveButton from '$lib/page-components/receiver-staking/sub-components/ModalApproveButton.svelte';
	import {
		BIG_NUMBER_ZERO,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	} from '$lib/utils/constants/constants';
	import {
		closeModal,
		inputAmountInValidMessage,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';

	export let modalFor: string;
	let loading = false;
	let disabled = false;
	let approveLoading = false;
	let updatedAmountInputDirty = false;
	let inputAmountIsValid = true;
	let inputAmountString = '';
	let invalidMessage = '';

	const toolTipText = 'The lumpsum amount that you are willing to give as rewards to operators.';

	const subtitle =
		'Update rewards balance for operators, so that you can increase per epoch spending and give out more rewards!';

	function resetInputs() {
		console.log('reset inputs for update rewards balance');
	}

	function handleUpdatedAmount(event: Event) {
		updatedAmountInputDirty = true;
		const target = event.target as HTMLInputElement;
		inputAmountIsValid = target.value ? isInputAmountValid(target.value) : true;
		invalidMessage = inputAmountInValidMessage(target.value);
	}

	function handleMaxClick() {
		if ($walletBalance.pond) {
			inputAmountString = bigNumberToString(
				$walletBalance.pond,
				DEFAULT_CURRENCY_DECIMALS,
				POND_PRECISIONS,
				false
			);
			//reset input error message
			inputAmountIsValid = true;
			updatedAmountInputDirty = false;
			invalidMessage = '';
		}
	}

	function handleConfirmClick() {
		loading = true;
		try {
			// TODO: add confirm logic here
			receiverRewardsStore.update((value) => {
				return {
					...value,
					amountApproved: value.amountApproved.sub(inputAmount),
					rewardBalance: value.rewardBalance.add(inputAmount)
				};
			});
			walletBalance.update((value) => {
				return {
					...value,
					pond: value.pond.sub(inputAmount)
				};
			});
			loading = false;
			closeModal(modalFor);
		} catch (error) {
			console.error('error while submitting pond for rewards :>>', error);
			loading = false;
		}
	}
	function handleApproveClick() {
		approveLoading = true;
		try {
			// add approve logic here
			receiverRewardsStore.update((value) => {
				return {
					...value,
					amountApproved: inputAmount
				};
			});
			approveLoading = false;
		} catch (error) {
			approveLoading = false;
			console.error('error while approving pond for rewards :>>', error);
		}
	}

	$: balanceText = `Balance: ${bigNumberToString(
		$walletBalance.pond,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)} POND`;
	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString, DEFAULT_CURRENCY_DECIMALS)
		: BIG_NUMBER_ZERO;
	$: approvedAmount = $receiverRewardsStore.amountApproved;
	$: approveDisabled =
		!inputAmount ||
		!inputAmount.gt(0) ||
		!$walletBalance.pond?.gte(inputAmount) ||
		approvedAmount?.gte(inputAmount);
	$: pondDisabledText =
		inputAmount && inputAmount.gt(0) && !$walletBalance.pond?.gte(inputAmount)
			? 'Insufficient POND'
			: '';
	$: disabled = !inputAmount.gt(0) || !inputAmount.lte(approvedAmount);
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'ADD REWARDS BALANCE'}
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
			<ModalApproveButton
				slot="input-end-button"
				disabled={approveDisabled}
				loading={approveLoading}
				bind:inputAmount
				bind:approvedAmount
				{handleApproveClick}
			/>
		</AmountInputWithMaxButton>
		<ErrorTextCard
			showError={!inputAmountIsValid && updatedAmountInputDirty}
			errorMessage={invalidMessage}
		/>
		<ErrorTextCard showError={!!pondDisabledText} errorMessage={pondDisabledText} />
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			{disabled}
			{loading}
			onclick={handleConfirmClick}
			size="large"
			styleClass={'btn-block w-full'}>{'CONFIRM'}</Button
		>
	</svelte:fragment>
</Modal>
