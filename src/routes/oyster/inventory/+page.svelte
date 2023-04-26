<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import OysterInventoryPage from '$lib/page-components/oyster/inventory/OysterInventoryPage.svelte';
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<OysterInventoryPage />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
