<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import {
		approvePondTokenForReceiverStaking,
		depositStakingToken,
		depositStakingTokenAndSetSigner
	} from '$lib/controllers/contractController';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';
	import ModalApproveButton from '$lib/page-components/receiver-staking/sub-components/ModalApproveButton.svelte';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import type { Address, ReceiverStakingData, WalletBalance } from '$lib/types/storeTypes';
	import {
		BIG_NUMBER_ZERO,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	} from '$lib/utils/constants/constants';
	import { MESSAGES } from '$lib/utils/constants/messages';
	import {
		DEFAULT_RECEIVER_STAKING_DATA,
		DEFAULT_WALLET_BALANCE
	} from '$lib/utils/constants/storeDefaults';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import {
		closeModal,
		getCurrentEpochCycle,
		inputAmountInValidMessage,
		isAddressValid,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	export let modalFor: string;

	//texts
	const toolTipText = 'Enter the amount of POND you would like to stake to the receiver address.';
	const addressToolTipText =
		'This is the address used by the receiver to give tickets to clusters. The signer address can be found in the receiver client.';

	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;
	let approvedAmount: BigNumber;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BIG_NUMBER_ZERO;

	//loading states
	let approveLoading = false;
	let submitLoading = false;

	//max amount in wallet
	let maxPondBalance: BigNumber = DEFAULT_WALLET_BALANCE.pond;
	let balanceText = 'Balance: 0.00';
	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxPondBalance = value.pond;
		balanceText = `Balance: ${bigNumberToString(
			maxPondBalance,
			DEFAULT_CURRENCY_DECIMALS,
			POND_PRECISIONS
		)}`;
	});

	//approve balance
	const unsubscribeReceiverStakingStore = receiverStakingStore.subscribe((value) => {
		approvedAmount = value.approvedBalance;
	});

	//signer address states
	let signerAddressIsValid = false;
	let signerAddressIsUnique = false;
	let updatedSignerAddress: Address = '';
	let updatedSignerAddressInputDirty = false;

	//input amount states
	let inputAmountIsValid = true;
	let inValidMessage = '';
	let updatedAmountInputDirty = false;

	/**
	 * checks if address is valid as user types input
	 * @param event
	 */
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

	/**
	 * checks if input amount is valid
	 * @param event
	 */
	const handleUpdatedAmount = (event: Event) => {
		updatedAmountInputDirty = true;
		const target = event.target as HTMLInputElement;
		inputAmountIsValid = target.value ? isInputAmountValid(target.value) : true;
		inValidMessage = inputAmountInValidMessage(target.value);
	};

	const handleApproveClick = async () => {
		if (approveDisabled) return;
		if (!inputAmount || !inputAmount.gt(0)) {
			addToast({
				message: 'Please enter an valid amount',
				variant: 'error'
			});
			return;
		}
		approveLoading = true;
		try {
			await approvePondTokenForReceiverStaking(inputAmount);
			receiverStakingStore.update((value: ReceiverStakingData) => {
				return {
					...value,
					approvedBalance: inputAmount
				};
			});
		} catch (e) {
			console.log('error approving', e);
		} finally {
			approveLoading = false;
		}
	};

	const handleMaxClick = () => {
		if (maxPondBalance) {
			inputAmountString = bigNumberToString(maxPondBalance);
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
				receiverStakingStore.update((value: ReceiverStakingData) => {
					return {
						...value,
						signer: updatedSignerAddress
					};
				});
			} else {
				await depositStakingToken(inputAmount);
			}
			closeModal(modalFor);

			// update wallet balance locally
			walletBalance.update((value: WalletBalance) => {
				return {
					...value,
					pond: value.pond.sub(inputAmount)
				};
			});

			// if epoch startTime is less than current time, update queued balance else staked balance
			receiverStakingStore.update((value: ReceiverStakingData) => {
				const {
					epochData: { startTime, epochLength }
				} = value;
				const currentTime = Date.now() / 1000;
				const epochCycle = getCurrentEpochCycle(startTime, epochLength);

				return {
					...value,
					epochData: {
						...value.epochData,
						epochCycle
					},
					queuedBalance:
						startTime < currentTime ? value.queuedBalance.add(inputAmount) : value.queuedBalance,
					stakedBalance:
						startTime < currentTime ? value.stakedBalance : value.stakedBalance.add(inputAmount),
					approvedBalance: value.approvedBalance.sub(inputAmount)
				};
			});

			resetInputs();
		} catch (e) {
			console.log('error submitting', e);
		} finally {
			submitLoading = false;
		}
	};

	//reset amount and signer address
	const resetInputs = () => {
		inputAmountString = '';
		signerAddressIsValid = false;
		updatedSignerAddress = '';
		updatedSignerAddressInputDirty = false;
		inputAmountIsValid = true;
		updatedAmountInputDirty = false;
		inValidMessage = '';
	};

	onDestroy(unsubscribeWalletBalanceStore);
	onDestroy(unsubscribeReceiverStakingStore);

	//button states
	//if no input amount, no maxPondBalance, maxPondBalance is less than inputAmount or approved amount is less than or equal to input amount, disable approve button
	$: approveDisabled =
		!inputAmount ||
		!inputAmount.gt(0) ||
		!maxPondBalance?.gte(inputAmount) ||
		approvedAmount?.gte(inputAmount);

	//if no input amount, no maxPondBalance, maxPondBalance is less than inputAmount, disable submit button
	$: pondDisabledText =
		inputAmount && inputAmount.gt(0) && !maxPondBalance?.gte(inputAmount)
			? 'Insufficient POND'
			: '';

	$: signerAddressNotAdded = $receiverStakingStore.signer === DEFAULT_RECEIVER_STAKING_DATA.signer;
	//if signerAddress is already set then we consider only inputAmount else we also consider signerAddress to be set while disabling submit button
	$: submitEnable = signerAddressNotAdded
		? inputAmount &&
		  inputAmount.gt(0) &&
		  approvedAmount?.gte(inputAmount) &&
		  maxPondBalance?.gte(inputAmount) &&
		  updatedSignerAddress !== '' &&
		  signerAddressIsValid &&
		  signerAddressIsUnique
		: inputAmount &&
		  inputAmount.gt(0) &&
		  approvedAmount?.gte(inputAmount) &&
		  maxPondBalance?.gte(inputAmount);

	$: subtitle = signerAddressNotAdded
		? 'Staking POND requires users to approve the POND tokens. After approval, enter the signer address mentioned in the receiver client and confirm the transaction. There is no lock-in period for staking POND.'
		: 'Staking POND requires users to approve the POND tokens first and then confirm the transaction. There is no lock-in period for staking POND.';
	const styles = {
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost h-[30px] w-full mt-1 p-0 font-semibold text-xl disabled:text-primary text-primary focus-within:text-primary placeholder:text-primary/[.2] focus:outline-none focus-within:border-b-2 focus:bg-transparent'
	};
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'STAKE POND'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
		<p class="mt-2">
			<span>
				{`Note: There are no rewards for staking POND on the receiver staking portal. Users looking to delegate POND/MPond to clusters in the Marlin network need to go `}
			</span>
			<a
				class="text-primary underline"
				href="https://arb1.marlin.org/relay/operator"
				target="_blank"
				rel="noreferrer"
			>
				{`here`}
			</a>
			<span class="ml-[-3px]">
				{'.'}
			</span>
		</p>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<AmountInputWithMaxButton
			title={'POND'}
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
				bind:approvedAmount
				{handleApproveClick}
			/>
		</AmountInputWithMaxButton>
		<ErrorTextCard
			showError={!inputAmountIsValid && updatedAmountInputDirty}
			errorMessage={inValidMessage}
		/>
		{#if $receiverStakingStore.signer === DEFAULT_RECEIVER_STAKING_DATA.signer}
			<InputCard styleClass="mt-4">
				<div class={styles.titleIcon}>
					<Text variant="small" text={'Signer Address'} />
					<TooltipIcon tooltipText={addressToolTipText} tooltipDirection="tooltip-right" />
				</div>
				<form>
					<div class="flex gap-2 items-center">
						<input
							bind:value={updatedSignerAddress}
							on:input={handleUpdatedSignerAddressInput}
							autocomplete="off"
							id="updatedSignerAddress"
							class={`hideInputNumberAppearance ${styles.inputNumber}`}
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
			styleClass={'btn-block w-full'}>CONFIRM</Button
		>
	</svelte:fragment>
</Modal>
