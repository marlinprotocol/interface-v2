<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import {
		isInputAmountValid,
		inputAmountInValidMessage,
		closeModal
	} from '$lib/utils/helpers/commonHelper';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import { handleUpdateTicketRewards } from '$lib/utils/services/receiverRewardServices';

	export let modalFor: string;
	let updatedRewardIsDirty = false;
	let rewardInvalidMessage = '';
	let rewardString = '';
	let rewardIsValid = false;
	let reward = 0n;
	let confirmLoading = false;

	const subtitle =
		'Update ticket rewards for operators, not you can increase/decrease per epoch ticket rewards that are given to operators!';
	const rewardToolTipText = 'Reward per ticket for operators.';

	function resetInputs() {
		rewardString = '';
	}

	function handleRewardMaxClick() {
		if ($receiverRewardsStore.rewardBalance) {
			reward = $receiverRewardsStore.rewardBalance;
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
			if (reward === 0n) {
				rewardInvalidMessage = 'Ticket reward cannot be zero.';
				rewardIsValid = false;
			} else if (reward > $receiverRewardsStore.rewardBalance) {
				rewardInvalidMessage = 'Ticket reward cannot be greater than reward balance.';
				rewardIsValid = false;
			} else {
				rewardIsValid = true;
				rewardInvalidMessage = '';
			}
		} else {
			reward = 0n;
			rewardIsValid = false;
			rewardInvalidMessage = inputAmountInValidMessage(target.value);
		}
	}

	async function handleConfirmClick() {
		confirmLoading = true;
		try {
			await handleUpdateTicketRewards(reward);
			confirmLoading = false;
			closeModal(modalFor);
		} catch (error) {
			confirmLoading = false;
			console.error('error while submitting funds for updating ticket rewards', error);
		}
	}
	$: rewardsBalanceText = `Rewards Balance: ${bigNumberToString(
		$receiverRewardsStore.rewardBalance,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)} POND`;
	$: confirmDisabled =
		!rewardIsValid || !(reward > 0n) || reward > $receiverRewardsStore.rewardBalance;
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">'UPDATE TICKET REWARDS'</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<InputCard>
			<AmountInputWithMaxButton
				title="Reward per Ticket"
				bind:inputAmountString={rewardString}
				handleUpdatedAmount={handleRewardChange}
				maxAmountText={rewardsBalanceText}
				inputCardVariant="none"
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
			styleClass="btn-block w-full"
		>
			CONFIRM</Button
		>
	</svelte:fragment>
</Modal>
