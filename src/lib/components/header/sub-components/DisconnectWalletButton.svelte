<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { ChainStore } from '$lib/types/storeTypes';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import DisconnectWalletModal from './DisconnectWalletModal.svelte';

	let modalFor = 'disconnect-wallet-modal';
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
		address: 'text-2xs text-[#0498ad] font-medium',
		network: 'font-bold text-sm text-[#07617d]'
	};
</script>

<ModalButton
	{modalFor}
	variant="whiteFilled"
	styleClass="bg-base-100 h-[50px] cursor-pointer text-primary rounded-lg shadow-sm flex gap-4 items-center"
>
	<img src="/images/wallet-connected.svg" alt="Metamask Logo" />
	<div class={'flex flex-col text-left'}>
		<h6 class={styles.network}>{chain?.chainDisplayName?.toLocaleUpperCase()}</h6>
		<p class={styles.address}>{shortAddress}</p>
	</div>
</ModalButton>
<DisconnectWalletModal {modalFor} />
