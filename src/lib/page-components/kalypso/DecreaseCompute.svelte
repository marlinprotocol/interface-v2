<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import { doNothing } from '$lib/utils/helpers/commonHelper';
	import {
		bigNumberToString,
		epochToDurationString,
		stringToBigNumber
	} from '$lib/utils/helpers/conversionHelper';
	import {
		handleDecreaseDeclaredComputeInKalypso,
		handleInitiateDecreaseDeclaredComputeInKalypso
	} from '$lib/utils/services/kalypsoServices';

	let vcpuString = '';
	let vcpuErrorMessage = '';
	let vcpuIsValid = true;
	let decreaseComputeLoading = false;
	let initiateDecreaseComputeLoading = false;
	let endEpochTime = 0;
	let timerHasEnded = false;

	async function handleInitiateDecreaseCompute() {
		console.log('Initiating decrease declared compute in Kalypso for', vcpuBN);
		initiateDecreaseComputeLoading = true;
		if ($chainConfigStore.kalypso) {
			endEpochTime =
				new Date().getTime() / 1000 +
				$chainConfigStore.kalypso.blockMineTime * $chainConfigStore.kalypso.numberOfBlocksToWait;
		}
		try {
			await handleInitiateDecreaseDeclaredComputeInKalypso(vcpuBN, endEpochTime);
			initiateDecreaseComputeLoading = false;
		} catch (error) {
			initiateDecreaseComputeLoading = false;
		}
	}

	async function handleDecreaseDeclaredCompute() {
		console.log('Decreasing declared compute in Kalypso');
		decreaseComputeLoading = true;
		try {
			await handleDecreaseDeclaredComputeInKalypso();
			decreaseComputeLoading = false;
			vcpuString = '';
		} catch (error) {
			decreaseComputeLoading = false;
		}
	}

	function getDecreaseComputeError(vcpuString: string) {
		if (vcpuString === '') {
			return 'Please enter vCPU(s) quantity';
		} else if (stringToBigNumber(vcpuString, 0) === 0n) {
			return 'vCPU quantity must be greater than 0';
		} else if (stringToBigNumber(vcpuString, 0) > maxComputeToDecrease) {
			return 'Quantity must be less than or equal to your balance';
		}
		return '';
	}

	function handleMaxClick() {
		vcpuString = bigNumberToString(maxComputeToDecrease, 0, 0, false);
		vcpuIsValid = true;
	}

	$: maxComputeToDecrease =
		$kalypsoStore.stakingDetails.declaredCompute -
		$kalypsoStore.stakingDetails.sumOfComputeAllocations;
	$: balanceText = `Balance: ${bigNumberToString(maxComputeToDecrease, 0, 0)}`;
	$: vcpuBN = stringToBigNumber(vcpuString, 0);
	$: enableDecreaseCompute = !decreaseComputeLoading && timerHasEnded;
	$: enableInitiateDecreaseCompute = vcpuIsValid && vcpuBN > 0n && !initiateDecreaseComputeLoading;
	$: timerHasEnded =
		$kalypsoStore.decreaseDeclaredCompute.endEpochTime < new Date().getTime() / 1000;
	$: decreaseComputeError = getDecreaseComputeError(vcpuString);
</script>

{#if $kalypsoStore.decreaseDeclaredCompute.initiated}
	<AmountInputWithMaxButton
		currency="vCPU(s)"
		inputAmountString={bigNumberToString($kalypsoStore.decreaseDeclaredCompute.compute, 0, 0)}
		handleUpdatedAmount={doNothing}
		maxAmountText={balanceText}
		inputCardVariant="none"
		onlyInteger={true}
		disabled={true}
	>
		<MaxButton disabled={true} slot="inputMaxButton" />
	</AmountInputWithMaxButton>
	{#if timerHasEnded}
		<Button
			onclick={handleDecreaseDeclaredCompute}
			variant="filled"
			styleClass="w-full font-normal"
			loading={decreaseComputeLoading}
			disabled={!enableDecreaseCompute}
			size="large">Decrease Compute</Button
		>
	{:else}
		<Timer
			timerId="timer-for-decrease-declared-compute"
			endEpochTime={$kalypsoStore.decreaseDeclaredCompute.endEpochTime}
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
		currency={'vCPU(s)'}
		bind:inputAmountString={vcpuString}
		handleUpdatedAmount={doNothing}
		maxAmountText={balanceText}
		inputCardVariant="none"
		onlyInteger={true}
	>
		<MaxButton disabled={!$connected} slot="inputMaxButton" onclick={handleMaxClick} />
	</AmountInputWithMaxButton>
	{#if decreaseComputeError !== ''}
		<Button variant="filled" styleClass="w-full font-normal" disabled={true} size="large"
			>{decreaseComputeError}</Button
		>
	{:else}
		<Button
			onclick={handleInitiateDecreaseCompute}
			variant="filled"
			styleClass="w-full font-normal"
			loading={initiateDecreaseComputeLoading}
			disabled={!enableInitiateDecreaseCompute}
			size="large">Initiate Decrease Compute</Button
		>
	{/if}
{/if}
