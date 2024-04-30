<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import MaxButton from '$lib/components/v2/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import ConnectWalletButton from '$lib/components/v2/header/sub-components/ConnectWalletButton.svelte';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { connected, walletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import {
		DEFAULT_CURRENCY_DECIMALS,
		MPOND_PRECISIONS,
		POND_PRECISIONS
	} from '$lib/utils/constants/constants';
	import {
		bigNumberToString,
		mPondToPond,
		stringToBigNumber
	} from '$lib/utils/helpers/conversionHelper';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';

	import AmountInputWithMaxButton from '$lib/components/v2/inputs/AmountInputWithMaxButton.svelte';
	import { ROUTES } from '$lib/utils/constants/v2/urls';
	import { requestMPondConversion } from '$lib/controllers/contract/bridge';
	import Tab from '$lib/atoms/v2/tabs/Tab.svelte';
	import ConversionHistoryButton from './sub-components/ConversionHistoryButton.svelte';

	export let activeTabValue = 'mPond';

	const maxAmountTooltipText =
		'Unrequested is the amount of MPond for which a conversion request is not placed. MPond conversion requests placed is categorised as Requested. Conversion requests for staked MPond can also be placed.';

	//initial amount states
	let inputAmount: bigint;
	let inputAmountString: string;
	//error message states
	let inputAmountIsValid = true;
	let inValidMessage = '';
	let updatedAmountInputDirty = false;
	//loading states
	let requestConversionLoading = false;

	const handleMaxClick = () => {
		if (unrequestedMPondBalance) {
			inputAmountString = bigNumberToString(unrequestedMPondBalance, 18, 18, false);
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

	const handleConvertRequest = async () => {
		try {
			requestConversionLoading = true;
			await requestMPondConversion(inputAmount);
			resetInputs();
			requestConversionLoading = false;
			goto(ROUTES.MPOND_HISTORY_PAGE_URL);
		} catch (error: any) {
			requestConversionLoading = false;
			console.log('error:', error);
		}
	};

	const resetInputs = () => {
		inputAmountString = '';
		inputAmountIsValid = true;
		updatedAmountInputDirty = false;
		inValidMessage = '';
	};

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: 0n;
	$: convertedAmountString =
		inputAmount > 0 ? bigNumberToString(mPondToPond(inputAmount), 18, POND_PRECISIONS) : '';
	$: unrequestedMPondBalance = $walletBalanceStore.mpond - $bridgeStore.requestedMPond;
	$: balanceText = $connected
		? `Unrequested: ${bigNumberToString(
				unrequestedMPondBalance,
				DEFAULT_CURRENCY_DECIMALS,
				MPOND_PRECISIONS
			)} | Requested: ${bigNumberToString(
				$bridgeStore.requestedMPond,
				DEFAULT_CURRENCY_DECIMALS,
				MPOND_PRECISIONS
			)}`
		: 'Unrequested: 0.00 | Requested: 0.00';
	$: pondBalanceText = $connected
		? `Balance: ${bigNumberToString(
				$walletBalanceStore.pond,
				DEFAULT_CURRENCY_DECIMALS,
				POND_PRECISIONS
			)}`
		: 'Balance: 0.00';
	$: mPondDisabledText =
		inputAmount && inputAmount > 0 && !(unrequestedMPondBalance >= inputAmount)
			? 'Insufficient MPond'
			: '';
	$: enableConversion = inputAmount && inputAmount > 0 && unrequestedMPondBalance >= inputAmount;
</script>

<AmountInputWithMaxButton
	currency="MPond"
	bind:inputAmountString
	{handleUpdatedAmount}
	maxAmountText={balanceText}
	inputCardVariant="none"
	{maxAmountTooltipText}
>
	<MaxButton disabled={!$connected} slot="inputMaxButton" onclick={handleMaxClick} />
</AmountInputWithMaxButton>
<Tab id="mPond" on:click={() => (activeTabValue = 'pond')}>Pond</Tab>
<AmountInputWithMaxButton
	currency="POND"
	inputCardVariant="none"
	inputAmountString={convertedAmountString}
	maxAmountText={pondBalanceText}
></AmountInputWithMaxButton>
{#if $connected}
	<Button
		variant="filled"
		size="large"
		styleClass="w-full mt-4"
		onclick={handleConvertRequest}
		loading={requestConversionLoading}
		disabled={!enableConversion}>PLACE CONVERSION REQUEST</Button
	>
{:else}
	<ConnectWalletButton styleClass="mt-4" isLarge={true} />
{/if}
<a class="mt-4 block" href={ROUTES.MPOND_HISTORY_PAGE_URL}>
	<ConversionHistoryButton firstText="MPond" secondText="POND" />
</a>
<ErrorTextCard
	showError={!inputAmountIsValid && updatedAmountInputDirty}
	errorMessage={inValidMessage}
/>
<ErrorTextCard showError={!!mPondDisabledText} errorMessage={mPondDisabledText} />
