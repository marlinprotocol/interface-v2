<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import type { ChainStore, WalletBalance, WalletStore } from '$lib/types/storeTypes';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { walletBalance } from '$lib/data-stores/walletBalanceStore';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { getContractDetails } from '$lib/controllers/contractController';
	import ENVIRONMENT from '$lib/environments/environment';
	import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';

	let wallet: WalletStore;
	let balance: WalletBalance;
	let chain: ChainStore;
	let contractAbiDetails = {};
	let contractAddressDetails = {};
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

	const unsubscribeContractAbiStore: Unsubscriber = contractAbiStore.subscribe((value) => {
		contractAbiDetails = value;
	});

	const unsubscribeContractAddressStore: Unsubscriber = contractAddressStore.subscribe((value) => {
		contractAddressDetails = value;
	});

	function fetchContractDetails() {
		console.log('fetching contract details');
		getContractDetails();
	}

	onDestroy(unsubscribeWalletProviderStore);
	onDestroy(unsubscribeWalletBalanceStore);
	onDestroy(unsubscribeChainProviderStore);
	onDestroy(unsubscribeContractAbiStore);
	onDestroy(unsubscribeContractAddressStore);
</script>

<div>
	<h2 class="text-primary text-2xl font-bold my-5">{pageTitle}</h2>
	{#if $connected}
		<div>Address: {wallet.address}</div>
		<div>Pond Balance: {balance.pond}</div>
		<div>MPond Balance: {balance.mpond}</div>
		<div>Chain ID: {chain.chainId}</div>
	{:else}
		The wallet is not connected.
	{/if}
	<div>Environment: {ENVIRONMENT.environment_name}</div>
	<button class="btn btn-secondary" on:click={() => fetchContractDetails()}
		>Fetch contract details</button
	>
	<div>Contract ABI Details</div>
	<pre>{JSON.stringify(contractAbiDetails)}</pre>
	<div>Contract Address Details</div>
	<pre>{JSON.stringify(contractAddressDetails)}</pre>
</div>
