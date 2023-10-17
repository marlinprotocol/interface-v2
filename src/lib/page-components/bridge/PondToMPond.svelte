<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { connected, walletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import {
		DEFAULT_CURRENCY_DECIMALS,
		MPOND_PRECISIONS,
		POND_PRECISIONS
	} from '$lib/utils/constants/constants';
	import {
		bigNumberToString,
		pondToMPond,
		stringToBigNumber
	} from '$lib/utils/helpers/conversionHelper';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import PondApproveConfirmModal from '$lib/page-components/bridge/PondApproveConfirmModal.svelte';

	let modalFor = 'pond-approve-confirm-modal';
	//initial amount states
	let inputAmount: bigint;
	let inputAmountString: string;
	//input error states
	let inputAmountIsValid = true;
	let inValidMessage = '';
	let updatedAmountInputDirty = false;
	let convertedAmountString: string;
	let balanceText = 'Balance: 0.00';

	const handleMaxClick = () => {
		if ($walletBalanceStore.pond) {
			inputAmountString = bigNumberToString($walletBalanceStore.pond, 18, 18, false);
			inputAmountIsValid = true;
			updatedAmountInputDirty = false;
			inValidMessage = '';
		}
	};

	const handleUpdatedAmount = (event: Event) => {
		updatedAmountInputDirty = true;
		const target = event.target as HTMLInputElement;
		inputAmountIsValid = target.value ? isInputAmountValid(target.value) : true;
		inValidMessage = inputAmountInValidMessage(target.value);
	};

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: 0n;
	// convert pond to mPond by dividing by 10^6
	$: convertedAmountString =
		inputAmount > 0 ? bigNumberToString(pondToMPond(inputAmount), 18, MPOND_PRECISIONS) : '';
	$: balanceText = `Balance: ${bigNumberToString(
		$walletBalanceStore.pond,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)}`;
	$: pondDisabledText =
		inputAmount && inputAmount > 0 && !($walletBalanceStore.pond >= inputAmount)
			? 'Insufficient POND'
			: '';
	$: enableConversion = inputAmount && inputAmount > 0 && $walletBalanceStore.pond >= inputAmount;
</script>

<div class="mx-2 my-2">
	<AmountInputWithMaxButton
		title="From"
		bind:inputAmountString
		{handleUpdatedAmount}
		maxAmountText={balanceText}
		inputCardVariant="none"
	>
		<Text slot="input-end-button" text="POND" fontWeight="font-medium" />
		<MaxButton disabled={!$connected} slot="inputMaxButton" onclick={handleMaxClick} />
	</AmountInputWithMaxButton>
	<ErrorTextCard
		showError={!inputAmountIsValid && updatedAmountInputDirty}
		errorMessage={inValidMessage}
	/>
	<ErrorTextCard showError={!!pondDisabledText} errorMessage={pondDisabledText} />
	<Divider margin="mt-2 mb-3" />
	<AmountInputWithMaxButton
		title="To"
		inputCardVariant="none"
		inputAmountString={convertedAmountString}
	>
		<Text slot="input-end-button" text="MPond" fontWeight="font-medium" />
	</AmountInputWithMaxButton>
</div>
{#if $connected}
	{#if !enableConversion}
		<Button styleClass="h-14 text-base font-semibold flex gap-1 w-full" disabled
			>PROCEED TO CONVERSION</Button
		>
	{:else}
		<ModalButton {modalFor} styleClass="h-14 text-base font-semibold flex gap-1 w-full"
			>PROCEED TO CONVERSION</ModalButton
		>
	{/if}
{:else}
	<ConnectWalletButton isLarge={true} />
{/if}
<PondApproveConfirmModal pond={inputAmount} {modalFor} />
