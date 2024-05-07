<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { walletBalanceStore, walletStore } from '$lib/data-stores/walletProviderStore';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import {
		closeModal,
		inputAmountInValidMessage,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import { handleAddRewardBalance } from '$lib/utils/services/receiverRewardServices';

	export let modalFor: string;
	let loading = false;
	let disabled = false;
	let updatedAmountInputDirty = false;
	let inputAmountIsValid = true;
	let inputAmountString = '';
	let invalidMessage = '';

	const toolTipText = 'The lumpsum amount that you are willing to give as rewards to operators.';

	const subtitle =
		'Update rewards balance for operators, so that you can increase per epoch spending and give out more rewards!';

	function resetInputs() {
		inputAmountString = '';
	}

	function handleUpdatedAmount(event: Event) {
		updatedAmountInputDirty = true;
		const target = event.target as HTMLInputElement;
		inputAmountIsValid = target.value ? isInputAmountValid(target.value) : true;
		invalidMessage = inputAmountInValidMessage(target.value);
	}

	function handleMaxClick() {
		if ($walletBalanceStore.pond) {
			inputAmountString = bigNumberToString(
				$walletBalanceStore.pond,
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

	async function handleConfirmClick() {
		loading = true;
		try {
			await handleAddRewardBalance($walletStore.address, inputAmount);
			loading = false;
			closeModal(modalFor);
		} catch (error) {
			loading = false;
			console.error('error while submitting pond for rewards :>>', error);
		}
	}

	$: balanceText = `Balance: ${bigNumberToString(
		$walletBalanceStore.pond,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)} POND`;
	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString, DEFAULT_CURRENCY_DECIMALS)
		: 0n;
	$: approvedAmount = $receiverRewardsStore.amountApproved;
	$: pondDisabledText =
		inputAmount && inputAmount > 0 && !($walletBalanceStore.pond >= inputAmount)
			? 'Insufficient POND'
			: '';
	$: disabled = !(inputAmount > 0) || !(BigInt(inputAmount) <= approvedAmount);
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">ADD REWARDS BALANCE</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<AmountInputWithMaxButton
			title="POND"
			tooltipText={toolTipText}
			bind:inputAmountString
			{handleUpdatedAmount}
			maxAmountText={balanceText}
		>
			<MaxButton slot="inputMaxButton" onclick={handleMaxClick} />
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
			styleClass="btn-block w-full">CONFIRM</Button
		>
	</svelte:fragment>
</Modal>
