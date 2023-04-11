<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import InventoryPage from '$lib/page-components/oyster/inventory/InventoryPage.svelte';
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<InventoryPage />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
