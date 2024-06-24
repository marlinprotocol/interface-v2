<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
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

	const handleUpdatedAmount = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.value) {
			const isLessThanMaxComputeToDecrease =
				stringToBigNumber(target.value, 0) <= maxComputeToDecrease;
			vcpuIsValid = isLessThanMaxComputeToDecrease;
		} else {
			vcpuIsValid = true;
		}
	};

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
</script>

{#if $kalypsoStore.decreaseDeclaredCompute.initiated}
	<AmountInputWithMaxButton
		currency="vCPU(s)"
		inputAmountString={bigNumberToString($kalypsoStore.decreaseDeclaredCompute.compute, 0, 0)}
		{handleUpdatedAmount}
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
		{handleUpdatedAmount}
		maxAmountText={balanceText}
		inputCardVariant="none"
		onlyInteger={true}
	>
		<MaxButton disabled={!$connected} slot="inputMaxButton" onclick={handleMaxClick} />
	</AmountInputWithMaxButton>
	<Button
		onclick={handleInitiateDecreaseCompute}
		variant="filled"
		styleClass="w-full font-normal"
		loading={initiateDecreaseComputeLoading}
		disabled={!enableInitiateDecreaseCompute}
		size="large">Initiate Decrease Compute</Button
	>
{/if}
