<script lang="ts">
	import { getAllProvidersDetailsFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import {
		setMarketplaceLoadedInOysterStore,
		updateMarketplaceDataInOysterStore,
		oysterRateMetadataStore
	} from '$lib/data-stores/oysterStore';
	import OysterMarketplacePage from '$lib/page-components/oyster/marketplace/OysterMarketplacePage.svelte';
	import { REGION_NAME_CONSTANTS } from '$lib/utils/constants/regionNameConstants';
	import { getOysterProvidersModified } from '$lib/utils/data-modifiers/oysterModifiers';
	import { addRegionNameToMarketplaceData } from '$lib/utils/helpers/oysterHelpers';

	async function loadMarketplaceData() {
		console.log('Loading marketplace data');
		setMarketplaceLoadedInOysterStore(false);
		const providersDataFromSubgraph = await getAllProvidersDetailsFromSubgraph();
		const marketplaceData = await getOysterProvidersModified(
			providersDataFromSubgraph,
			$oysterRateMetadataStore.rateCPUrlUnitInSeconds
		);
		const marketplaceDataWithRegionName = addRegionNameToMarketplaceData(
			marketplaceData,
			REGION_NAME_CONSTANTS
		);
		// updating stores instead of returning data as we don't need to show this data explicitly
		updateMarketplaceDataInOysterStore(marketplaceDataWithRegionName);
		console.log('marketplace data is loaded');
	}

	$: if ($chainStore.chainId) {
		loadMarketplaceData();
	}
</script>

<OysterMarketplacePage />
