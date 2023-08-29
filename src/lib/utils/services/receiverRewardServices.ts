import {
	addReceiverBalance,
	approvePondTokenForReceiverRewards,
	initiateReceiverRewards,
	updateReceiverTicketReward
} from '$lib/controllers/contractController';
import {
	addRewardBalanceInReceiverRewardsStore,
	initiateReceiverRewardsInReceiverRewardsStore,
	updateAmountApprovedInReceiverRewardsStore,
	updateTicketRewardsInReceiverRewardsStore
} from '$lib/data-stores/receiverRewardsStore';

import type { Address } from '$lib/types/storeTypes';
import type { BigNumber } from 'ethers';
import { withdrawPondFromWalletBalanceStore } from '$lib/data-stores/walletProviderStore';

export async function handleRewardsPondApproval(amount: BigNumber) {
	try {
		await approvePondTokenForReceiverRewards(amount);
		updateAmountApprovedInReceiverRewardsStore(amount);
	} catch (e) {
		throw new Error(`error while approving pond for receiver rewards :>> ${e}`);
	}
}

export async function handleInitiateRewards(rewardBalance: BigNumber, rewardPerEpoch: BigNumber) {
	try {
		await initiateReceiverRewards(rewardBalance, rewardPerEpoch);
		initiateReceiverRewardsInReceiverRewardsStore(rewardBalance, rewardPerEpoch);
		withdrawPondFromWalletBalanceStore(rewardBalance);
	} catch (e) {
		throw new Error(`error while initiating receiver rewards :>> ${e}`);
	}
}

export async function handleAddRewardBalance(address: Address, amount: BigNumber) {
	try {
		await addReceiverBalance(address, amount);
		addRewardBalanceInReceiverRewardsStore(amount);
		withdrawPondFromWalletBalanceStore(amount);
	} catch (e) {
		throw new Error(`error while adding balance to receiver rewards :>> ${e}`);
	}
}

export async function handleUpdateTicketRewards(rewardPerEpoch: BigNumber) {
	try {
		await updateReceiverTicketReward(rewardPerEpoch);
		updateTicketRewardsInReceiverRewardsStore(rewardPerEpoch);
	} catch (e) {
		throw new Error(`error while updating receiver ticket rewards :>> ${e}`);
	}
}
