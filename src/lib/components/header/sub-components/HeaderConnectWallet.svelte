<script lang="ts">
	import { disconnectWallet, setWalletAndChainStores } from '$lib/controllers/walletController';
	import { connected, web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import DisconnectWalletButton from '$lib/components/header/sub-components/DisconnectWalletButton.svelte';

	$: connectedAccount = $web3WalletStore?.[0];
	$: if (connectedAccount) {
		setWalletAndChainStores(connectedAccount.provider);
	}

	const disconnect = () => {
		disconnectWallet($web3WalletStore);
	};
</script>

{#if $connected}
	<DisconnectWalletButton {disconnect} />
{:else}
	<ConnectWalletButton />
{/if}
