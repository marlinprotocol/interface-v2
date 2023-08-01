<script lang="ts">
	import {
		getApprovedReceiverRewardAllowancesFromSubgraph,
		getReceiverRewardsDataFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { BigNumber } from 'ethers';

	async function loadConnectedData() {
		try {
			const [rewardsData, rewardsAllowance] = await Promise.all([
				getReceiverRewardsDataFromSubgraph($walletStore.address),
				getApprovedReceiverRewardAllowancesFromSubgraph($walletStore.address)
			]);

			if (rewardsData) {
				let startTime = rewardsData.params.find(
					(param: Record<'id' | 'value', string>) => param.id === 'START_TIME'
				).value;
				let epochLength = rewardsData.params.find(
					(param: Record<'id' | 'value', string>) => param.id === 'EPOCH_LENGTH'
				).value;

				receiverRewardsStore.update((value) => {
					value.startTime = parseInt(startTime);
					value.epochDuration = parseInt(epochLength);
					value.rewardBalance = BigNumber.from(rewardsData.receiverRewards[0].amount);
					value.rewardPerEpoch = BigNumber.from(rewardsData.receiverRewards[0].rewardPerEpoch);
					return value;
				});
			}
			receiverRewardsStore.update((value) => {
				value.amountApproved = rewardsAllowance;
				return value;
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

<slot />
