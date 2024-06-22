<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { connected, walletBalanceStore, walletStore } from '$lib/data-stores/walletProviderStore';
	import { POND_PRECISIONS, DEFAULT_CURRENCY_DECIMALS } from '$lib/utils/constants/constants';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import {
		handleDecreaseStakeInKalypso,
		handleInitiateDecreaseStakeInKalypso
	} from '$lib/utils/services/kalypsoServices';

	let withdrawBtnLoading = false;
	let withdrawAmountString = '';
	let withdrawAmountIsValid = true;
	let withdrawAmountErrorMessage = '';
	let initiateWithdrawBtnLoading = false;

	async function handleInitiateWithdrawClick() {
		initiateWithdrawBtnLoading = true;
		console.log('Initiating withdraw stake in Kalypso for', withdrawAmount);
		try {
			await handleInitiateDecreaseStakeInKalypso(withdrawAmount);
			initiateWithdrawBtnLoading = false;
		} catch (error) {
			initiateWithdrawBtnLoading = false;
		}
	}

	async function handleWithdrawClick() {
		withdrawBtnLoading = true;
		console.log('Withdrawing stake from Kalypso button clicked');
		try {
			await handleDecreaseStakeInKalypso($walletStore.address, withdrawAmount);
			withdrawBtnLoading = false;
			withdrawAmountString = '';
		} catch (error) {
			withdrawBtnLoading = false;
		}
	}

	function handleMaxClick() {
		if ($walletBalanceStore.pond) {
			withdrawAmountString = bigNumberToString(
				$kalypsoStore.stakingDetails.stakedAmount,
				18,
				POND_PRECISIONS,
				false
			);
			withdrawAmountIsValid = true;
		}
	}

	const handleUpdatedAmount = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.value) {
			const isAmount = isInputAmountValid(target.value);
			const isLessThanWalletBalance =
				stringToBigNumber(target.value, 18) < $walletBalanceStore.pond;
			withdrawAmountErrorMessage = inputAmountInValidMessage(target.value);
			withdrawAmountIsValid =
				isAmount && isLessThanWalletBalance && withdrawAmountErrorMessage === '';
		} else {
			withdrawAmountIsValid = true;
		}
	};

	$: balanceText = `Staked Amount: ${bigNumberToString(
		$kalypsoStore.stakingDetails.stakedAmount,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)}`;
	$: withdrawAmount = isInputAmountValid(withdrawAmountString)
		? stringToBigNumber(withdrawAmountString, 18)
		: 0n;
	$: enableWithdrawBtn = withdrawAmount > 0n && withdrawAmountIsValid && !withdrawBtnLoading;
	$: enableInitiateWithdrawBtn =
		withdrawAmount > 0n && withdrawAmountIsValid && !initiateWithdrawBtnLoading;
</script>

{#if $kalypsoStore.decreaseStake.initiated}
	<AmountInputWithMaxButton
		currency={$chainConfigStore.tokens.MOCK?.currency}
		inputAmountString={bigNumberToString($kalypsoStore.decreaseStake.withdrawAmount, 18)}
		maxAmountText={balanceText}
		inputCardVariant="none"
		disabled={true}
	>
		<MaxButton disabled={true} slot="inputMaxButton" />
	</AmountInputWithMaxButton>
	<Button
		onclick={handleWithdrawClick}
		variant="filled"
		loading={withdrawBtnLoading}
		disabled={!enableWithdrawBtn}
		styleClass="w-full font-normal"
		size="large">Withdraw</Button
	>
{:else}
	<AmountInputWithMaxButton
		currency={$chainConfigStore.tokens.MOCK?.currency}
		bind:inputAmountString={withdrawAmountString}
		{handleUpdatedAmount}
		maxAmountText={balanceText}
		inputCardVariant="none"
	>
		<MaxButton disabled={!$connected} slot="inputMaxButton" onclick={handleMaxClick} />
	</AmountInputWithMaxButton>
	<Button
		onclick={handleInitiateWithdrawClick}
		variant="filled"
		loading={initiateWithdrawBtnLoading}
		disabled={!enableInitiateWithdrawBtn}
		styleClass="w-full font-normal"
		size="large">Initiate Withdraw</Button
	>
{/if}
