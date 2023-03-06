<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import StakeDashboard from '$lib/page-components/receiver-staking/StakeDashboard.svelte';
</script>

<div class="py-10">
	{#if $chainStore.isValidChain}
		<StakeDashboard />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
