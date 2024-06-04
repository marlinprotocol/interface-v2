<script lang="ts">
	import { getAllowance } from '$lib/controllers/contract/usdc';
	import {
		chainIdHasChanged,
		setAllowedChainsStore,
		chainStore,
		allowedChainsStore,
		chainConfigStore
	} from '$lib/data-stores/chainProviderStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { environment } from '$lib/data-stores/environment';
	import { kalypsoStore, updateApprovedFundsInKalypsoStore } from '$lib/data-stores/kalypsoStore';
	import {
		connected,
		walletAddressHasChanged,
		walletStore
	} from '$lib/data-stores/walletProviderStore';
	import type { TokenMetadata } from '$lib/types/environmentTypes';
	import type { Address } from '$lib/types/storeTypes';
	import type { BrowserProvider } from 'ethers';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.kalypso);
	});

	let previousChainId: number | null = null;
	let previousWalletAddress: Address = '';

	async function init() {
		console.log('Loading kalypso allowances data');
		const approvedAmount = await getAllowance(
			$walletStore.address,
			$contractAddressStore.KALYPSO,
			$chainConfigStore.tokens.POND as TokenMetadata,
			$walletStore.provider as BrowserProvider
		);
		updateApprovedFundsInKalypsoStore(approvedAmount);
		console.log('Kalypso allowances data is loaded', $kalypsoStore.approvedAmount);
	}

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;

	$: if ($connected && chainSupported) {
		if (
			walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId)
		) {
			init();
			previousChainId = $chainStore.chainId;
			previousWalletAddress = $walletStore.address;
		}
	} else {
		previousChainId = null;
		previousWalletAddress = '';
	}

	onDestroy(() => {
		setAllowedChainsStore([]);
	});
</script>

<slot />
