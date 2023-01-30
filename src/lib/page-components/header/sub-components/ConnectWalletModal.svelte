<script lang="ts">
	import FilledButton from '$lib/components/buttons/FilledButton.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { connectWallet } from '$lib/controllers/walletController';
	import { walletProviders } from '$lib/data-stores/walletProviderStore';

	const modalFor = 'connect-wallet-modal';
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">Connect Wallet</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		<div class="flex justify-evenly gap-2 items-center">
			{#each walletProviders as walletProvider (walletProvider.id)}
				<FilledButton
					onclick={() => connectWallet(walletProvider.provider)}
					styleClass={'w-full shrink'}
				>
					{walletProvider.provider}
				</FilledButton>
			{/each}
		</div>
	</svelte:fragment>
</Modal>
