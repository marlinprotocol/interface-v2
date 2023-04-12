<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import OysterHistoryPage from '$lib/page-components/oyster/history/OysterHistoryPage.svelte';
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<OysterHistoryPage />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
