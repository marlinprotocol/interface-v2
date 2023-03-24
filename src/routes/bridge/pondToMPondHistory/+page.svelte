<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import PondToMPondHistoryData from '$lib/page-components/bridge/history/PondToMPondHistoryData.svelte';
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<PondToMPondHistoryData />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
