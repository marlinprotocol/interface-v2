<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import BridgeDashboard from '$lib/page-components/bridge/BridgeDashboard.svelte';
</script>

<div class="py-10">
	{#if $chainStore.isValidChain}
		<BridgeDashboard />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
