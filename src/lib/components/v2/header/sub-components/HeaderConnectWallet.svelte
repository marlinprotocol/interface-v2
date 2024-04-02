<script lang="ts">
	import {
		connected,
		walletAddressHasChanged,
		web3WalletStore
	} from '$lib/data-stores/walletProviderStore';
	import ConnectWalletButton from '$lib/components/v2/header/sub-components/ConnectWalletButton.svelte';
	import DisconnectWalletButton from '$lib/components/v2/header/sub-components/DisconnectWalletButton.svelte';
	import { setWalletAndChainStores } from '$lib/controllers/walletController';
	import { chainIdHasChanged } from '$lib/data-stores/chainProviderStore';
	import type { Address } from '$lib/types/storeTypes';

	let previousWalletAddress: Address = '';
	let previousChainId: number | null = null;

	$: connectedAccount = $web3WalletStore?.[0];
	$: provider = connectedAccount?.provider;
	$: address = connectedAccount?.accounts?.[0].address;
	$: currentChain = Number(connectedAccount?.chains[0].id);
	$: userIsConnected = address !== undefined && provider !== undefined;

	$: if (userIsConnected) {
		if (
			walletAddressHasChanged(address, previousWalletAddress) ||
			chainIdHasChanged(currentChain, previousChainId)
		) {
			setWalletAndChainStores(provider);
			previousWalletAddress = address;
			previousChainId = currentChain;
		}
	} else {
		previousWalletAddress = '';
		previousChainId = null;
	}
</script>

{#if $connected}
	<DisconnectWalletButton bind:lastAddress={previousWalletAddress} />
{:else}
	<ConnectWalletButton />
{/if}
