<script lang="ts">
	import { getJobStatuses } from '$lib/controllers/httpController';
	import {
		getOysterCreditJobsFromSubgraph,
		getOysterJobsFromSubgraph,
		getOysterJobsFromSubgraphById
	} from '$lib/controllers/subgraphController';
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
		// get job ids of credit jobs for this wallet from the subgraph
		const oysterCreditJobsFromSubgraph = await getOysterCreditJobsFromSubgraph(
			$walletStore.address
		);
		const creditJobIdsFromSubgraph = oysterCreditJobsFromSubgraph.map((job: any) => job.jobId);

		// get oyster jobs by wallet address, and using the job ids from the credit jobs
		const [oysterJobsFromSubgraph, jobStatuses, oysterJobsByIdFromSubgraph] = await Promise.all([
			getOysterJobsFromSubgraph($walletStore.address),
			getJobStatuses($walletStore.address),
			getOysterJobsFromSubgraphById(creditJobIdsFromSubgraph)
		]);

		// add a flag for credit jobs
		const creditJobsWithFlags = oysterJobsByIdFromSubgraph.map((job: any) => {
			job.isCreditJob = true;
			return job;
		});

		// combine the two arrays of oyster jobs
		const allOysterJobsFromSubgraph = oysterJobsFromSubgraph.concat(creditJobsWithFlags);

		// Create a lookup object based on jobStatuses
		let jobStatusLookup: Record<string, string> = {};
		jobStatuses.forEach((status: any) => {
			jobStatusLookup[status.jobId] = status.ip;
		});
		// Assign IP addresses from jobStatus to jobData
		allOysterJobsFromSubgraph.forEach((data: any) => {
			if (Object.prototype.hasOwnProperty.call(jobStatusLookup, data.id.toString())) {
				data.ip = jobStatusLookup[data.id.toString()];
			}
		});

		const oysterJobs = await modifyOysterJobData(
			allOysterJobsFromSubgraph,
			$oysterRateMetadataStore.oysterRateScalingFactor
		);

		initializeInventoryDataInOysterStore(oysterJobs);
		console.log('Oyster inventory data is loaded');
	}

	$: if ($connected) {
		if (
			walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId)
		) {
			loadOysterInventoryData();
			previousChainId = $chainStore.chainId;
			previousWalletAddress = $walletStore.address;
		}
	} else {
		// resetting chain id since everything depends on the wallet address in inventory
		previousChainId = null;
		previousWalletAddress = '';
	}
</script>

<slot />
