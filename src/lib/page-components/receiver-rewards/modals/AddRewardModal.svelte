<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';

	export let modalFor: string;
	let amountApproved = false;
	let loading = false;
	let disabled = false;

	const subtitle = 'Add rewards for operators and make em happier!';

	function resetInputs() {
		console.log('reset inputs for add rewards');
	}

	function handleSubmitClick() {
		console.log('submit for add rewards clicked');
		loading = true;
		try {
			// add submit logic here
			loading = false;
		} catch (error) {
			console.error('error while submitting pond for rewards :>>', error);
			loading = false;
		}
	}
	function handleApproveClick() {
		console.log('approve for add rewards clicked');
		loading = true;
		try {
			// add approve logic here
			amountApproved = true;
			loading = false;
		} catch (error) {
			amountApproved = false;
			loading = false;
			console.error('error while approving pond for rewards :>>', error);
		}
	}
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'ADD REWARDS FOR OPERATORS'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">this is the content for adding rewards</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			{disabled}
			{loading}
			onclick={amountApproved ? handleSubmitClick : handleApproveClick}
			size="large"
			styleClass={'btn-block w-full'}>{amountApproved ? 'CONFIRM' : 'APPROVE'}</Button
		>
	</svelte:fragment>
</Modal>
