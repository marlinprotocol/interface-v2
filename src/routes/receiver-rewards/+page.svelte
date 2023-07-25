<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import RewardsDashboard from '$lib/page-components/receiver-rewards/RewardsDashboard.svelte';
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<RewardsDashboard />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
