<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import { stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import { handleIncreaseDeclaredComputeForKalypso } from '$lib/utils/services/kalypsoServices';

	let vcpuString = '';
	let vcpuErrorMessage = '';
	let vcpuIsValid = true;
	let increaseComputeButtonLoading = false;

	const handleUpdatedAmount = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.value) {
			const isAmount = isInputAmountValid(target.value);
			vcpuErrorMessage = inputAmountInValidMessage(target.value);
			vcpuIsValid = isAmount && vcpuErrorMessage === '';
		} else {
			vcpuIsValid = true;
		}
	};

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

	$: vcpuBN = stringToBigNumber(vcpuString, 0);
	$: enableIncreaseCompute = vcpuIsValid && vcpuBN > 0n && !increaseComputeButtonLoading;
</script>

<AmountInputWithMaxButton
	currency={'vCPU(s)'}
	bind:inputAmountString={vcpuString}
	{handleUpdatedAmount}
	inputCardVariant="none"
	showBalance={false}
	onlyInteger={true}
></AmountInputWithMaxButton>
{#if $kalypsoStore.decreaseDeclaredCompute.initiated}
	<Button variant="filled" size="large" disabled={true}>
		Declared compute decrease in progress...
	</Button>
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
