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
	import PondConvertModal from './PondConvertModal.svelte';

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center py-8',
		cardWrapper: 'w-full flex px-2 mb-2',
		buttonLarge: `${buttonClasses.filled} h-14 text-base font-semibold flex gap-1 w-full`
	};

	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;
	//input error states
	let inputAmountIsValid: boolean = true;
	let inValidMessage: string = '';
	let updatedAmountInputDirty: boolean = false;

	let convertedAmountString: string;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BigNumber.from(0);

	// convert pond to mpond by dividing by 10^6
	$: convertedAmountString = inputAmount.gt(0) ? bigNumberToString(inputAmount.div(10 ** 6)) : '';

	let maxPondBalance: BigNumber = DEFAULT_WALLET_BALANCE.pond;
	let balanceText = 'Balance: 0.00';
	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxPondBalance = value.pond;
		balanceText = `Balance: ${bigNumberToCommaString(maxPondBalance)}`;
	});
	onDestroy(unsubscribeWalletBalanceStore);

	const handleMaxClick = () => {
		if (!!maxPondBalance) {
			inputAmountString = bigNumberToString(maxPondBalance);
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

	$: pondDisabledText =
		!!inputAmount && inputAmount.gt(0) && !!!maxPondBalance?.gte(inputAmount)
			? 'Insufficient POND'
			: '';
	$: enableConversion = !!inputAmount && inputAmount.gt(0) && !!maxPondBalance?.gte(inputAmount);
</script>

<ModalPondInput
	title="From"
	bind:inputAmountString
	{handleUpdatedAmount}
	maxAmountText={balanceText}
	inputCardVariant={'none'}
>
	<Text slot="input-end-button" text="POND" styleClass="font-medium" />
	<button slot="inputMaxButton" on:click={handleMaxClick} class={buttonClasses.maxButton}>
		MAX
	</button>
</ModalPondInput>
<ErrorTextCard
	showError={!inputAmountIsValid && updatedAmountInputDirty}
	errorMessage={inValidMessage}
/>
<ErrorTextCard showError={!!pondDisabledText} errorMessage={pondDisabledText} />
<Divider margin="mt-4 mb-6" />
<ModalPondInput title="To" inputCardVariant={'none'} inputAmountString={convertedAmountString}>
	<Text slot="input-end-button" text="MPond" styleClass="font-medium" />
</ModalPondInput>
<div class="mb-5" />
{#if $connected}
	{#if !enableConversion}
		<button class={styles.buttonLarge} disabled>PROCEED TO CONVERSION</button>
	{:else}
		<label for="pond-to-mpond-conversion-modal" class={styles.buttonLarge}>
			PROCEED TO CONVERSION
		</label>
	{/if}
{:else}
	<ConnectWalletButton />
{/if}
<PondConvertModal pond={inputAmount} />
