<script lang="ts">
	import { getProviderDetailsFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainIdHasChanged, chainStore } from '$lib/data-stores/chainProviderStore';
	import {
		initializeProviderDataInOysterStore,
		resetOysterStore
	} from '$lib/data-stores/oysterStore';
	import {
		connected,
		walletAddressHasChanged,
		walletStore
	} from '$lib/data-stores/walletProviderStore';
	import OysterOperatorRegisterPage from '$lib/page-components/v2/oyster/operator/OysterOperatorRegisterPage.svelte';
	import type { Address } from '$lib/types/storeTypes';

	let previousChainId: number | null = null;
	let previousWalletAddress: Address = '';

	async function loadProviderDetails() {
		console.log('fetching operator details');
		const providerDetails = await getProviderDetailsFromSubgraph($walletStore.address);
		// updating the oyster store with provider details and registered
		if (providerDetails !== undefined && providerDetails !== null) {
			initializeProviderDataInOysterStore(providerDetails);
		} else {
			resetOysterStore();
		}
		console.log('operator details loaded');
	}

	$: if ($connected) {
		if (
			walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId)
		) {
			loadProviderDetails();
			previousChainId = $chainStore.chainId;
			previousWalletAddress = $walletStore.address;
		}
	} else {
		previousChainId = null;
		previousWalletAddress = '';
	}
</script>

<OysterOperatorRegisterPage />
