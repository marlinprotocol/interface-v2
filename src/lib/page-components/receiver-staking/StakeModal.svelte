<script lang="ts">
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import SnackBar from '$lib/atoms/snack-bars/SnackBar.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { walletBalance } from '$lib/data-stores/walletBalanceStore';
	import ModalApproveButton from '$lib/page-components/receiver-staking/sub-components/ModalApproveButton.svelte';
	import ModalPondInput from '$lib/page-components/receiver-staking/sub-components/ModalPondInput.svelte';
	import { DEFAULT_WALLET_BALANCE } from '$lib/utils/constants/storeDefaults';
	import { bigNumberToString } from '$lib/utils/conversion';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	const modalFor = 'stake-modal';

	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;
	let approvedAmount: BigNumber;

	//input amount string for input field
	// $: inputAmountString = !!inputAmount ? bigNumberToString(inputAmount) : '';

	//loading states
	let approveLoading: boolean = false;
	let submitLoading: boolean = false;

	//snackbar states
	let showApproveSnackbar: boolean = false;

	//max amount in wallet
	let maxPondBalance: BigNumber = DEFAULT_WALLET_BALANCE.pond;
	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxPondBalance = value.pond;
	});

	//TODO: check if can be moved to common util function
	const handleApproveClick = async () => {
		// TODO: call approve function
		approveLoading = true;
		setTimeout(() => {
			console.log('approve delayed by 3000ms', inputAmountString);
			approvedAmount = inputAmount;
			approveLoading = false;
			showApproveSnackbar = true;
		}, 3000);
	};

	const handleMaxClick = () => {
		if (!!maxPondBalance) {
			inputAmount = maxPondBalance;
			inputAmountString = bigNumberToString(maxPondBalance);
		}
	};

	const handleSubmitClick = async () => {
		// TODO: call submit function and reset input, approved value
		submitLoading = true;
		setTimeout(() => {
			console.log('confirm delayed by 500 ms');
			submitLoading = false;
			showApproveSnackbar = true;
		}, 500);
	};

	onDestroy(unsubscribeWalletBalanceStore);

	//button states
	//if no input amount, no maxPondBalance, maxPondBalance is less than inputAmount or approved amount is less than or equal to input amount, disable approve button
	$: approveDisabled =
		!!!inputAmount || !!!maxPondBalance?.gte(inputAmount) || !!approvedAmount?.gte(inputAmount);

	console.log(
		'approvedAmount approveDisabled :>> ',
		approveDisabled,
		bigNumberToString(maxPondBalance)
	);

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
			bind:inputAmount
			maxAmount={maxPondBalance}
			maxAmountText={'Balance'}
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
<SnackBar
	bind:show={showApproveSnackbar}
	text={'POND approved'}
	alertVariant="alert-success"
	duration={3000}
	variant="success"
/>
