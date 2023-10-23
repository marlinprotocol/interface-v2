<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import {
		addStakedBalanceInReceiverStakingStore,
		receiverStakingStore,
		updateAllowanceInReceiverStakingStore,
		updateSignerAddressInReceiverStakingStore
	} from '$lib/data-stores/receiverStakingStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import {
		walletBalanceStore,
		withdrawPondFromWalletBalanceStore
	} from '$lib/data-stores/walletProviderStore';
	import ModalApproveButton from '$lib/page-components/receiver-staking/sub-components/ModalApproveButton.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import type { Address } from '$lib/types/storeTypes';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import { MESSAGES } from '$lib/utils/constants/messages';
	import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import {
		closeModal,
		inputAmountInValidMessage,
		isAddressValid,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import {
		depositStakingTokenAndSetSigner,
		depositStakingToken
	} from '$lib/controllers/contract/receiverStaking';
	import { approveToken } from '$lib/controllers/contract/token';

	export let modalFor: string;

	const toolTipText = 'Enter the amount of POND you would like to stake to the receiver address.';
	const addressToolTipText =
		'This is the address used by the receiver to give tickets to clusters. The signer address can be found in the receiver client.';

	//initial amount states
	let inputAmount: bigint;
	let inputAmountString: string;
	//loading states
	let approveLoading = false;
	let submitLoading = false;
	//max amount in wallet
	let balanceText = 'Balance: 0.00';
	//signer address states
	let signerAddressIsValid = false;
	let signerAddressIsUnique = false;
	let updatedSignerAddress: Address = '';
	let updatedSignerAddressInputDirty = false;
	//input amount states
	let inputAmountIsValid = true;
	let inValidMessage = '';
	let updatedAmountInputDirty = false;

	const handleUpdatedSignerAddressInput = async (event: Event) => {
		updatedSignerAddressInputDirty = true;
		const target = event.target as HTMLInputElement;

		if (target.value && target.value !== $receiverStakingStore.signer) {
			submitLoading = true;
			[signerAddressIsValid, signerAddressIsUnique] = await isAddressValid(target.value);
			submitLoading = false;
		} else {
			signerAddressIsValid = false;
			signerAddressIsUnique = false;
		}
	};

	const handleUpdatedAmount = (event: Event) => {
		updatedAmountInputDirty = true;
		const target = event.target as HTMLInputElement;
		inputAmountIsValid = target.value ? isInputAmountValid(target.value) : true;
		inValidMessage = inputAmountInValidMessage(target.value);
	};

	const handleApproveClick = async () => {
		if (approveDisabled) return;
		if (!inputAmount || !(inputAmount > 0)) {
			addToast({
				message: 'Please enter an valid amount',
				variant: 'error'
			});
			return;
		}
		approveLoading = true;
		try {
			if ($chainConfigStore.tokens.POND === undefined) {
				throw new Error('POND token not found');
			}
			await approveToken(
				$chainConfigStore.tokens.POND,
				inputAmount,
				$contractAddressStore.RECEIVER_STAKING
			);
			updateAllowanceInReceiverStakingStore(inputAmount);
		} catch (e) {
			console.log('error approving', e);
		} finally {
			approveLoading = false;
		}
	};

	const handleMaxClick = () => {
		if ($walletBalanceStore.pond) {
			inputAmountString = bigNumberToString(
				$walletBalanceStore.pond,
				DEFAULT_CURRENCY_DECIMALS,
				POND_PRECISIONS,
				false
			);
			//reset input error message
			inputAmountIsValid = true;
			updatedAmountInputDirty = false;
			inValidMessage = '';
		}
	};

	const handleSubmitClick = async () => {
		if (!submitEnable) return;

		submitLoading = true;

		try {
			if (updatedSignerAddress !== DEFAULT_RECEIVER_STAKING_DATA.signer) {
				await depositStakingTokenAndSetSigner(inputAmount, updatedSignerAddress);
				// update signer locally
				updateSignerAddressInReceiverStakingStore(updatedSignerAddress);
			} else {
				await depositStakingToken(inputAmount);
			}
			withdrawPondFromWalletBalanceStore(inputAmount);
			addStakedBalanceInReceiverStakingStore(inputAmount);
			resetInputs();
			closeModal(modalFor);
		} catch (e) {
			console.log('error submitting', e);
		} finally {
			submitLoading = false;
		}
	};

	const resetInputs = () => {
		inputAmountString = '';
		signerAddressIsValid = false;
		updatedSignerAddress = '';
		updatedSignerAddressInputDirty = false;
		inputAmountIsValid = true;
		updatedAmountInputDirty = false;
		inValidMessage = '';
	};

	$: balanceText = `Balance: ${bigNumberToString(
		$walletBalanceStore.pond,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)}`;
	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: 0n;
	//button states
	//if no input amount, no maxPondBalance, maxPondBalance is less than inputAmount or approved amount is less than or equal to input amount, disable approve button
	$: approveDisabled =
		!inputAmount ||
		!(inputAmount > 0n) ||
		!($walletBalanceStore.pond >= inputAmount) ||
		$receiverStakingStore.approvedBalance >= inputAmount;

	//if no input amount, no maxPondBalance, maxPondBalance is less than inputAmount, disable submit button
	$: pondDisabledText =
		inputAmount && inputAmount > 0 && !($walletBalanceStore.pond >= inputAmount)
			? 'Insufficient POND'
			: '';
	$: signerAddressNotAdded = $receiverStakingStore.signer === DEFAULT_RECEIVER_STAKING_DATA.signer;
	//if signerAddress is already set then we consider only inputAmount else we also consider signerAddress to be set while disabling submit button
	$: submitEnable = signerAddressNotAdded
		? inputAmount &&
		  inputAmount > 0 &&
		  $receiverStakingStore.approvedBalance >= inputAmount &&
		  $walletBalanceStore.pond >= inputAmount &&
		  updatedSignerAddress !== '' &&
		  signerAddressIsValid &&
		  signerAddressIsUnique
		: inputAmount &&
		  inputAmount > 0 &&
		  $receiverStakingStore.approvedBalance >= inputAmount &&
		  $walletBalanceStore.pond >= inputAmount;
	$: subtitle = signerAddressNotAdded
		? 'Staking POND requires users to approve the POND tokens. After approval, enter the signer address mentioned in the receiver client and confirm the transaction. There is no lock-in period for staking POND.'
		: 'Staking POND requires users to approve the POND tokens first and then confirm the transaction. There is no lock-in period for staking POND.';
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">STAKE POND</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
		<p class="mt-2">
			<span>
				Note: There are no rewards for staking POND on the receiver staking portal. Users looking to
				delegate POND/MPond to clusters in the Marlin network need to go
			</span>
			<a
				class="text-primary underline"
				href="https://arb1.marlin.org/relay/operator"
				target="_blank"
				rel="noreferrer"
			>
				here
			</a>
			<span class="ml-[-3px]"> . </span>
		</p>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<AmountInputWithMaxButton
			title="POND"
			tooltipText={toolTipText}
			bind:inputAmountString
			{handleUpdatedAmount}
			maxAmountText={balanceText}
		>
			<MaxButton slot="inputMaxButton" onclick={handleMaxClick} />
			<ModalApproveButton
				slot="input-end-button"
				disabled={approveDisabled}
				loading={approveLoading}
				bind:inputAmount
				bind:approvedAmount={$receiverStakingStore.approvedBalance}
				{handleApproveClick}
			/>
		</AmountInputWithMaxButton>
		<ErrorTextCard
			showError={!inputAmountIsValid && updatedAmountInputDirty}
			errorMessage={inValidMessage}
		/>
		{#if $receiverStakingStore.signer === DEFAULT_RECEIVER_STAKING_DATA.signer}
			<InputCard styleClass="mt-4">
				<div class="flex items-center gap-1">
					<Text variant="small" text="Signer Address" />
					<TooltipIcon tooltipText={addressToolTipText} tooltipDirection="tooltip-right" />
				</div>
				<form>
					<div class="flex items-center gap-2">
						<input
							bind:value={updatedSignerAddress}
							on:input={handleUpdatedSignerAddressInput}
							autocomplete="off"
							id="updatedSignerAddress"
							class="hideInputNumberAppearance input input-ghost mt-1 h-[30px] w-full p-0 text-xl font-semibold text-primary placeholder:text-primary/[.2] focus-within:border-b-2 focus-within:text-primary focus:bg-transparent focus:outline-none disabled:text-primary"
							placeholder="Enter Here"
						/>
					</div>
				</form>
			</InputCard>
		{/if}

		<ErrorTextCard
			showError={signerAddressIsValid && !signerAddressIsUnique}
			errorMessage={MESSAGES.FORM.VALIDATION.SIGNER_EXISTS}
		/>
		<ErrorTextCard
			showError={!signerAddressIsValid && updatedSignerAddressInputDirty}
			errorMessage={MESSAGES.FORM.VALIDATION.ADDRESS}
		/>
		<ErrorTextCard showError={!!pondDisabledText} errorMessage={pondDisabledText} />
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			size="large"
			styleClass="btn-block w-full">CONFIRM</Button
		>
	</svelte:fragment>
</Modal>
