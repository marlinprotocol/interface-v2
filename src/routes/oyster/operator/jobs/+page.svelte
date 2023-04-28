<script>
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { getOysterMerchantJobs } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import OysterMerchantJobs from '$lib/page-components/oyster/operator/OysterOperatorJobs.svelte';

	async function fetchOysterMerchantJobs() {
		const merchantJobs = await getOysterMerchantJobs($walletStore.address);
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
