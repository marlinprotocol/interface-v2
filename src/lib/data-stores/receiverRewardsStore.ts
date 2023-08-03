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
