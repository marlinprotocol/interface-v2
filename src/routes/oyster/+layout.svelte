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
		// TODO: read oyster contract details
		const [allowance, oysterJobs, providerDetail, allProviders] = await Promise.all([
			getApprovedOysterAllowances($walletStore.address, $contractAddressStore.Bridge),
			getOysterJobs($walletStore.address),
			getProviderDetailsFromSubgraph($walletStore.address),
			getAllProvidersDetailsFromSubgraph()
		]);
		console.log('all providers from api call:>> ', allProviders);
		console.log('allowance from api call', allowance);
		oysterStore.set({
			...$oysterStore,
			providerData: {
				data: providerDetail,
				registered: providerDetail != null
			},
			allowance: allowance,
			jobsData: oysterJobs,
			allProviders
		});
	}
	$: if ($connected) {
		init();
	}
</script>

<slot />
