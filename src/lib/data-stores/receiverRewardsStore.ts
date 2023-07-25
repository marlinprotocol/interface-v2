import type { ReceiverRewardsData } from '$lib/types/storeTypes';
import { DEFAULT_RECEIVER_REWARDS_DATA } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

/**
 * receiver staked data store holds signer, epoch data and various balances
 * for receiver staking
 */
export const receiverRewardsStore: Writable<ReceiverRewardsData> = writable(
	DEFAULT_RECEIVER_REWARDS_DATA
);

/**
 * reset receiverRewardsStore to its default value.
 */
export function resetReceiverRewardsStore(): void {
	receiverRewardsStore.set(DEFAULT_RECEIVER_REWARDS_DATA);
}
