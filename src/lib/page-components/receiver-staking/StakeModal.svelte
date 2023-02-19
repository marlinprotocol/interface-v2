<script lang="ts">
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import {
		approvePondTokenForReceiverStaking,
		depositStakingToken,
		updateSignerAddress
	} from '$lib/controllers/contractController';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import { walletBalance } from '$lib/data-stores/walletBalanceStore';
	import ModalApproveButton from '$lib/page-components/receiver-staking/sub-components/ModalApproveButton.svelte';
	import ModalPondInput from '$lib/page-components/receiver-staking/sub-components/ModalPondInput.svelte';
	import type { Address, ReceiverStakingData, WalletBalance } from '$lib/types/storeTypes';
	import {
		DEFAULT_RECEIVER_STAKING_DATA,
		DEFAULT_WALLET_BALANCE
	} from '$lib/utils/constants/storeDefaults';
	import {
		bigNumberToCommaString,
		bigNumberToString,
		stringToBigNumber
	} from '$lib/utils/conversion';
	import { isAddressValid } from '$lib/utils/helpers/commonHelper';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	const modalFor = 'stake-modal';

	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;
	let approvedAmount: BigNumber;

	$: inputAmount = stringToBigNumber(inputAmountString);

	//loading states
	let approveLoading: boolean = false;
	let submitLoading: boolean = false;

	//max amount in wallet
	let maxPondBalance: BigNumber = DEFAULT_WALLET_BALANCE.pond;
	let balanceText = 'Balance: 0.00';
	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxPondBalance = value.pond;
		balanceText = `Balance: ${bigNumberToCommaString(maxPondBalance)}`;
	});

	//approve balance
	const unsubscribeReceiverStakingStore = receiverStakingStore.subscribe((value) => {
		approvedAmount = value.approvedBalance;
	});

	//signer address states
	let signerAddressIsValid: boolean = false;
	let updatedSignerAddress: Address = '';
	let updatedSignerAddressInputDirty: boolean = false;

	/**
	 * checks if address is valid and if it is different from
	 * current signer address as user types input
	 * @param event
	 */
	const handleUpdatedSignerAddressInput = (event: Event) => {
		updatedSignerAddressInputDirty = true;
		const target = event.target as HTMLInputElement;
		signerAddressIsValid = target.value ? isAddressValid(target.value) : false;
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
		if (!!maxPondBalance) {
			inputAmountString = bigNumberToString(maxPondBalance);
		}
	};

	const handleSubmitClick = async () => {
		if (!submitEnable) return;

		// TODO: check if we need to close modal after submit
		submitLoading = true;

		try {
			await depositStakingToken(inputAmount, updatedSignerAddress);

			// update wallet balance locally
			walletBalance.update((value: WalletBalance) => {
				return {
					...value,
					pond: value.pond.sub(inputAmount)
				};
			});

			// update queued balance and signer locally
			receiverStakingStore.update((value: ReceiverStakingData) => {
				return {
					...value,
					queuedBalance: value.queuedBalance.add(inputAmount),
					signer: updatedSignerAddress
				};
			});

			//update epoch data

			resetInputs();
		} catch (e) {
			console.log('error submitting', e);
		} finally {
			submitLoading = false;
		}
	};

	//reset input and approved amount
	const resetInputs = () => {
		inputAmountString = '';
	};

	onDestroy(unsubscribeWalletBalanceStore);
	onDestroy(unsubscribeReceiverStakingStore);

	//button states
	//if no input amount, no maxPondBalance, maxPondBalance is less than inputAmount or approved amount is less than or equal to input amount, disable approve button
	$: approveDisabled =
		!!!inputAmount ||
		!inputAmount.gt(0) ||
		!!!maxPondBalance?.gte(inputAmount) ||
		!!approvedAmount?.gte(inputAmount);

	//if no input amount, no maxPondBalance, maxPondBalance is less than inputAmount, disable submit button
	$: pondDisabledText =
		!!inputAmount && inputAmount.gt(0) && !!!maxPondBalance?.gte(inputAmount)
			? 'Insufficient POND'
			: '';

	//if signerAddress is already set then we consider only inputAmount else we also consider signerAddress to be set while disabling submit button
	$: submitEnable =
		$receiverStakingStore.signer === DEFAULT_RECEIVER_STAKING_DATA.signer
			? !!inputAmount &&
			  inputAmount.gt(0) &&
			  approvedAmount?.gte(inputAmount) &&
			  maxPondBalance?.gte(inputAmount) &&
			  updatedSignerAddress !== '' &&
			  signerAddressIsValid
			: !!inputAmount &&
			  inputAmount.gt(0) &&
			  approvedAmount?.gte(inputAmount) &&
			  maxPondBalance?.gte(inputAmount);

	const styles = {
		inputMaxButton: `${buttonClasses.text} text-sm font-bold text-primary`,
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost h-[30px] w-full mt-1 p-0 font-semibold text-xl disabled:text-primary text-primary focus-within:text-primary placeholder:text-primary/[.2] focus:outline-none focus-within:border-b-2 focus:bg-transparent'
	};
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{'STAKE POND'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<ModalPondInput
			title={'POND'}
			tooltipText={'Some text here'}
			bind:inputAmountString
			maxAmountText={balanceText}
		>
			<button slot="input-max-button" on:click={handleMaxClick} class={styles.inputMaxButton}
				>MAX</button
			>
			<ModalApproveButton
				slot="input-end-button"
				disabled={approveDisabled}
				loading={approveLoading}
				bind:inputAmount
				bind:approvedAmount
				{handleApproveClick}
			/>
		</ModalPondInput>
		{#if $receiverStakingStore.signer === DEFAULT_RECEIVER_STAKING_DATA.signer}
			<!-- TODO: make this into a component -->
			<InputCard styles="mt-4">
				<div class={styles.titleIcon}>
					<Text variant="small" text={'Signer Address'} />
					<TooltipIcon tooltipText="Enter Signer Address" />
				</div>
				<form>
					<div class="flex gap-2 items-center">
						<!-- TODO: address validation -->
						<input
							bind:value={updatedSignerAddress}
							on:input={handleUpdatedSignerAddressInput}
							id="updatedSignerAddress"
							class={`hideInputNumberAppearance ${styles.inputNumber}`}
							placeholder="Enter Here"
						/>
					</div>
				</form>
			</InputCard>
		{/if}

		{#if !signerAddressIsValid && updatedSignerAddressInputDirty}
			<InputCard variant="warning" styles="mt-4 bg-red-100">
				<Text variant="small" styleClass="text-red-500 my-2" text="Enter a valid address" />
			</InputCard>
		{/if}
		{#if !!pondDisabledText}
			<InputCard variant="warning" styles="mt-4 bg-red-100">
				<Text variant="small" styleClass="text-red-500 my-2" text={pondDisabledText} />
			</InputCard>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		<FilledButton
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			styleClass={'btn-block h-14 text-base font-semibold'}>CONFIRM</FilledButton
		>
	</svelte:fragment>
</Modal>
