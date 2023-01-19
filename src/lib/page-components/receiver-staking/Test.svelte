<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import type { WalletBalance, WalletStore } from '$lib/utils/types/wallet';
	import {
		connected,
		resetWalletStore,
		walletProviders,
		walletStore
	} from '$lib/data-stores/walletProviderStore';
	import { resetWalletBalance, walletBalance } from '$lib/data-stores/walletBalanceStore';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import ErrorButton from '$lib/components/buttons/ErrorButton.svelte';

	let wallet: WalletStore;
	let balance: WalletBalance;
	let pageTitle: string = 'Marlin Receiver Staking Portal';

	const unsubscribeWalletStore: Unsubscriber = walletStore.subscribe((value: WalletStore) => {
		wallet = value;
	});
	const unsubscribeWalletBalance: Unsubscriber = walletBalance.subscribe((value: WalletBalance) => {
		balance = value;
	});

	function resetWalletStoreAndBalance() {
		resetWalletStore();
		resetWalletBalance();
	}

	onDestroy(unsubscribeWalletStore);
	onDestroy(unsubscribeWalletBalance);
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
	<ErrorButton styleClass="mt-2" onclick={() => resetWalletStoreAndBalance()}
		>Disconnect wallet
	</ErrorButton>
	{#if $connected}
		<div>Address: {wallet.address}</div>
		<div>Pond Balance: {balance.pond}</div>
		<div>MPond Balance: {balance.mpond}</div>
	{/if}
</div>
