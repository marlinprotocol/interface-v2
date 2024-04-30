<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import ConnectWalletButton from '$lib/components/v2/header/sub-components/ConnectWalletButton.svelte';
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
	import AmountInputWithMaxButton from '$lib/components/v2/inputs/AmountInputWithMaxButton.svelte';
	import PondApproveConfirmModal from '$lib/page-components/v2/bridge/PondApproveConfirmModal.svelte';
	import Tab from '$lib/atoms/v2/tabs/Tab.svelte';
	import ConversionHistoryButton from './sub-components/ConversionHistoryButton.svelte';
	import { ROUTES } from '$lib/utils/constants/v2/urls';

	export let activeTabValue = 'pond';
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
			inputAmountString = bigNumberToString($walletBalanceStore.pond, 18, POND_PRECISIONS, false);
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
	$: mpondBalanceText = `Balance: ${bigNumberToString(
		$walletBalanceStore.mpond,
		DEFAULT_CURRENCY_DECIMALS,
		MPOND_PRECISIONS
	)}`;
	$: pondDisabledText =
		inputAmount && inputAmount > 0 && !($walletBalanceStore.pond >= inputAmount)
			? 'Insufficient Pond'
			: '';
	$: enableConversion = inputAmount && inputAmount > 0 && $walletBalanceStore.pond >= inputAmount;
</script>

<AmountInputWithMaxButton
	currency="Pond"
	bind:inputAmountString
	{handleUpdatedAmount}
	maxAmountText={balanceText}
	inputCardVariant="none"
>
	<MaxButton disabled={!$connected} slot="inputMaxButton" onclick={handleMaxClick} />
</AmountInputWithMaxButton>
<Tab id="pond" on:click={() => (activeTabValue = 'mPond')}>MPond</Tab>
<AmountInputWithMaxButton
	currency="MPond"
	inputCardVariant="none"
	inputAmountString={convertedAmountString}
	maxAmountText={mpondBalanceText}
></AmountInputWithMaxButton>
{#if $connected}
	{#if !enableConversion}
		<Button styleClass="h-14 text-base font-semibold flex gap-1 w-full mt-4" disabled
			>PROCEED TO CONVERSION</Button
		>
	{:else}
		<ModalButton {modalFor} styleClass="h-14 text-base font-semibold flex gap-1 w-full mt-4"
			>PROCEED TO CONVERSION</ModalButton
		>
	{/if}
{:else}
	<ConnectWalletButton styleClass="mt-4" isLarge={true} />
{/if}
<a class="mt-4 block" href={ROUTES.POND_HISTORY_PAGE_URL}>
	<ConversionHistoryButton firstText="Pond" secondText="MPond" />
</a>
<ErrorTextCard
	showError={!inputAmountIsValid && updatedAmountInputDirty}
	errorMessage={inValidMessage}
/>
<ErrorTextCard showError={!!pondDisabledText} errorMessage={pondDisabledText} />
<PondApproveConfirmModal pond={inputAmount} {modalFor} />
