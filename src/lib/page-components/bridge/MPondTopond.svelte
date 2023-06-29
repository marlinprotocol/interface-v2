<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { requestMPondConversion } from '$lib/controllers/contractController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { connected, walletBalance } from '$lib/data-stores/walletProviderStore';
	import {
		BIG_NUMBER_ZERO,
		MPOND_PRECISIONS,
		POND_PRECISIONS
	} from '$lib/utils/constants/constants';
	import { DEFAULT_WALLET_BALANCE } from '$lib/utils/constants/storeDefaults';
	import {
		bigNumberToCommaString,
		bigNumberToString,
		mPondToPond,
		stringToBigNumber
	} from '$lib/utils/helpers/conversionHelper';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import { MPOND_HISTORY_PAGE_URL } from '$lib/utils/constants/urls';

	const maxAmountTooltipText =
		'Unrequested is the amount of MPond for which a conversion request is not placed. MPond conversion requests placed is categorised as Requested. Conversion requests for staked MPond can also be placed.';

	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;
	//error message states
	let inputAmountIsValid = true;
	let inValidMessage = '';
	let updatedAmountInputDirty = false;

	//loading states
	let requestConversionLoading = false;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BIG_NUMBER_ZERO;

	$: convertedAmountString = inputAmount.gt(0)
		? bigNumberToString(mPondToPond(inputAmount), 18, POND_PRECISIONS)
		: '';

	let walletMPondBalance: BigNumber = DEFAULT_WALLET_BALANCE.mPond;
	let requestedMPond: BigNumber = BIG_NUMBER_ZERO;

	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		walletMPondBalance = value.mPond;
	});
	const unsubscribeBridgeStore = bridgeStore.subscribe((value) => {
		requestedMPond = value.requestedMPond;
	});

	$: unrequestedMPondBalance = walletMPondBalance.sub(requestedMPond);
	$: balanceText = $connected
		? `Unrequested: ${bigNumberToCommaString(
				unrequestedMPondBalance,
				MPOND_PRECISIONS
		  )} | Requested: ${bigNumberToCommaString(requestedMPond, MPOND_PRECISIONS)}`
		: 'Unrequested: 0 | Requested: 0';

	onDestroy(unsubscribeWalletBalanceStore);
	onDestroy(unsubscribeBridgeStore);

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
			goto(MPOND_HISTORY_PAGE_URL);
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

	$: mPondDisabledText =
		inputAmount && inputAmount.gt(0) && !unrequestedMPondBalance?.gte(inputAmount)
			? 'Insufficient MPond'
			: '';
	$: enableConversion =
		inputAmount && inputAmount.gt(0) && unrequestedMPondBalance?.gte(inputAmount);
</script>

<div class="my-2 mx-2">
	<AmountInputWithMaxButton
		title="From"
		bind:inputAmountString
		{handleUpdatedAmount}
		maxAmountText={balanceText}
		inputCardVariant={'none'}
		{maxAmountTooltipText}
	>
		<Text slot="input-end-button" text="MPond" fontWeight={'font-medium'} />
		<MaxButton disabled={!$connected} slot="inputMaxButton" onclick={handleMaxClick} />
	</AmountInputWithMaxButton>
	<ErrorTextCard
		showError={!inputAmountIsValid && updatedAmountInputDirty}
		errorMessage={inValidMessage}
	/>
	<ErrorTextCard showError={!!mPondDisabledText} errorMessage={mPondDisabledText} />
	<Divider margin="mt-2 mb-3" />
	<AmountInputWithMaxButton
		title="To"
		inputCardVariant={'none'}
		inputAmountString={convertedAmountString}
	>
		<Text slot="input-end-button" text="POND" fontWeight="font-medium" />
	</AmountInputWithMaxButton>
</div>
{#if $connected}
	<Button
		variant="filled"
		size="large"
		styleClass="w-full"
		onclick={handleConvertRequest}
		loading={requestConversionLoading}
		disabled={!enableConversion}>PLACE CONVERSION REQUEST</Button
	>
{:else}
	<ConnectWalletButton isLarge={true} />
{/if}
