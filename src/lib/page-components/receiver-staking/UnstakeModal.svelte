<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import ModalPondInput from './ModalPondInput.svelte';

	const modalFor = 'unstake-modal';
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
			<ModalPondInput maxAmountText={'Staked'} />
		</div>
		<div slot="action-buttons" class="mt-6">
			<PrimaryButton styleClass={'btn-block'}>WITHDRAW STAKE</PrimaryButton>
		</div>
	</Modal>
</div>
