<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
</script>

<div>
	<Modal modalFor={'unstake-modal'}>
		<div slot="title">
			{'Are you sure?'}
		</div>
		<div slot="subtitle">
			{'un stack here and get rewards for your contribution now! Rewards are paid out in POND tokens.'}
		</div>

		<div slot="action-buttons">
			<PrimaryButton styleClass={'btn-block'}>CONFIRM</PrimaryButton>
		</div>
	</Modal>
</div>
