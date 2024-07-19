<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import { handleUnregisterInKalypso } from '$lib/utils/services/kalypsoServices';
	let unregisterLoading = false;

	async function handleUnregisterClick() {
		unregisterLoading = true;
		try {
			await handleUnregisterInKalypso($walletStore.address);
			unregisterLoading = false;
			closeModal('kalypso-register-modal');
		} catch (error) {
			unregisterLoading = false;
		}
	}
</script>

<Modal modalFor="unregister-kalypso-modal">
	<svelte:fragment slot="title">Unregister</svelte:fragment>
	<svelte:fragment slot="subtitle"
		>You are about to unregister from the Kalypso network
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="text-left">
			Unregistering from the Kalypso network will remove your staked tokens and you will no longer
			be able to provide infrastructure on the network. Are you sure you want to proceed?
		</div>
	</svelte:fragment>

	<svelte:fragment slot="actionButtons">
		<Button
			onclick={handleUnregisterClick}
			loading={unregisterLoading}
			disabled={unregisterLoading}
			variant="error"
			styleClass="font-normal flex-nowrap w-full"
			size="large">Unregister</Button
		>
	</svelte:fragment>
</Modal>
