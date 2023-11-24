<script lang="ts">
	import { getJobStatuses } from '$lib/controllers/httpController';
	import { getOysterJobsFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import {
		initializeInventoryDataInOysterStore,
		oysterRateMetadataStore
	} from '$lib/data-stores/oysterStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import OysterInventoryPage from '$lib/page-components/oyster/inventory/OysterInventoryPage.svelte';
	import { modifyOysterJobData } from '$lib/utils/data-modifiers/oysterModifiers';

	async function loadOysterInventoryData() {
		console.log('Loading oyster inventory data');
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

	$: if ($walletStore.address !== '' && $walletStore.address !== undefined && $chainStore.chainId) {
		loadOysterInventoryData();
	}
</script>

<OysterInventoryPage />
