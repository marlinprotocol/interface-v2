<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { connected, walletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';

	let vcpuString = '';
	let vcpuErrorMessage = '';
	let vcpuIsValid = true;
	let decreaseComputeLoading = false;

	const handleUpdatedAmount = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.value) {
			const isAmount = isInputAmountValid(target.value);
			const isLessThanWalletBalance =
				stringToBigNumber(target.value, 18) < $walletBalanceStore.pond;
			vcpuErrorMessage = inputAmountInValidMessage(target.value);
			vcpuIsValid = isAmount && isLessThanWalletBalance && vcpuErrorMessage === '';
		} else {
			vcpuIsValid = true;
		}
	};

	function handleMaxClick() {
		console.log('clicked max button');
	}

	$: balanceText = `Balance: ${bigNumberToString(
		$walletBalanceStore.mock,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)}`;
	$: vcpuBN = stringToBigNumber(vcpuString, 0);
	$: enableDecreaseCompute = vcpuIsValid && vcpuBN > 0n && !decreaseComputeLoading;
</script>

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
	variant="filled"
	styleClass="w-full font-normal"
	loading={decreaseComputeLoading}
	disabled={!enableDecreaseCompute}
	size="large">Initiate Decrease Compute</Button
>
