<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { fetchProviderDetailsFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import OysterDashboard from '$lib/page-components/oyster/OysterDashboard.svelte';

	async function fetchProviderDetails() {
		const providerDetails = await fetchProviderDetailsFromSubgraph($walletStore.address);

		// updating the oyster store with cpURL and registered
		if (providerDetails !== null) {
			oysterStore.update((value) => {
				return {
					...value,
					registered: true,
					cpURL: providerDetails.cp
				};
			});
		}
	}

	$: if ($connected) {
		fetchProviderDetails();
	}
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<OysterDashboard />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
