<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import type { ChainStore, WalletBalance, WalletStore } from '$lib/types/storeTypes';
	import {
		connected,
		resetWalletProviderStore,
		walletProviders,
		walletStore
	} from '$lib/data-stores/walletProviderStore';
	import { resetWalletBalanceStore, walletBalance } from '$lib/data-stores/walletBalanceStore';
	import FilledButton from '$lib/components/buttons/FilledButton.svelte';
	import ErrorButton from '$lib/components/buttons/ErrorButton.svelte';
	import { chainStore, resetChainProviderStore } from '$lib/data-stores/chainProviderStore';
	import { connectWallet } from '$lib/controllers/walletController';
	import { getContractDetails } from '$lib/controllers/contractController';
	import ENVIRONMENT from '$lib/environments/environment';

	let wallet: WalletStore;
	let balance: WalletBalance;
	let chain: ChainStore;
	let pageTitle: string = 'Marlin Receiver Staking Portal';

	const unsubscribeWalletProviderStore: Unsubscriber = walletStore.subscribe(
		(value: WalletStore) => {
			wallet = value;
		}
	);
	const unsubscribeWalletBalanceStore: Unsubscriber = walletBalance.subscribe(
		(value: WalletBalance) => {
			balance = value;
		}
	);
	const unsubscribeChainProviderStore: Unsubscriber = chainStore.subscribe((value: ChainStore) => {
		chain = value;
	});

	function resetStores() {
		resetWalletProviderStore();
		resetWalletBalanceStore();
		resetChainProviderStore();
	}

	function fetchContractDetails() {
		console.log('fetching contract details');
		getContractDetails();
	}

	onDestroy(unsubscribeWalletProviderStore);
	onDestroy(unsubscribeWalletBalanceStore);
	onDestroy(unsubscribeChainProviderStore);
</script>

<div>
	<h2 class="text-primary text-2xl font-bold my-5">{pageTitle}</h2>
	<div class="flex gap-2 justify-center my-2">
		{#each walletProviders as walletProvider (walletProvider.id)}
			<FilledButton onclick={() => connectWallet(walletProvider.provider)}>
				<div>{walletProvider.provider}</div>
			</FilledButton>
		{/each}
	</div>
	<ErrorButton styleClass="mt-2" onclick={() => resetStores()}>Disconnect wallet</ErrorButton>
	{#if $connected}
		<div>Address: {wallet.address}</div>
		<div>Pond Balance: {balance.pond}</div>
		<div>MPond Balance: {balance.mpond}</div>
		<div>Chain ID: {chain.chainId}</div>
	{/if}
	<div>Environment: {ENVIRONMENT.environment_name}</div>
	<button class="btn btn-secondary">Test</button>
	<button class="btn btn-secondary" on:click={() => fetchContractDetails()}
		>fetch contract details</button
	>
</div>
