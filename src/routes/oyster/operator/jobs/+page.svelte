<script lang="ts">
	import { getJobStatuses } from '$lib/controllers/httpController';
	import { getOysterMerchantJobsFromSubgraph } from '$lib/controllers/subgraphController';
	import { updateMerchantJobsInOysterStore } from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import OysterMerchantJobs from '$lib/page-components/oyster/operator/OysterOperatorJobs.svelte';
	import { modifyOysterJobData } from '$lib/utils/data-modifiers/oysterModifiers';

	async function fetchOysterMerchantJobs() {
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

		const merchantJobs = await modifyOysterJobData(merchantJobsFromSubgraph);
		// updating the oyster store with merchant jobs
		if (merchantJobs !== null) {
			updateMerchantJobsInOysterStore(merchantJobs);
		} else {
			updateMerchantJobsInOysterStore([]);
		}
	}

	$: if ($connected) {
		fetchOysterMerchantJobs();
	}
</script>

<div class="py-4">
	<OysterMerchantJobs />
</div>
