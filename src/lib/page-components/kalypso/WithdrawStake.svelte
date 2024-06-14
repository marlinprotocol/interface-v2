<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { connected, walletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import { POND_PRECISIONS, DEFAULT_CURRENCY_DECIMALS } from '$lib/utils/constants/constants';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';

	let withdrawBtnLoading = false;
	let withdrawAmountString = '';
	let withdrawAmountIsValid = true;
	let withdrawAmountErrorMessage = '';

	function handleWithdrawClick() {
		withdrawBtnLoading = true;
		console.log('Withdraw button clicked');
		withdrawBtnLoading = false;
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
</script>

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
	onclick={handleWithdrawClick}
	variant="filled"
	loading={withdrawBtnLoading}
	disabled={!enableWithdrawBtn}
	styleClass="w-full font-normal"
	size="large">Withdraw</Button
>
