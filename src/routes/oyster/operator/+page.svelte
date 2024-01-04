<script lang="ts">
	import { getProviderDetailsFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import {
		initializeProviderDataInOysterStore,
		resetOysterStore
	} from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import OysterDashboard from '$lib/page-components/oyster/OysterDashboard.svelte';

	let prevChainId: null | number = null;
	let prevAddress = '';

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

	$: if (
		$connected &&
		$walletStore.address !== prevAddress &&
		$chainStore.chainId !== prevChainId
	) {
		prevChainId = $chainStore.chainId;
		prevAddress = $walletStore.address;
		loadProviderDetails();
	}
</script>

<OysterDashboard />
