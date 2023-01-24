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
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import ErrorButton from '$lib/components/buttons/ErrorButton.svelte';
	import { chainStore, resetChainProviderStore } from '$lib/data-stores/chainProviderStore';
	import { environmentStore } from '$lib/data-stores/environmentStore';
	import type { Environment } from '$lib/types/environmentTypes';

	let wallet: WalletStore;
	let balance: WalletBalance;
	let chain: ChainStore;
	let environment: Environment;
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

	const unsubscribeEnvironmentStore: Unsubscriber = environmentStore.subscribe(
		(value: Environment) => {
			environment = value;
		}
	);

	function resetStores() {
		resetWalletProviderStore();
		resetWalletBalanceStore();
		resetChainProviderStore();
	}

	onDestroy(unsubscribeWalletProviderStore);
	onDestroy(unsubscribeEnvironmentStore);
	onDestroy(unsubscribeWalletBalanceStore);
	onDestroy(unsubscribeChainProviderStore);
</script>

<div>
	<h2 class="text-primary text-2xl font-bold my-5">{pageTitle}</h2>
	<div class="flex gap-2 justify-center my-2">
		{#each walletProviders as walletProvider (walletProvider.id)}
			<PrimaryButton onclick={() => walletProvider.connect()}>
				<div>{walletProvider.provider}</div>
			</PrimaryButton>
		{/each}
	</div>
	<ErrorButton styleClass="mt-2" onclick={() => resetStores()}>Disconnect wallet</ErrorButton>
	{#if $connected}
		<div>Address: {wallet.checksumAddress}</div>
		<div>Pond Balance: {balance.pond}</div>
		<div>MPond Balance: {balance.mpond}</div>
		<div>Chain ID: {chain.chainId}</div>
	{/if}
	<div>Environment: {environment.environment_name}</div>
	<button class="btn btn-secondary">Test</button>
</div>
