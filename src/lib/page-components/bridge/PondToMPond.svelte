<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { connected, walletBalance } from '$lib/data-stores/walletProviderStore';
	import { BigNumberZero, pondPrecisions } from '$lib/utils/constants/constants';
	import { DEFAULT_WALLET_BALANCE } from '$lib/utils/constants/storeDefaults';
	import {
		bigNumberToCommaString,
		bigNumberToString,
		pondToMPond,
		stringToBigNumber
	} from '$lib/utils/conversion';
	import { inputAmountInValidMessage, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import ModalPondInput from '../receiver-staking/sub-components/ModalPondInput.svelte';
	import PondApproveConfirmModal from './PondApproveConfirmModal.svelte';

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center py-8',
		cardWrapper: 'w-full flex px-2 mb-2',
		buttonLarge: `${buttonClasses.filled} h-14 text-base font-semibold flex gap-1 w-full`
	};

	let showPondApproveConfirmDialog = false;

	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;
	//input error states
	let inputAmountIsValid = true;
	let inValidMessage = '';
	let updatedAmountInputDirty = false;

	let convertedAmountString: string;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BigNumberZero;

	// convert pond to mPond by dividing by 10^6
	$: convertedAmountString = inputAmount.gt(0) ? bigNumberToString(pondToMPond(inputAmount)) : '';

	let maxPondBalance: BigNumber = DEFAULT_WALLET_BALANCE.pond;
	let balanceText = 'Balance: 0.00';
	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxPondBalance = value.pond;
		balanceText = `Balance: ${bigNumberToCommaString(maxPondBalance, pondPrecisions)}`;
	});
	onDestroy(unsubscribeWalletBalanceStore);

	const handleMaxClick = () => {
		if (maxPondBalance) {
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
		inputAmount && inputAmount.gt(0) && !maxPondBalance?.gte(inputAmount)
			? 'Insufficient POND'
			: '';
	$: enableConversion = inputAmount && inputAmount.gt(0) && maxPondBalance?.gte(inputAmount);
</script>

<div class="my-2 mx-2">
	<ModalPondInput
		title="From"
		bind:inputAmountString
		{handleUpdatedAmount}
		maxAmountText={balanceText}
		inputCardVariant={'none'}
	>
		<Text slot="input-end-button" text="POND" fontWeight="font-medium" />
		<MaxButton slot="inputMaxButton" onclick={handleMaxClick} />
	</ModalPondInput>
	<ErrorTextCard
		showError={!inputAmountIsValid && updatedAmountInputDirty}
		errorMessage={inValidMessage}
	/>
	<ErrorTextCard showError={!!pondDisabledText} errorMessage={pondDisabledText} />
	<Divider margin="mt-2 mb-3" />
	<ModalPondInput title="To" inputCardVariant={'none'} inputAmountString={convertedAmountString}>
		<Text slot="input-end-button" text="MPond" fontWeight="font-medium" />
	</ModalPondInput>
</div>
{#if $connected}
	{#if !enableConversion}
		<button class={styles.buttonLarge} disabled>PROCEED TO CONVERSION</button>
	{:else}
		<Button
			onclick={() => {
				showPondApproveConfirmDialog = true;
			}}
			styleClass={styles.buttonLarge}
		>
			PROCEED TO CONVERSION
		</Button>
	{/if}
{:else}
	<ConnectWalletButton isLarge={true} />
{/if}
<PondApproveConfirmModal pond={inputAmount} bind:showPondApproveConfirmDialog />
