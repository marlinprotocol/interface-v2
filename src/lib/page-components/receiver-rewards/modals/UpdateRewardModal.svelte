<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';

	export let modalFor: string;
	let amountApproved = false;
	let loading = false;
	let disabled = false;

	const subtitle =
		'Update rewards for operators, not you can increase/decrease per epoch rewards that are given to operators!';

	function resetInputs() {
		console.log('reset inputs for update rewards');
	}

	function handleSubmitClick() {
		console.log('submit for update rewards clicked');
		loading = true;
		try {
			// add submit logic here
			loading = false;
		} catch (error) {
			loading = false;
			console.error('error while submitting funds for updating rewards', error);
		}
	}

	function handleApproveClick() {
		console.log('approve for update rewards clicked');
		loading = true;
		try {
			// add approving logic here
			amountApproved = true;
			loading = false;
		} catch (error) {
			loading = false;
			amountApproved = false;
			console.error('error while approving funds for updating rewards', error);
		}
	}
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'UPDATE REWARDS FOR OPERATORS'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">this is the content for updating rewards</svelte:fragment>
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
