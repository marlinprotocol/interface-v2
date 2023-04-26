<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { getAllProvidersDetailsFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import OysterMarketplacePage from '$lib/page-components/oyster/marketplace/OysterMarketplacePage.svelte';

	async function init() {
		const allMarketplaceData = await getAllProvidersDetailsFromSubgraph();
		console.log('Oyster Data Fetch - allMarketplaceData:>> ', allMarketplaceData);
		oysterStore.update((store) => {
			return {
				...store,
				allMarketplaceData
			};
		});
	}

	init();
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<OysterMarketplacePage />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
