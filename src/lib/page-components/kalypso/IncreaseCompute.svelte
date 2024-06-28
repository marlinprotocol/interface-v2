<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { doNothing } from '$lib/utils/helpers/commonHelper';
	import { stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import { handleIncreaseDeclaredComputeForKalypso } from '$lib/utils/services/kalypsoServices';

	let vcpuString = '';
	let vcpuErrorMessage = '';
	let vcpuIsValid = true;
	let increaseComputeButtonLoading = false;

	async function handleIncreaseCompute() {
		increaseComputeButtonLoading = true;
		console.log('clicked increase compute button');
		try {
			await handleIncreaseDeclaredComputeForKalypso(vcpuBN);
			increaseComputeButtonLoading = false;
			vcpuString = '';
		} catch (error) {
			increaseComputeButtonLoading = false;
		}
	}

	function getIncreaseComputeError(vcpuString: string) {
		if (vcpuString === '') {
			return 'Please enter number of vCPU(s)';
		} else if (stringToBigNumber(vcpuString) === 0n) {
			return 'vCPU(s) must be greater than 0';
		}
		return '';
	}

	$: vcpuBN = stringToBigNumber(vcpuString, 0);
	$: enableIncreaseCompute = vcpuIsValid && vcpuBN > 0n && !increaseComputeButtonLoading;
	$: increaseComputeError = getIncreaseComputeError(vcpuString);
</script>

<AmountInputWithMaxButton
	currency={'vCPU(s)'}
	bind:inputAmountString={vcpuString}
	inputCardVariant="none"
	handleUpdatedAmount={doNothing}
	showBalance={false}
	onlyInteger={true}
	disabled={$kalypsoStore.decreaseDeclaredCompute.initiated}
></AmountInputWithMaxButton>
{#if $kalypsoStore.decreaseDeclaredCompute.initiated}
	<Button variant="filled" size="large" disabled={true}>
		Declared compute decrease in progress...
	</Button>
{:else if increaseComputeError !== ''}
	<Button variant="filled" styleClass="w-full font-normal" disabled={true} size="large"
		>{increaseComputeError}</Button
	>
{:else}
	<Button
		onclick={handleIncreaseCompute}
		variant="filled"
		styleClass="w-full font-normal"
		size="large"
		loading={increaseComputeButtonLoading}
		disabled={!enableIncreaseCompute}>Increase Compute</Button
	>
{/if}
