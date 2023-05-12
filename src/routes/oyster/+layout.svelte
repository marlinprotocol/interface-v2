<script>
	import {
		getApprovedOysterAllowances,
		getOysterJobs,
		getProviderDetailsFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';

	async function loadConnectedData() {
		const [allowance, oysterJobs, providerDetail] = await Promise.all([
			getApprovedOysterAllowances($walletStore.address),
			getOysterJobs($walletStore.address),
			getProviderDetailsFromSubgraph($walletStore.address)
		]);

		// console.log('Existing Oyster Data - ', $oysterStore);
		// console.log('Oyster Data Fetch - allowance', allowance);
		// console.log('Oyster Data Fetch - oysterJobs', oysterJobs);
		// console.log('Oyster Data Fetch - providerDetail', providerDetail);
		oysterStore.update((value) => {
			return {
				...value,
				providerData: {
					data: providerDetail,
					registered: providerDetail != null
				},
				allowance: allowance,
				jobsData: oysterJobs,
				oysterStoreLoaded: true
			};
		});
	}

	$: if ($connected) {
		loadConnectedData();
	}
</script>

<slot />
