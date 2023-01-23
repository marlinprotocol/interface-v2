<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { bigNumbertoNumber } from '$lib/utils/conversion';
	import { BigNumber } from 'ethers';
	import ModalPondInput from './ModalPondInput.svelte';

	const modalFor = 'unstake-modal';
	const maxAmount = BigNumber.from('20000000000000000000000');

	let inputPondAmount: number = 0;
	$: submitEnable =
		!!inputPondAmount && inputPondAmount > 0 && inputPondAmount <= bigNumbertoNumber(maxAmount);

	const handleSubmitClick = () => {
		// TODO: call submit function and reset input value
		console.log('Submit :>>', inputPondAmount);
	};
</script>

<div>
	<Modal {modalFor}>
		<div slot="title">
			{'UNSTAKE POND'}
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
				maxAmountText={'Staked'}
			/>
		</div>
		<div slot="action-buttons" class="mt-6">
			<PrimaryButton disabled={!submitEnable} onclick={handleSubmitClick} styleClass={'btn-block'}
				>WITHDRAW STAKE</PrimaryButton
			>
		</div>
	</Modal>
</div>
