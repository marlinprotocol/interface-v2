<script lang="ts">
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ModalPondInput from '$lib/page-components/receiver-staking/sub-components/ModalPondInput.svelte';
	import { DEFAULT_RECEIVER_BALANCE_DATA } from '$lib/utils/constants/storeDefaults';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { onDestroy } from 'svelte';
	import { BigNumber } from 'ethers';

	const modalFor = 'unstake-modal';

	// staked pond amount
	let maxAmount = DEFAULT_RECEIVER_BALANCE_DATA;
	const unsubscribeReceiverStakedStore = receiverStakingStore.subscribe((value) => {
		maxAmount = value.balance;
	});
	onDestroy(unsubscribeReceiverStakedStore);

	let inputPondAmount: BigInt = BigInt('0');
	$: inputAmount = inputPondAmount.toString();

	$: pondDisabledText = !!inputPondAmount && maxAmount < inputPondAmount ? 'Insufficient POND' : '';
	$: submitEnable =
		!!inputPondAmount && inputPondAmount > BigInt(0) && maxAmount >= inputPondAmount;

	const handleSubmitClick = () => {
		// TODO: call submit function and reset input value
		console.log('Submit :>>', inputPondAmount);
	};
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{'UNSTAKE POND'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<ModalPondInput
			title={'POND'}
			tooltipText={'Some text here'}
			bind:inputAmount
			maxAmount={BigNumber.from(maxAmount)}
			maxAmountText={'Staked'}
		/>

		{#if !!pondDisabledText}
			<Text variant="small" styleClass="text-red-500 my-2" text={pondDisabledText} />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		<FilledButton disabled={!submitEnable} onclick={handleSubmitClick} styleClass={'btn-block mt-4'}
			>WITHDRAW STAKE</FilledButton
		>
	</svelte:fragment>
</Modal>
