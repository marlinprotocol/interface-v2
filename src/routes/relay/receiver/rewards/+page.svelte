<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { getReceiverRewardsDataFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import RewardsDashboard from '$lib/page-components/receiver-rewards/RewardsDashboard.svelte';
	import { modifyReceiverRewardsData } from '$lib/utils/data-modifiers/subgraphModifier';

	async function loadConnectedData() {
		try {
			const rewardsData = await getReceiverRewardsDataFromSubgraph($walletStore.address);
			const modifiedRewardsData = modifyReceiverRewardsData(rewardsData);
			receiverRewardsStore.set({
				...modifiedRewardsData
			});
		} catch (error) {
			console.error('Error while loading connected data for receiver rewards', error);
		}
		console.log('receiver reward store is updated with data');
	}

	$: if ($connected && $chainStore.chainId) {
		loadConnectedData();
	}
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<RewardsDashboard />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
