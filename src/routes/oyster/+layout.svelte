<script lang="ts">
	import { getJobStatuses } from '$lib/controllers/httpController';
	import {
		getApprovedOysterAllowances,
		getOysterJobs,
		getProviderDetailsFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';

	async function loadConnectedData() {
		const [allowance, oysterJobs, providerDetail, jobStatuses] = await Promise.all([
			getApprovedOysterAllowances($walletStore.address),
			getOysterJobs($walletStore.address),
			getProviderDetailsFromSubgraph($walletStore.address),
			getJobStatuses($walletStore.address)
		]);
		// Create a lookup object based on jobStatuses
		let jobStatusLookup: Record<string, string> = {};
		jobStatuses.forEach((status: any) => {
			jobStatusLookup[status.jobId] = status.ip;
		});

		// Assign IP addresses from jobStatus to jobData
		oysterJobs.forEach((data) => {
			if (jobStatusLookup.hasOwnProperty(data.id.toString())) {
				data.ip = jobStatusLookup[data.id.toString()];
			}
		});
		// console.log('Existing Oyster Data - ', $oysterStore);
		// console.log('Oyster Data Fetch - allowance', allowance);
		// console.log('Oyster Data Fetch - oysterJobs', oysterJobs);
		// console.log('Oyster Data Fetch - providerDetail', providerDetail);
		// console.log('Oyster Data Fetch - jobStatuses', jobStatuses);

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

	$: if ($connected && $chainStore.chainId) {
		loadConnectedData();
	}
</script>

<slot />
