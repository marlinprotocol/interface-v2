<script lang="ts">
	import FilledButton from '$lib/components/buttons/FilledButton.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { resetChainProviderStore } from '$lib/data-stores/chainProviderStore';
	import { resetWalletBalanceStore } from '$lib/data-stores/walletBalanceStore';
	import { resetWalletProviderStore } from '$lib/data-stores/walletProviderStore';

	const modalFor = 'disconnect-wallet-modal';

	function disconnectWallet() {
		resetWalletProviderStore();
		resetWalletBalanceStore();
		resetChainProviderStore();
		console.log('!! Wallet disconnected !!');
	}
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">Disconnect Wallet</svelte:fragment>
	<svelte:fragment slot="content">Are you sure you want to disconnect your wallet?</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		<FilledButton onclick={disconnectWallet}>Disconnect</FilledButton>
	</svelte:fragment>
</Modal>
