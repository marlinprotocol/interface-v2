<script lang="ts">
	import {
		getPondBalanceFromSubgraph,
		getReceiverRewardsDataFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';

	async function loadConnectedData() {
		try {
			const [rewardsData, rewardsAllowance] = await Promise.all([
				getReceiverRewardsDataFromSubgraph($walletStore.address),
				getPondBalanceFromSubgraph($walletStore.address)
			]);
			if (rewardsData.length > 0) {
				receiverRewardsStore.update((value) => {
					return {
						...value,
						amountApproved: rewardsAllowance,
						rewardBalance: rewardsData?.rewardBalance,
						rewardPerEpoch: rewardsData?.rewardPerEpoch,
						epochDuration: rewardsData?.epochDuration
					};
				});
			}
		} catch (error) {
			console.error('Error while loading connected data for receiver rewards', error);
		}
		console.log('receiver reward store is updated with data');
	}

	$: if ($connected && $chainStore.chainId) {
		loadConnectedData();
	}
</script>

<slot />
