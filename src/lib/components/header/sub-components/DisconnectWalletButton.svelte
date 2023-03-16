<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { ChainStore } from '$lib/types/storeTypes';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import DisconnectWalletModal from './DisconnectWalletModal.svelte';

	let showDialog: boolean = false;
	$: shortAddress =
		$walletStore.address.slice().substring(0, 6) +
		'...' +
		$walletStore.address.slice().substring(38, 42);

	// do not remove this line
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

<Button
	variant="whiteFilled"
	onclick={() => {
		showDialog = true;
	}}
	styleClass="bg-base-100 cursor-pointer text-primary rounded-lg shadow-sm flex gap-4 px-4 py-2 items-center"
>
	<img src="/images/wallet-connected.svg" alt="Metamask Logo" />
	<div class={'flex flex-col text-left'}>
		<h6 class={styles.network}>{chain?.chainDisplayName?.toLocaleUpperCase()}</h6>
		<p class={styles.address}>{shortAddress}</p>
	</div>
</Button>
<DisconnectWalletModal bind:showDialog />
