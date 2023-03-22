<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import MPondToPondHistoryData from '$lib/page-components/bridge/history/MPondToPondHistoryData.svelte';
</script>

<div class="py-10">
	{#if $chainStore.isValidChain}
		<MPondToPondHistoryData />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
