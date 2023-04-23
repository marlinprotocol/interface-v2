<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import OysterOperatorHistory from '$lib/page-components/oyster/operator/OysterOperatorHistory.svelte';
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<OysterOperatorHistory />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
