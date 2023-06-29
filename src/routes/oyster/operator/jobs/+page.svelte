<script>
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { getOysterMerchantJobsFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import OysterMerchantJobs from '$lib/page-components/oyster/operator/OysterOperatorJobs.svelte';
	import { modifyOysterJobData } from '$lib/utils/data-modifiers/oysterModifiers';

	async function fetchOysterMerchantJobs() {
		const merchantJobsFromSubgraph = await getOysterMerchantJobsFromSubgraph($walletStore.address);

		const merchantJobs = await modifyOysterJobData(merchantJobsFromSubgraph);
		// updating the oyster store with merchant jobs
		if (merchantJobs !== null) {
			oysterStore.update((value) => {
				return {
					...value,
					merchantJobsData: merchantJobs,
					merchantJobsLoaded: true
				};
			});
		} else {
			oysterStore.update((value) => {
				return {
					...value,
					merchantJobsData: [],
					merchantJobsLoaded: true
				};
			});
		}
	}

	$: if ($connected) {
		fetchOysterMerchantJobs();
	}
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<OysterMerchantJobs />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
