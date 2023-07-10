import type { ReceiverStakingData } from '$lib/types/storeTypes';
import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

/**
 * receiver staked data store holds signer, epoch data and various balances
 * for receiver staking
 */
export const receiverStakingStore: Writable<ReceiverStakingData> = writable(
	DEFAULT_RECEIVER_STAKING_DATA
);

/**
 * reset receiverStakingStore to its default value.
 */
export function resetReceiverStakingStore(): void {
	receiverStakingStore.set(DEFAULT_RECEIVER_STAKING_DATA);
}
