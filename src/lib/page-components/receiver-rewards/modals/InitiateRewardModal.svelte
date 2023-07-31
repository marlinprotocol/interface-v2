<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import ModalApproveButton from '$lib/page-components/receiver-staking/sub-components/ModalApproveButton.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import {
		BIG_NUMBER_ZERO,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	} from '$lib/utils/constants/constants';
	import { connected, walletBalance } from '$lib/data-stores/walletProviderStore';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import Text from '$lib/atoms/texts/Text.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import {
		handleInitiateRewards,
		handleRewardsPondApproval
	} from '$lib/utils/services/receiverRewardServices';

	export let modalFor: string;
	let approveLoading = false;
	let confirmLoading = false;
	let updatedAmountInputDirty = false;
	let inputAmountIsValid = true;
	let inputAmountString = '';
	let invalidMessage = '';
	let updatedRewardIsDirty = false;
	let rewardInvalidMessage = '';
	let rewardString = '';
	let rewardIsValid = false;
	let reward = BIG_NUMBER_ZERO;

	const subtitle = 'Add rewards for operators and make em happier!';
	const toolTipText = 'The lumpsum amount that you are willing to give as rewards to operators.';
	const rewardToolTipText = 'Reward per ticket for operators.';

	function resetInputs() {
		// TODO: add reset logic here
		console.log('reset inputs for add rewards');
	}

	async function handleConfirmClick() {
		confirmLoading = true;
		try {
			await handleInitiateRewards(inputAmount, reward);
			confirmLoading = false;
		} catch (error) {
			confirmLoading = false;
			console.error('error while submitting pond for rewards :>>', error);
		}
	}
	async function handleApproveClick() {
		approveLoading = true;
		try {
			await handleRewardsPondApproval(inputAmount);
			approveLoading = false;
		} catch (error) {
			approveLoading = false;
			console.error('error while approving pond for rewards :>>', error);
		}
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
	function handleRewardMaxClick() {
		if ($receiverRewardsStore.amountApproved) {
			reward = $receiverRewardsStore.amountApproved;
			rewardString = bigNumberToString(reward, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS, false);
			//reset input error message
			rewardIsValid = true;
			updatedRewardIsDirty = false;
			rewardInvalidMessage = '';
		}
	}

	function handleRewardChange(e: Event) {
		updatedRewardIsDirty = true;
		const target = e.target as HTMLInputElement;

		if (isInputAmountValid(target.value)) {
			reward = stringToBigNumber(target.value, DEFAULT_CURRENCY_DECIMALS);
			if (reward.eq(BIG_NUMBER_ZERO)) {
				rewardInvalidMessage = 'Ticket reward cannot be zero.';
				rewardIsValid = false;
			} else if (reward.gt($receiverRewardsStore.amountApproved)) {
				rewardInvalidMessage = 'Ticket reward cannot be greater than approved amount.';
				rewardIsValid = false;
			} else {
				rewardIsValid = true;
				rewardInvalidMessage = '';
			}
		} else {
			reward = BIG_NUMBER_ZERO;
			rewardIsValid = false;
			rewardInvalidMessage = inputAmountInValidMessage(target.value);
		}
	}

	$: balanceText = `Balance: ${bigNumberToString(
		$walletBalance.pond,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)} POND`;
	$: rewardsBalanceText = `Approved Amount: ${bigNumberToString(
		$receiverRewardsStore.amountApproved,
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
	$: confirmDisabled =
		!rewardIsValid || !reward || !reward.gt(0) || approvedAmount?.lt(inputAmount);
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'ADD REWARDS FOR OPERATORS'}
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
		<InputCard styleClass="mt-4">
			<AmountInputWithMaxButton
				title="Reward per Ticket"
				bind:inputAmountString={rewardString}
				handleUpdatedAmount={handleRewardChange}
				maxAmountText={rewardsBalanceText}
				inputCardVariant={'none'}
				tooltipText={rewardToolTipText}
			>
				<Text slot="input-end-button" text="POND" fontWeight="font-medium" />
				<MaxButton disabled={!$connected} slot="inputMaxButton" onclick={handleRewardMaxClick} />
			</AmountInputWithMaxButton>
		</InputCard>
		<ErrorTextCard
			showError={!rewardIsValid && updatedRewardIsDirty}
			errorMessage={rewardInvalidMessage}
		/>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			disabled={confirmDisabled}
			loading={confirmLoading}
			onclick={handleConfirmClick}
			size="large"
			styleClass={'btn-block w-full'}>CONFIRM</Button
		>
	</svelte:fragment>
</Modal>
