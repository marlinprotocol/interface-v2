<script lang="ts">
	import { getJobStatuses } from '$lib/controllers/httpController';
	import { getOysterMerchantJobsFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainIdHasChanged, chainStore } from '$lib/data-stores/chainProviderStore';
	import {
		oysterRateMetadataStore,
		setMerchantJobsLoadedInOysterStore,
		updateMerchantJobsInOysterStore
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

	async function fetchOysterMerchantJobs() {
		setMerchantJobsLoadedInOysterStore(false);
		const [merchantJobsFromSubgraph, jobStatuses] = await Promise.all([
			getOysterMerchantJobsFromSubgraph($walletStore.address),
			getJobStatuses($walletStore.address)
		]);

		let jobStatusLookup: Record<string, string> = {};
		jobStatuses.forEach((status: any) => {
			jobStatusLookup[status.jobId] = status.ip;
		});
		// Assign IP addresses from jobStatus to jobData
		merchantJobsFromSubgraph.forEach((data: any) => {
			if (Object.prototype.hasOwnProperty.call(jobStatusLookup, data.id.toString())) {
				data.ip = jobStatusLookup[data.id.toString()];
			}
		});

		const merchantJobs = await modifyOysterJobData(
			merchantJobsFromSubgraph,
			$oysterRateMetadataStore.oysterRateScalingFactor
		);
		// updating the oyster store with merchant jobs
		if (merchantJobs !== null) {
			updateMerchantJobsInOysterStore(merchantJobs);
		} else {
			updateMerchantJobsInOysterStore([]);
		}
	}

	$: if (
		$connected &&
		(walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId))
	) {
		previousChainId = $chainStore.chainId;
		previousWalletAddress = $walletStore.address;
		fetchOysterMerchantJobs();
	}
</script>

<slot />
