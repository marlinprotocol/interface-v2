<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ConnectWalletButton from '$lib/components/buttons/ConnectWalletButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import { walletBalance } from '$lib/data-stores/walletBalanceStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import { DEFAULT_WALLET_BALANCE } from '$lib/utils/constants/storeDefaults';
	import {
		bigNumberToCommaString,
		bigNumberToString,
		stringToBigNumber
	} from '$lib/utils/conversion';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import ModalPondInput from '../receiver-staking/sub-components/ModalPondInput.svelte';

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center py-8',
		cardWrapper: 'w-full flex px-2 mb-2',
		buttonLarge: `${buttonClasses.filled} h-14 text-base font-semibold flex gap-1 w-full`
	};

	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;
	//error message states
	let inputAmountIsValid: boolean = true;
	let inValidMessage: string = '';
	let updatedAmountInputDirty: boolean = false;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BigNumber.from(0);

	// convert mpond to pond by multiplying by 10^6
	$: convertedAmountString = inputAmount.gt(0) ? bigNumberToString(inputAmount.mul(10 ** 6)) : '';

	let maxMPondBalance: BigNumber = DEFAULT_WALLET_BALANCE.mpond;
	let balanceText = 'Balance: 0.00';
	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxMPondBalance = value.mpond;
		balanceText = `Balance: ${bigNumberToCommaString(maxMPondBalance)}`;
	});
	onDestroy(unsubscribeWalletBalanceStore);

	const handleMaxClick = () => {
		if (!!maxMPondBalance) {
			inputAmountString = bigNumberToString(maxMPondBalance);
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

	$: mpondDisabledText =
		!!inputAmount && inputAmount.gt(0) && !!!maxMPondBalance?.gte(inputAmount)
			? 'Insufficient MPond'
			: '';
	$: enableConversion = !!inputAmount && inputAmount.gt(0) && !!maxMPondBalance?.gte(inputAmount);
</script>

<ModalPondInput
	title="From"
	bind:inputAmountString
	{handleUpdatedAmount}
	maxAmountText={balanceText}
	inputCardVariant={'none'}
>
	<Text slot="input-end-button" text="MPond" styleClass="font-medium" />
	<button slot="inputMaxButton" on:click={handleMaxClick} class={buttonClasses.maxButton}>
		MAX
	</button>
</ModalPondInput>
<ErrorTextCard
	showError={!inputAmountIsValid && updatedAmountInputDirty}
	errorMessage={inValidMessage}
/>
<ErrorTextCard showError={!!mpondDisabledText} errorMessage={mpondDisabledText} />
<Divider margin="mt-4 mb-6" />
<ModalPondInput title="To" inputCardVariant={'none'} inputAmountString={convertedAmountString}>
	<Text slot="input-end-button" text="POND" styleClass="font-medium" />
</ModalPondInput>
<div class="mb-5" />
{#if $connected}
	{#if !enableConversion}
		<button class={styles.buttonLarge} disabled>PLACE CONVERSION REQUEST</button>
	{:else}
		<label for="mpond-to-pond-conversion-modal" class={styles.buttonLarge}>
			PLACE CONVERSION REQUEST
		</label>
	{/if}
{:else}
	<ConnectWalletButton />
{/if}
