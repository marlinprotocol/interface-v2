<script lang="ts">
	import FilledButton from '$lib/components/buttons/FilledButton.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import SnackBars from '$lib/components/snack-bars/SnackBars.svelte';
	import Text from '$lib/components/texts/Text.svelte';
	import { walletBalance } from '$lib/data-stores/walletBalanceStore';
	import { DEFAULT_WALLET_BALANCE } from '$lib/utils/constants/storeDefaults';
	import { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import ModalApproveButton from './sub-components/ModalApproveButton.svelte';
	import ModalPondInput from './sub-components/ModalPondInput.svelte';

	const modalFor = 'stake-modal';

	//initial amount states
	let inputPondAmount: number = 0;
	let approvedPond: number = 0;

	//loading states
	let approveLoading: boolean = false;
	let submitLoading: boolean = false;

	//snackbar states
	let showApproveSnackbar: boolean = true;

	// max amount in wallet
	let maxPondBalance = DEFAULT_WALLET_BALANCE.pond;
	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxPondBalance = value.pond;
		//TODO: remove this
		maxPondBalance = BigNumber.from('20000000000000000000000');
	});

	const handleApproveClick = async () => {
		// TODO: call approve function
		approveLoading = true;
		setTimeout(() => {
			console.log('approve delayed by 3000ms');
			approvedPond = inputPondAmount;
			approveLoading = false;
			showApproveSnackbar = true;
		}, 3000);
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
	//considering max amount is required
	$: approveDisabled =
		!!maxPondBalance &&
		(inputPondAmount <= 0 ||
			!maxPondBalance.gte(inputPondAmount) ||
			inputPondAmount <= approvedPond);
	$: pondDisabledText =
		!!inputPondAmount && !maxPondBalance.gte(inputPondAmount) ? 'Insufficient POND' : '';
	$: submitEnable =
		!!inputPondAmount && inputPondAmount <= approvedPond && maxPondBalance.gte(inputPondAmount);
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
			bind:inputAmount={inputPondAmount}
			maxAmount={maxPondBalance}
			maxAmountText={'Balance'}
		>
			<ModalApproveButton
				slot="input-end-button"
				disabled={approveDisabled}
				loading={approveLoading}
				bind:inputPondAmount
				bind:approvedPond
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
<SnackBars
	bind:show={showApproveSnackbar}
	text={'POND approved'}
	alertVariant="alert-success"
	duration={3000}
	variant="success"
/>
