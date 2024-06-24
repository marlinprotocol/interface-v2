<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { connected, walletBalanceStore, walletStore } from '$lib/data-stores/walletProviderStore';
	import { POND_PRECISIONS, DEFAULT_CURRENCY_DECIMALS } from '$lib/utils/constants/constants';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		bigNumberToString,
		epochToDurationString,
		stringToBigNumber
	} from '$lib/utils/helpers/conversionHelper';
	import {
		handleDecreaseStakeInKalypso,
		handleInitiateDecreaseStakeInKalypso
	} from '$lib/utils/services/kalypsoServices';

	let withdrawBtnLoading = false;
	let withdrawAmountString = '';
	let withdrawAmountIsValid = true;
	let withdrawAmountErrorMessage = '';
	let initiateWithdrawBtnLoading = false;
	let endEpochTime = 0;
	let timerHasEnded = false;

	async function handleInitiateWithdrawClick() {
		initiateWithdrawBtnLoading = true;
		console.log('Initiating withdraw stake in Kalypso for', withdrawAmount);
		// setting endEpochTime in the store so that when user navigates to a different tab or page the timer should still remain
		if ($chainConfigStore.kalypso) {
			endEpochTime =
				new Date().getTime() / 1000 +
				$chainConfigStore.kalypso?.blockMineTime * $chainConfigStore.kalypso?.numberOfBlocksToWait;
		}
		try {
			await handleInitiateDecreaseStakeInKalypso(withdrawAmount, endEpochTime);
			initiateWithdrawBtnLoading = false;
		} catch (error) {
			initiateWithdrawBtnLoading = false;
		}
	}

	async function handleWithdrawClick() {
		withdrawBtnLoading = true;
		console.log('Withdrawing stake from Kalypso button clicked');
		try {
			await handleDecreaseStakeInKalypso(
				$walletStore.address,
				$kalypsoStore.decreaseStake.withdrawAmount
			);
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
	$: enableWithdrawBtn =
		$kalypsoStore.decreaseStake.withdrawAmount > 0n && !withdrawBtnLoading && timerHasEnded;
	$: enableInitiateWithdrawBtn =
		withdrawAmount > 0n && withdrawAmountIsValid && !initiateWithdrawBtnLoading;
	$: timerHasEnded =
		$kalypsoStore.decreaseStake.initiated &&
		$kalypsoStore.decreaseStake.endEpochTime < new Date().getTime() / 1000;
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
	{#if timerHasEnded}
		<Button
			onclick={handleWithdrawClick}
			variant="filled"
			loading={withdrawBtnLoading}
			disabled={!enableWithdrawBtn}
			styleClass="w-full font-normal"
			size="large">Withdraw</Button
		>
	{:else}
		<Timer
			timerId="timer-for-withdraw-stake"
			endEpochTime={$kalypsoStore.decreaseStake.endEpochTime}
			onTimerEnd={() => (timerHasEnded = true)}
		>
			<div slot="active" let:timer class="w-full">
				<Button
					variant="filled"
					loading={false}
					disabled={true}
					styleClass="w-full font-normal"
					size="large"
					>Please wait {epochToDurationString(timer)}
				</Button>
			</div>
		</Timer>
	{/if}
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
