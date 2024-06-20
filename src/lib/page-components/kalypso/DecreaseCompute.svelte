<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import {
		handleDecreaseDeclaredComputeInKalypso,
		handleInitiateDecreaseDeclaredComputeInKalypso
	} from '$lib/utils/services/kalypsoServices';

	let vcpuString = '';
	let vcpuErrorMessage = '';
	let vcpuIsValid = true;
	let decreaseComputeLoading = false;
	let initiateDecreaseComputeLoading = false;

	async function handleInitiateDecreaseCompute() {
		initiateDecreaseComputeLoading = true;
		try {
			await handleInitiateDecreaseDeclaredComputeInKalypso(vcpuBN);
			initiateDecreaseComputeLoading = false;
		} catch (error) {
			initiateDecreaseComputeLoading = false;
		}
	}

	async function handleDecreaseDeclaredCompute() {
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
	$: enableDecreaseCompute = vcpuIsValid && vcpuBN > 0n && !decreaseComputeLoading;
	$: enableInitiateDecreaseCompute = vcpuIsValid && vcpuBN > 0n && !initiateDecreaseComputeLoading;
</script>

<AmountInputWithMaxButton
	currency={'vCPU(s)'}
	bind:inputAmountString={vcpuString}
	{handleUpdatedAmount}
	maxAmountText={balanceText}
	inputCardVariant="none"
	onlyInteger={true}
	disabled={$kalypsoStore.decreaseDeclaredCompute.initiated}
>
	<MaxButton
		disabled={!$connected && $kalypsoStore.decreaseDeclaredCompute.initiated}
		slot="inputMaxButton"
		onclick={handleMaxClick}
	/>
</AmountInputWithMaxButton>
{#if $kalypsoStore.decreaseDeclaredCompute.initiated}
	<Button
		onclick={handleDecreaseDeclaredCompute}
		variant="filled"
		styleClass="w-full font-normal"
		loading={decreaseComputeLoading}
		disabled={!enableDecreaseCompute}
		size="large">Decrease Compute</Button
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
