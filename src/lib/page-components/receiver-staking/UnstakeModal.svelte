<script lang="ts">
	import FilledButton from '$lib/components/buttons/FilledButton.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import Text from '$lib/components/texts/Text.svelte';
	import { BigNumber } from 'ethers';
	import ModalPondInput from './sub-components/ModalPondInput.svelte';

	const modalFor = 'unstake-modal';
	const maxAmount = BigNumber.from('20000000000000000000000');

	let inputPondAmount: number = 0;
	$: pondDisabledText =
		!!inputPondAmount && !maxAmount.gte(inputPondAmount) ? 'Insufficient POND' : '';
	$: submitEnable = !!inputPondAmount && inputPondAmount > 0 && maxAmount.gte(inputPondAmount);

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

			{#if !!pondDisabledText}
				<Text variant="small" styleClass="text-red-500 my-2" text={pondDisabledText} />
			{/if}
		</div>
		<div slot="action-buttons" class="mt-6">
			<FilledButton disabled={!submitEnable} onclick={handleSubmitClick} styleClass={'btn-block'}
				>WITHDRAW STAKE</FilledButton
			>
		</div>
	</Modal>
</div>
