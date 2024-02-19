<script lang="ts">
	import { getJobStatuses } from '$lib/controllers/httpController';
	import { getOysterJobsFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainIdHasChanged, chainStore } from '$lib/data-stores/chainProviderStore';
	import {
		initializeInventoryDataInOysterStore,
		oysterRateMetadataStore,
		setInventoryDataLoadedInOysterStore
	} from '$lib/data-stores/oysterStore';
	import {
		connected,
		walletAddressHasChanged,
		walletStore
	} from '$lib/data-stores/walletProviderStore';
	import type { Address } from '$lib/types/storeTypes';
	import { modifyOysterJobData } from '$lib/utils/data-modifiers/oysterModifiers';

	let previousChainId: number | null = null;
	let previousWalletAddress: Address = '';

	async function loadOysterInventoryData() {
		console.log('Loading oyster inventory data');
		setInventoryDataLoadedInOysterStore(false);
		const [oysterJobsFromSubgraph, jobStatuses] = await Promise.all([
			getOysterJobsFromSubgraph($walletStore.address),
			getJobStatuses($walletStore.address)
		]);
		// Create a lookup object based on jobStatuses
		let jobStatusLookup: Record<string, string> = {};
		jobStatuses.forEach((status: any) => {
			jobStatusLookup[status.jobId] = status.ip;
		});
		// Assign IP addresses from jobStatus to jobData
		oysterJobsFromSubgraph.forEach((data: any) => {
			if (Object.prototype.hasOwnProperty.call(jobStatusLookup, data.id.toString())) {
				data.ip = jobStatusLookup[data.id.toString()];
			}
		});
		const oysterJobs = await modifyOysterJobData(
			oysterJobsFromSubgraph,
			$oysterRateMetadataStore.oysterRateScalingFactor
		);

		initializeInventoryDataInOysterStore(oysterJobs);
		console.log('Oyster inventory data is loaded');
	}

	$: if (
		$connected &&
		(walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId))
	) {
		previousChainId = $chainStore.chainId;
		previousWalletAddress = $walletStore.address;
		loadOysterInventoryData();
	}
</script>

<slot />
