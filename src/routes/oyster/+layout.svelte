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

	async function loadMarketplaceData() {
		const allMarketplaceData = await getAllProvidersDetailsFromSubgraph();
		console.log('Oyster Data Fetch - allMarketplaceData:>> ', allMarketplaceData);
		oysterStore.update((store) => {
			return {
				...store,
				allMarketplaceData
			};
		});
	}

	async function loadConnectedData() {
		const [allowance, oysterJobs, providerDetail] = await Promise.all([
			getApprovedOysterAllowances($walletStore.address, $contractAddressStore.Bridge),
			getOysterJobs($walletStore.address),
			getProviderDetailsFromSubgraph($walletStore.address),
			getAllProvidersDetailsFromSubgraph()
		]);

		console.log('Existing Oyster Data - ', $oysterStore);
		console.log('Oyster Data Fetch - allowance', allowance);
		console.log('Oyster Data Fetch - oysterJobs', oysterJobs);
		console.log('Oyster Data Fetch - providerDetail', providerDetail);
		oysterStore.update((value) => {
			return {
				...value,
				providerData: {
					data: providerDetail,
					registered: providerDetail != null
				},
				allowance: allowance,
				jobsData: oysterJobs
			};
		});

		// oysterStore.set({
		// 	...$oysterStore,
		// 	providerData: {
		// 		data: providerDetail,
		// 		registered: providerDetail != null
		// 	},
		// 	allowance: allowance,
		// 	jobsData: oysterJobs
		// });
	}

	loadMarketplaceData();
	$: if ($connected) {
		loadConnectedData();
	}
</script>

<slot />
