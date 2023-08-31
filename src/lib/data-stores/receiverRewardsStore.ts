import type { ReceiverRewardsStore } from '$lib/types/storeTypes';
import { DEFAULT_RECEIVER_REWARDS_STORE } from '$lib/utils/constants/storeDefaults';
import type { BigNumber } from 'ethers';
import { writable, type Writable } from 'svelte/store';

/**
 * receiver staked data store holds signer, epoch data and various balances
 * for receiver staking
 */
export const receiverRewardsStore: Writable<ReceiverRewardsStore> = writable(
	DEFAULT_RECEIVER_REWARDS_STORE
);

/**
 * reset receiverRewardsStore to its default value.
 */
export function resetReceiverRewardsStore(): void {
	receiverRewardsStore.set(DEFAULT_RECEIVER_REWARDS_STORE);
}

export function updateAmountApprovedInReceiverRewardsStore(amountApproved: BigNumber) {
	receiverRewardsStore.update((value) => {
		return {
			...value,
			amountApproved: amountApproved
		};
	});
}

export function updateTicketRewardsInReceiverRewardsStore(rewardPerEpoch: BigNumber) {
	receiverRewardsStore.update((value) => {
		return {
			...value,
			rewardPerEpoch: rewardPerEpoch
		};
	});
}

export function addRewardBalanceInReceiverRewardsStore(amount: BigNumber) {
	receiverRewardsStore.update((value) => {
		return {
			...value,
			amountApproved: value.amountApproved.sub(amount),
			rewardBalance: value.rewardBalance.add(amount)
		};
	});
}

export function initiateReceiverRewardsInReceiverRewardsStore(
	rewardBalance: BigNumber,
	rewardPerEpoch: BigNumber
) {
	receiverRewardsStore.update((value) => {
		return {
			...value,
			rewardPerEpoch: value.rewardPerEpoch.add(rewardPerEpoch),
			amountApproved: value.amountApproved.sub(rewardBalance),
			rewardBalance: value.rewardBalance.add(rewardBalance)
		};
	});
}
