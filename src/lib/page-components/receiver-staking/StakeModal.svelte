<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';

	const modalFor = 'stake-modal';
</script>

<div>
	<Modal {modalFor}>
		<div slot="title">
			{'STAKE'}
		</div>
		<div slot="subtitle">
			{'Stack here and get rewards for your contribution now! Rewards are paid out in POND tokens.'}
		</div>
		<div slot="content">
			<SecondaryButton styleClass={'btn-block'}>Add Stake Input</SecondaryButton>
		</div>
		<div slot="action-buttons">
			<PrimaryButton styleClass={'btn-block'}>CONFIRM</PrimaryButton>
		</div></Modal
	>
</div>
