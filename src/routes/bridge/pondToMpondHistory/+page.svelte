<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import PondToMpondHistoryData from '$lib/page-components/bridge/history/PondToMpondHistoryData.svelte';
</script>

<div class="py-10">
	{#if $chainStore.isValidChain}
		<PondToMpondHistoryData />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
