<script lang="ts">
	import {
		connectWallet,
		disconnectWallet,
		web3WalletStore
	} from '$lib/controllers/walletController';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import DisconnectWalletButton from '$lib/components/header/sub-components/DisconnectWalletButton.svelte';

	$: connectedAccount = $web3WalletStore?.[0];
	$: if (connectedAccount) {
		connectWallet(connectedAccount.provider);
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
