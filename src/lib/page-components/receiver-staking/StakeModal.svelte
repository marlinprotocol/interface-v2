<script lang="ts">
	import FilledButton from '$lib/components/buttons/FilledButton.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import Text from '$lib/components/texts/Text.svelte';
	import { BigNumber } from 'ethers';
	import ModalApproveButton from './sub-components/ModalApproveButton.svelte';
	import ModalPondInput from './sub-components/ModalPondInput.svelte';

	const modalFor = 'stake-modal';
	const maxAmount = BigNumber.from('20000000000000000000000');

	//initial amount states
	let inputPondAmount: number = 0;
	let approvedPond: number = 0;

	//loading states
	let approveLoading: boolean = false;
	let submitLoading: boolean = false;

	const handleApproveClick = async () => {
		// TODO: call approve function
		approveLoading = true;
		setTimeout(() => {
			console.log('approve delayed');
			approvedPond = inputPondAmount;
			approveLoading = false;
		}, 3000);
	};

	const handleSubmitClick = async () => {
		// TODO: call submit function and reset input, approved value
		submitLoading = true;
		setTimeout(() => {
			console.log('confirm delayed');
			submitLoading = false;
		}, 3000);
	};

	//button states
	//considering max amount is required
	$: approveDisabled =
		!!maxAmount &&
		(inputPondAmount <= 0 || !maxAmount.gte(inputPondAmount) || inputPondAmount <= approvedPond);
	$: pondDisabledText =
		!!inputPondAmount && !maxAmount.gte(inputPondAmount) ? 'Insufficient POND' : '';
	$: submitEnable =
		!!inputPondAmount && inputPondAmount <= approvedPond && maxAmount.gte(inputPondAmount);
</script>

<div>
	<Modal {modalFor}>
		<div slot="title">
			{'STAKE POND'}
		</div>
		<div slot="subtitle">
			{'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.'}
		</div>
		<div slot="content">
			<ModalPondInput
				title={'POND'}
				tooltipText={'Some text here'}
				bind:inputAmount={inputPondAmount}
				{maxAmount}
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
		</div>
		<div slot="action-buttons" class="mt-6">
			<FilledButton
				disabled={!submitEnable}
				loading={submitLoading}
				onclick={handleSubmitClick}
				styleClass={'btn-block'}>CONFIRM</FilledButton
			>
		</div></Modal
	>
</div>
