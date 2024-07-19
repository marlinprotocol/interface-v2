import type { ReceiverRewardsStore } from '$lib/types/storeTypes';
import { DEFAULT_RECEIVER_REWARDS_STORE } from '$lib/utils/constants/storeDefaults';

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

export function updateAmountApprovedInReceiverRewardsStore(amountApproved: bigint) {
	receiverRewardsStore.update((value) => {
		return {
			...value,
			amountApproved: amountApproved
		};
	});
}

export function updateTicketRewardsInReceiverRewardsStore(rewardPerEpoch: bigint) {
	receiverRewardsStore.update((value) => {
		return {
			...value,
			rewardPerEpoch: rewardPerEpoch
		};
	});
}

export function addRewardBalanceInReceiverRewardsStore(amount: bigint) {
	receiverRewardsStore.update((value) => {
		return {
			...value,
			amountApproved: value.amountApproved - amount,
			rewardBalance: value.rewardBalance + amount
		};
	});
}

export function initiateReceiverRewardsInReceiverRewardsStore(
	rewardBalance: bigint,
	rewardPerEpoch: bigint
) {
	receiverRewardsStore.update((value) => {
		return {
			...value,
			rewardPerEpoch: value.rewardPerEpoch + rewardPerEpoch,
			amountApproved: value.amountApproved - rewardBalance,
			rewardBalance: value.rewardBalance + rewardBalance
		};
	});
}
