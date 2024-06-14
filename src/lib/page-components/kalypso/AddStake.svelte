<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { connected, walletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import { isInputAmountValid, inputAmountInValidMessage } from '$lib/utils/helpers/commonHelper';
	import { stringToBigNumber, bigNumberToString } from '$lib/utils/helpers/conversionHelper';

	let stakeAmountIsValid = true;
	let stakeAmountString = '';
	let stakeAmountErrorMessage = '';
	let approveLoading = false;
	let addButttonLoading = false;

	function handleApproveClick() {
		approveLoading = true;
		console.log('Approve button clicked');
		approveLoading = false;
	}

	function handleAddClick() {
		addButttonLoading = true;
		console.log('Add button clicked');
		addButttonLoading = false;
	}
	const handleUpdatedAmount = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.value) {
			const isAmount = isInputAmountValid(target.value);
			const isLessThanWalletBalance =
				stringToBigNumber(target.value, 18) < $walletBalanceStore.pond;
			stakeAmountErrorMessage = inputAmountInValidMessage(target.value);
			stakeAmountIsValid = isAmount && isLessThanWalletBalance && stakeAmountErrorMessage === '';
		} else {
			stakeAmountIsValid = true;
		}
	};

	function handleMaxClick() {
		if ($walletBalanceStore.pond) {
			stakeAmountString = bigNumberToString($walletBalanceStore.mock, 18, POND_PRECISIONS, false);
			stakeAmountIsValid = true;
		}
	}

	$: balanceText = `Wallet Balance: ${bigNumberToString(
		$walletBalanceStore.mock,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)}`;
	$: stakeAmount = isInputAmountValid(stakeAmountString)
		? stringToBigNumber(stakeAmountString, 18)
		: 0n;
	$: enableApproveBtn =
		stakeAmount > $kalypsoStore.approvedAmount &&
		stakeAmountIsValid &&
		stakeAmount !== 0n &&
		!approveLoading;
	$: enableAddButton =
		stakeAmount <= $kalypsoStore.approvedAmount &&
		stakeAmountIsValid &&
		stakeAmount !== 0n &&
		!addButttonLoading;
</script>

<AmountInputWithMaxButton
	currency={$chainConfigStore.tokens.MOCK?.currency}
	bind:inputAmountString={stakeAmountString}
	{handleUpdatedAmount}
	maxAmountText={balanceText}
	inputCardVariant="none"
>
	<MaxButton disabled={!$connected} slot="inputMaxButton" onclick={handleMaxClick} />
</AmountInputWithMaxButton>
{#if stakeAmount > $kalypsoStore.approvedAmount}
	<Button
		onclick={handleApproveClick}
		variant="filled"
		styleClass="w-full font-normal"
		size="large"
		disabled={!enableApproveBtn}>Approve</Button
	>
{:else}
	<Button
		onclick={handleAddClick}
		variant="filled"
		loading={addButttonLoading}
		disabled={!enableAddButton}
		styleClass="w-full font-normal"
		size="large">Add</Button
	>
{/if}
