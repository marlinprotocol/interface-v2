<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
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
	import AmountInputWithMaxButton from '../../components/inputs/AmountInputWithMaxButton.svelte';
	import PondApproveConfirmModal from './PondApproveConfirmModal.svelte';
	import onboard from '$lib/controllers/web3OnboardController';

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center py-8',
		cardWrapper: 'w-full flex px-2 mb-2',
		buttonLarge: 'h-14 text-base font-semibold flex gap-1 w-full'
	};

	let modalFor = 'pond-approve-confirm-modal';

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

	const connect = async () => {
		console.log('connecting to the wallet...');
		const connection = await onboard.connectWallet();
		console.log('connection', connection);
	};

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
	<AmountInputWithMaxButton
		title="From"
		bind:inputAmountString
		{handleUpdatedAmount}
		maxAmountText={balanceText}
		inputCardVariant={'none'}
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
		inputCardVariant={'none'}
		inputAmountString={convertedAmountString}
	>
		<Text slot="input-end-button" text="MPond" fontWeight="font-medium" />
	</AmountInputWithMaxButton>
</div>
{#if $connected}
	{#if !enableConversion}
		<Button styleClass={styles.buttonLarge} disabled>PROCEED TO CONVERSION</Button>
	{:else}
		<ModalButton {modalFor} styleClass={`${styles.buttonLarge}`}>PROCEED TO CONVERSION</ModalButton>
	{/if}
{:else}
	<ConnectWalletButton {connect} isLarge={true} />
{/if}
<PondApproveConfirmModal pond={inputAmount} {modalFor} />
