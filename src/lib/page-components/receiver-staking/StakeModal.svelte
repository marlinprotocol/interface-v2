<script lang="ts">
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import {
		approvePondTokenForReceiverStaking,
		depositStakingToken
	} from '$lib/controllers/contractController';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { walletBalance } from '$lib/data-stores/walletBalanceStore';
	import ModalApproveButton from '$lib/page-components/receiver-staking/sub-components/ModalApproveButton.svelte';
	import ModalPondInput from '$lib/page-components/receiver-staking/sub-components/ModalPondInput.svelte';
	import type { ReceiverStakingData, WalletBalance } from '$lib/types/storeTypes';
	import { DEFAULT_WALLET_BALANCE } from '$lib/utils/constants/storeDefaults';
	import {
		bigNumberToCommaString,
		bigNumberToString,
		stringToBigNumber
	} from '$lib/utils/conversion';
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

	const handleApproveClick = async () => {
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
		// TODO: check if we need to close modal after submit
		submitLoading = true;
		try {
			await depositStakingToken(inputAmount);

			// update wallet balance locally
			walletBalance.update((value: WalletBalance) => {
				return {
					...value,
					pond: value.pond.sub(inputAmount)
				};
			});

			// update queued balance locally
			receiverStakingStore.update((value: ReceiverStakingData) => {
				return {
					...value,
					queuedBalance: value.queuedBalance.add(inputAmount)
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
		!!!inputAmount || !!!maxPondBalance?.gte(inputAmount) || !!approvedAmount?.gte(inputAmount);

	//if no input amount, no maxPondBalance, maxPondBalance is less than inputAmount, disable submit button
	$: pondDisabledText =
		!!inputAmount && !!!maxPondBalance?.gte(inputAmount) ? 'Insufficient POND' : '';

	//if input amount, approved amount is greater than input amount, maxPondBalance is greater than or equal to inputAmount, disable submit button
	$: submitEnable =
		!!inputAmount && approvedAmount?.gte(inputAmount) && maxPondBalance?.gte(inputAmount);

	const styles = {
		inputMaxButton: `${buttonClasses.text} text-sm font-bold text-primary`
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
			<Tooltip
				slot="input-max-button"
				tooltipText="Can add optional text here"
				tooltipDirection="tooltip-right"
			>
				<button on:click={handleMaxClick} class={styles.inputMaxButton}>MAX</button>
			</Tooltip>
			<ModalApproveButton
				slot="input-end-button"
				disabled={approveDisabled}
				loading={approveLoading}
				bind:inputAmount
				bind:approvedAmount
				{handleApproveClick}
			/>
		</ModalPondInput>
		{#if !!pondDisabledText}
			<Text variant="small" styleClass="text-red-500 my-2" text={pondDisabledText} />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		<FilledButton
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			styleClass={'btn-block mt-4'}>CONFIRM</FilledButton
		>
	</svelte:fragment>
</Modal>
