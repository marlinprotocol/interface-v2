<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import ConnectWalletModal from '$lib/page-components/header/sub-components/ConnectWalletModal.svelte';
	import DisconnectWalletModal from '$lib/page-components/header/sub-components/DisconnectWalletModal.svelte';
	import type { ChainStore } from '$lib/types/storeTypes';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	$: shortAddress =
		$walletStore.address.slice().substring(0, 6) +
		'...' +
		$walletStore.address.slice().substring(38, 42);

	$: provider = $walletStore.provider;

	let chain: ChainStore;

	const unsubscribeChainProviderStore: Unsubscriber = chainStore.subscribe((value: ChainStore) => {
		chain = value;
	});
	onDestroy(unsubscribeChainProviderStore);

	const styles = {
		address: 'text-xs',
		network: 'font-bold text-sm'
	};
</script>

{#if $connected}
	<label
		for="disconnect-wallet-modal"
		class="bg-base-100 cursor-pointer text-primary rounded-lg shadow-sm flex gap-4 px-4 py-2 items-center"
	>
		<img src="./images/wallet-connected.svg" alt="Metamask Logo" />
		<div class={'flex flex-col text-left'}>
			<h6 class={styles.network}>{chain?.chainDisplayName?.toLocaleUpperCase()}</h6>
			<p class={styles.address}>{shortAddress}</p>
		</div>
	</label>
	<DisconnectWalletModal />
{:else}
	<label
		for="connect-wallet-modal"
		class={`${buttonClasses.outlined} h-11 font-semibold text-sm flex gap-[10.3px]`}
	>
		<img src="./images/lockicon.svg" alt="Connect" />
		Connect Wallet
	</label>
	<ConnectWalletModal />
{/if}

<style>
	h6 {
		color: #07617d;
	}
	p {
		color: #0498ad;
	}
</style>
