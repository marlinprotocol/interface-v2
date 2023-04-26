<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import OysterMarketplacePage from '$lib/page-components/oyster/marketplace/OysterMarketplacePage.svelte';
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<OysterMarketplacePage />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
