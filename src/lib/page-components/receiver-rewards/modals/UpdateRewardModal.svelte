<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';

	export let modalFor: string;

	const subtitle =
		'Update rewards for operators, not you can increase/decrease per epoch rewards that are given to operators!';

	function resetInputs() {
		console.log('reset inputs for update rewards');
	}

	function handleSubmitClick() {
		console.log('submit for update rewards clicked');
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
			disabled={false}
			loading={false}
			onclick={handleSubmitClick}
			size="large"
			styleClass={'btn-block w-full'}>CONFIRM</Button
		>
	</svelte:fragment>
</Modal>
