<script lang="ts">
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import BridgeDashboard from '$lib/page-components/bridge/BridgeDashboard.svelte';
	import NetworkPrompt from '$lib/page-components/prompts/NetworkPrompt.svelte';
</script>

<div class="py-10">
	{#if $chainStore.isValidChain}
		<BridgeDashboard />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
