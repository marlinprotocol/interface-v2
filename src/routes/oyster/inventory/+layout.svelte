<script lang="ts">
	import { getJobStatuses } from '$lib/controllers/httpController';
	import {
		getOysterCreditJobsFromSubgraph,
		getOysterJobsFromSubgraph,
		getOysterJobsFromSubgraphById
	} from '$lib/controllers/subgraphController';
	import {
		allowedChainsStore,
		chainConfigStore,
		chainIdHasChanged,
		chainStore
	} from '$lib/data-stores/chainProviderStore';
	import {
		oysterLocalStorageStore,
		removeJobFromOysterLocalStorageStore
	} from '$lib/data-stores/localStorageStore';
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
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import type { Address } from '$lib/types/storeTypes';
	import { modifyOysterJobData } from '$lib/utils/data-modifiers/oysterModifiers';

	let previousChainId: number | null = null;
	let previousWalletAddress: Address = '';

	function getOysterJobsFromLocalStorage(currentChainId: number | null, walletAddress: Address) {
		if (!$oysterLocalStorageStore || !currentChainId || !$oysterLocalStorageStore[currentChainId]) {
			return [];
		}
		return $oysterLocalStorageStore[currentChainId][walletAddress] || [];
	}

	function mergeLocalStorageJobsWithSubgraphJobs(
		localStorageJobs: OysterInventoryDataModel[],
		modifiedSubgraphJobs: OysterInventoryDataModel[]
	) {
		const subgraphJobIds = modifiedSubgraphJobs.map((job: OysterInventoryDataModel) => job.id);
		const uniqueLocalStorageJobs = localStorageJobs.filter(
			(job: OysterInventoryDataModel) => !subgraphJobIds.includes(job.id)
		);
		// find job ids that are common in both local storage and subgraph jobs
		const duplicateJobs = localStorageJobs.filter((job: OysterInventoryDataModel) =>
			subgraphJobIds.includes(job.id)
		);
		// remove the entry from local storage if the job id is present in the subgraph jobs
		duplicateJobs.forEach((job) => {
			removeJobFromOysterLocalStorageStore(
				$chainStore.chainId as number,
				$walletStore.address,
				job
			);
		});
		return uniqueLocalStorageJobs.concat(modifiedSubgraphJobs);
	}

	async function loadOysterInventoryData() {
		console.log('Loading oyster inventory data');
		setInventoryDataLoadedInOysterStore(false);
		let creditJobsWithFlags: OysterInventoryDataModel[] = [];

		if ($chainConfigStore.subgraph_urls.OYSTER_CREDIT !== '') {
			// get job ids of credit jobs for this wallet from the subgraph
			const oysterCreditJobsFromSubgraph = await getOysterCreditJobsFromSubgraph(
				$walletStore.address
			);
			const creditJobIdsFromSubgraph = oysterCreditJobsFromSubgraph.map((job: any) => job.jobId);
			// get oyster jobs using the job ids from the credit jobs
			const oysterJobsByIdFromSubgraph =
				await getOysterJobsFromSubgraphById(creditJobIdsFromSubgraph);
			// add a flag for credit jobs
			creditJobsWithFlags = oysterJobsByIdFromSubgraph.map((job: any) => {
				job.isCreditJob = true;
				return job;
			});
		}

		// get oyster jobs by wallet address
		const [oysterJobsFromSubgraph, jobStatuses] = await Promise.all([
			getOysterJobsFromSubgraph($walletStore.address),
			getJobStatuses($walletStore.address)
		]);

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
		const modifiedOysterJobs = await modifyOysterJobData(
			allOysterJobsFromSubgraph,
			$oysterRateMetadataStore.oysterRateScalingFactor
		);
		const localStorageJobs = getOysterJobsFromLocalStorage(
			$chainStore.chainId,
			$walletStore.address
		);
		const allOysterJobs = mergeLocalStorageJobsWithSubgraphJobs(
			localStorageJobs,
			modifiedOysterJobs
		);
		initializeInventoryDataInOysterStore(allOysterJobs);
		console.log('Oyster inventory data is loaded');
	}

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;
	$: if ($connected && chainSupported) {
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

<div class="w-full">
	<slot />
</div>
