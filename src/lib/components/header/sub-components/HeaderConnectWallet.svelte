<script lang="ts">
	import { connected, web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import DisconnectWalletButton from '$lib/components/header/sub-components/DisconnectWalletButton.svelte';
	import { setWalletAndChainStores } from '$lib/controllers/walletController';

	let lastAddress: string | undefined = undefined;

	$: connectedAccount = $web3WalletStore?.[0];
	$: provider = connectedAccount?.provider;
	$: address = connectedAccount?.accounts?.[0].address;

	$: if (address !== undefined && provider !== undefined && address !== lastAddress) {
		console.log('setting wallet and chain stores');
		setWalletAndChainStores(provider);
		lastAddress = address;
	}
</script>

{#if $connected}
	<DisconnectWalletButton bind:lastAddress />
{:else}
	<ConnectWalletButton />
{/if}
