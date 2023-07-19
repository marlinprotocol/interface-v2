<script lang="ts">
	import { getJobStatuses } from '$lib/controllers/httpController';
	import {
		getAllProvidersDetailsFromSubgraph,
		getApprovedOysterAllowancesFromSubgraph,
		getOysterJobsFromSubgraph,
		getProviderDetailsFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { chainConfigStore, chainStore } from '$lib/data-stores/chainProviderStore';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { REGION_NAME_CONSTANTS } from '$lib/utils/constants/regionNameConstants';
	import {
		getOysterProvidersModified,
		modifyOysterJobData
	} from '$lib/utils/data-modifiers/oysterModifiers';
	import { addRegionNameToMarketplaceData } from '$lib/utils/helpers/oysterHelpers';

	async function loadConnectedData() {
		const [allowance, oysterJobsFromSubgraph, providerDetail, jobStatuses] = await Promise.all([
			getApprovedOysterAllowancesFromSubgraph($walletStore.address),
			getOysterJobsFromSubgraph($walletStore.address),
			getProviderDetailsFromSubgraph($walletStore.address),
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
		const oysterJobs = await modifyOysterJobData(oysterJobsFromSubgraph);

		oysterStore.update((value) => {
			return {
				...value,
				providerData: {
					data: providerDetail,
					registered: providerDetail !== null
				},
				allowance: allowance,
				jobsData: oysterJobs,
				oysterStoreLoaded: true
			};
		});
	}

	async function loadMarketplaceData() {
		const providersDataFromSubgraph = await getAllProvidersDetailsFromSubgraph();
		const marketplaceData = await getOysterProvidersModified(providersDataFromSubgraph);
		const marketplaceDataWithRegionName = addRegionNameToMarketplaceData(
			marketplaceData,
			REGION_NAME_CONSTANTS
		);
		// updating stores instead of returning data as we don't need to show this data explicitly
		oysterStore.update((store) => {
			return {
				...store,
				allMarketplaceData: marketplaceDataWithRegionName,
				marketplaceLoaded: true
			};
		});
	}

	$: if ($chainConfigStore) {
		loadMarketplaceData();
	}

	$: if ($connected && $chainStore.chainId) {
		loadConnectedData();
	}
</script>

<slot />
