import type { Address, ContractAddress } from '$lib/types/storeTypes';
import type { ChainConfig, TokenMetadata } from '$lib/types/environmentTypes';
import {
	addReceiverBalance,
	initiateReceiverRewards,
	updateReceiverTicketReward
} from '$lib/controllers/contract/receiverRewards';
import {
	addRewardBalanceInReceiverRewardsStore,
	initiateReceiverRewardsInReceiverRewardsStore,
	updateAmountApprovedInReceiverRewardsStore,
	updateTicketRewardsInReceiverRewardsStore
} from '$lib/data-stores/receiverRewardsStore';

import { approveToken } from '$lib/controllers/contract/token';
import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
import { contractAddressStore } from '$lib/data-stores/contractStore';
import { withdrawPondFromWalletBalanceStore } from '$lib/data-stores/walletProviderStore';

let chainConfig: ChainConfig;
let contractAddresses: ContractAddress;
chainConfigStore.subscribe((value) => {
	chainConfig = value;
});
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

export async function handleRewardsPondApproval(amount: bigint) {
	try {
		if (chainConfig.tokens.POND === undefined) {
			throw new Error('chain config or contract addresses not found');
		}
		await approveToken(chainConfig.tokens.POND, amount, contractAddresses.POND);
		updateAmountApprovedInReceiverRewardsStore(amount);
	} catch (e) {
		throw new Error(`error while approving pond for receiver rewards :>> ${e}`);
	}
}

export async function handleInitiateRewards(rewardBalance: bigint, rewardPerEpoch: bigint) {
	try {
		await initiateReceiverRewards(rewardBalance, rewardPerEpoch);
		initiateReceiverRewardsInReceiverRewardsStore(rewardBalance, rewardPerEpoch);
		withdrawPondFromWalletBalanceStore(rewardBalance);
	} catch (e) {
		throw new Error(`error while initiating receiver rewards :>> ${e}`);
	}
}

export async function handleAddRewardBalance(address: Address, amount: bigint) {
	try {
		await addReceiverBalance(address, amount);
		addRewardBalanceInReceiverRewardsStore(amount);
		withdrawPondFromWalletBalanceStore(amount);
	} catch (e) {
		throw new Error(`error while adding balance to receiver rewards :>> ${e}`);
	}
}

export async function handleUpdateTicketRewards(rewardPerEpoch: bigint) {
	try {
		await updateReceiverTicketReward(rewardPerEpoch);
		updateTicketRewardsInReceiverRewardsStore(rewardPerEpoch);
	} catch (e) {
		throw new Error(`error while updating receiver ticket rewards :>> ${e}`);
	}
}
