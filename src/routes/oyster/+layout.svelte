<script>
	import {
		getAllProvidersDetailsFromSubgraph,
		getApprovedOysterAllowances,
		getOysterJobs,
		getProviderDetailsFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';

	async function init() {
		const [allowance, oysterJobs, providerDetail, allMarketplaceData] = await Promise.all([
			getApprovedOysterAllowances($walletStore.address, $contractAddressStore.Bridge),
			getOysterJobs($walletStore.address),
			getProviderDetailsFromSubgraph($walletStore.address),
			getAllProvidersDetailsFromSubgraph()
		]);
		console.log('Oyster Data Fetch - allMarketplaceData:>> ', allMarketplaceData);
		console.log('Oyster Data Fetch - allowance', allowance);
		console.log('Oyster Data Fetch - oysterJobs', oysterJobs);
		console.log('Oyster Data Fetch - providerDetail', providerDetail);
		oysterStore.set({
			...$oysterStore,
			providerData: {
				data: providerDetail,
				registered: providerDetail != null
			},
			allowance: allowance,
			jobsData: oysterJobs,
			allMarketplaceData
		});
	}
	$: if ($connected) {
		init();
	}
</script>

<slot />
