<script lang="ts">
	import {
		connected,
		resetWalletStore,
		walletProviders,
		walletStore,
		type WalletStore
	} from '$lib/utils/wallet-provider/walletProviders';

	let wallet: WalletStore;
	let pageTitle = 'Marlin Receiver Staking Portal';
	walletStore.subscribe((value: WalletStore) => {
		wallet = value;
	});
</script>

<div>
	<h2 class="text-primary text-2xl font-bold my-5">{pageTitle}</h2>
	<div class="flex gap-2 justify-center my-2">
		{#each walletProviders as walletProvider (walletProvider.id)}
			<button class="btn btn-primary" on:click|preventDefault={() => walletProvider.connect()}
				>{walletProvider.provider}</button
			>
		{/each}
	</div>
	<button class="btn btn-sm btn-outline btn-error my-2" on:click={() => resetWalletStore()}
		>Disconnect wallet</button
	>
	{#if $connected}
		<div>Address: {wallet.address}</div>
		<div>Pond Balance: {wallet.pondBalance}</div>
		<div>MPond Balance: {wallet.mpondBalance}</div>
	{/if}
</div>
