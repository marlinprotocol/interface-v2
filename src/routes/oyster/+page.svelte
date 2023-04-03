<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import OysterDashboard from '$lib/page-components/oyster/OysterDashboard.svelte';
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<OysterDashboard />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
