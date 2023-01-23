<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { bigNumbertoNumber } from '$lib/utils/conversion';
	import { BigNumber } from 'ethers';
	import ModalPondInput from './ModalPondInput.svelte';

	const modalFor = 'stake-modal';
	const maxAmount = BigNumber.from('20000000000000000000000');

	let inputPondAmount: number = 0;
	let approvedPond: number = 0;
	$: submitEnable =
		!!approvedPond && approvedPond > 0 && approvedPond <= bigNumbertoNumber(maxAmount);

	const handleApproveClick = () => {
		// TODO: call approve function
		approvedPond = inputPondAmount;
	};

	const handleSubmitClick = () => {
		// TODO: call submit function and reset input, approved value
		console.log('submit', approvedPond);
	};
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
				{handleApproveClick}
			/>
		</div>
		<div slot="action-buttons" class="mt-6">
			<PrimaryButton onclick={handleSubmitClick} disabled={!submitEnable} styleClass={'btn-block'}
				>CONFIRM</PrimaryButton
			>
		</div></Modal
	>
</div>
