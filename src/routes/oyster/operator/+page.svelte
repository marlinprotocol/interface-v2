<script lang="ts">
	import { getProviderDetailsFromSubgraph } from '$lib/controllers/subgraphController';
	import {
		initializeProviderDataInOysterStore,
		resetOysterStore
	} from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import OysterDashboard from '$lib/page-components/oyster/OysterDashboard.svelte';

	async function fetchProviderDetails() {
		const providerDetails = await getProviderDetailsFromSubgraph($walletStore.address);
		// updating the oyster store with provider details and registered
		if (providerDetails !== undefined && providerDetails !== null) {
			initializeProviderDataInOysterStore(providerDetails);
		} else {
			resetOysterStore();
		}
	}

	$: if ($connected && $walletStore.address) {
		fetchProviderDetails();
	}
</script>

<OysterDashboard />
