<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';

	export let modalFor: string;

	const subtitle = 'Add rewards for operators and make em happier!';

	function resetInputs() {
		console.log('reset inputs for add rewards');
	}

	function handleSubmitClick() {
		console.log('submit for add rewards clicked');
	}
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'ADD REWARDS FOR OPERATORS'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
		<p class="mt-2">
			<span>
				{`Note: There are no rewards for staking POND on the receiver staking portal. Users looking to delegate POND/MPond to clusters in the Marlin network need to go `}
			</span>
		</p>
	</svelte:fragment>
	<svelte:fragment slot="content">this is the content for adding rewards</svelte:fragment>
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
