<script lang="ts">
	import { connected, web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import DisconnectWalletButton from '$lib/components/header/sub-components/DisconnectWalletButton.svelte';
	import { setWalletAndChainStores } from '$lib/controllers/walletController';

	let lastAddress = '';

	$: connectedAccount = $web3WalletStore?.[0];
	$: provider = connectedAccount?.provider;
	$: address = connectedAccount?.accounts?.[0].address;

	$: if (address !== undefined && provider !== undefined && address !== lastAddress) {
		setWalletAndChainStores(provider);
		lastAddress = address;
	}
	$: lastAddress = $connected ? lastAddress : '';
</script>

{#if $connected}
	<DisconnectWalletButton />
{:else}
	<ConnectWalletButton />
{/if}
