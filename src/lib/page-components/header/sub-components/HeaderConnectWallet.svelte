<script lang="ts">
	import { buttonClasses } from '$lib/components/componentClasses';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import DisconnectWalletModal from './DisconnectWalletModal.svelte';
	import ConnectWalletModal from './ConnectWalletModal.svelte';
</script>

{#if $connected}
	<label for="disconnect-wallet-modal" class={`${buttonClasses.outlined} flex gap-2`}>
		<img src="./images/metamaskicon.svg" alt="Metamask Logo" width="24" />
		Disconnect Wallet
	</label>
	<DisconnectWalletModal />
{:else}
	<label for="connect-wallet-modal" class={`${buttonClasses.outlined} flex gap-2`}>
		<img src="./images/lockicon.svg" alt="Lock Icon" width="12" />
		Connect Wallet
	</label>
	<ConnectWalletModal />
{/if}
