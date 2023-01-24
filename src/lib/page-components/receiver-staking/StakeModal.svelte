<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import { buttonClasses } from '$lib/components/componentClasses';
	import Modal from '$lib/components/modals/Modal.svelte';
	import Text from '$lib/components/texts/Text.svelte';
	import { bigNumbertoNumber } from '$lib/utils/conversion';
	import { BigNumber } from 'ethers';
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

	const styles = {
		inputEndButton: `${buttonClasses.text} text-lg text-primary font-medium`
	};

	//considering max amount is required
	$: approveDisabled =
		!!maxAmount &&
		(inputPondAmount <= 0 ||
			inputPondAmount > bigNumbertoNumber(maxAmount) ||
			inputPondAmount <= approvedPond);

	$: pondDisabledText =
		!!inputPondAmount && inputPondAmount > bigNumbertoNumber(maxAmount) ? 'Insufficient POND' : '';
	$: submitEnable =
		!!approvedPond && approvedPond > 0 && approvedPond <= bigNumbertoNumber(maxAmount);
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
				<button
					slot="inputEndButton"
					disabled={approveDisabled || approveLoading}
					type="submit"
					class={`${styles.inputEndButton} ${approveLoading && 'loading'}`}
					on:click={handleApproveClick}
				>
					<!-- TODO: check approved design -->
					{!!inputPondAmount && inputPondAmount <= approvedPond ? 'Approved' : 'Approve'}</button
				>
			</ModalPondInput>
			{#if !!pondDisabledText}
				<Text variant="small" styleClass="text-red-500 my-2" text={pondDisabledText} />
			{/if}
		</div>
		<div slot="action-buttons" class="mt-6">
			<PrimaryButton
				disabled={!submitEnable}
				loading={submitLoading}
				onclick={handleSubmitClick}
				styleClass={'btn-block'}>CONFIRM</PrimaryButton
			>
		</div></Modal
	>
</div>
