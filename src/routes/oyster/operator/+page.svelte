<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { getProviderDetailsFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { oysterStore, resetOysterStore } from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import OysterDashboard from '$lib/page-components/oyster/OysterDashboard.svelte';

	async function fetchProviderDetails() {
		const providerDetails = await getProviderDetailsFromSubgraph($walletStore.address);
		// updating the oyster store with provider details and registered
		if (providerDetails !== null) {
			oysterStore.update((value) => {
				return {
					...value,
					providerData: {
						data: providerDetails,
						registered: true
					}
				};
			});
		} else {
			resetOysterStore();
		}
	}

	$: if ($connected && $walletStore.address) {
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
