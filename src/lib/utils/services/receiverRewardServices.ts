import {
	addReceiverBalance,
	approvePondTokenForReceiverRewards,
	initiateReceiverRewards,
	updateReceiverTicketReward
} from '$lib/controllers/contractController';

import type { Address } from '$lib/types/storeTypes';
import type { BigNumber } from 'ethers';
import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
import { walletBalance } from '$lib/data-stores/walletProviderStore';

export async function handleRewardsPondApproval(amount: BigNumber) {
	try {
		await approvePondTokenForReceiverRewards(amount);
		receiverRewardsStore.update((value) => {
			return {
				...value,
				amountApproved: amount
			};
		});
	} catch (e) {
		throw new Error(`error while approving pond for receiver rewards :>> ${e}`);
	}
}

export async function handleInitiateRewards(rewardBalance: BigNumber, rewardPerEpoch: BigNumber) {
	try {
		await initiateReceiverRewards(rewardBalance, rewardPerEpoch);
		receiverRewardsStore.update((value) => {
			return {
				...value,
				rewardPerEpoch: value.rewardPerEpoch.add(rewardPerEpoch),
				amountApproved: value.amountApproved.sub(rewardBalance),
				rewardBalance: value.rewardBalance.add(rewardBalance)
			};
		});
		walletBalance.update((value) => {
			return {
				...value,
				pond: value.pond.sub(rewardBalance)
			};
		});
	} catch (e) {
		throw new Error(`error while initiating receiver rewards :>> ${e}`);
	}
}

export async function handleAddRewardBalance(address: Address, amount: BigNumber) {
	try {
		await addReceiverBalance(address, amount);
		receiverRewardsStore.update((value) => {
			return {
				...value,
				amountApproved: value.amountApproved.sub(amount),
				rewardBalance: value.rewardBalance.add(amount)
			};
		});
		walletBalance.update((value) => {
			return {
				...value,
				pond: value.pond.sub(amount)
			};
		});
	} catch (e) {
		throw new Error(`error while adding balance to receiver rewards :>> ${e}`);
	}
}

export async function handleUpdateTicketRewards(rewardPerEpoch: BigNumber) {
	try {
		await updateReceiverTicketReward(rewardPerEpoch);
		receiverRewardsStore.update((value) => {
			return {
				...value,
				rewardPerEpoch: rewardPerEpoch
			};
		});
	} catch (e) {
		throw new Error(`error while updating receiver ticket rewards :>> ${e}`);
	}
}
