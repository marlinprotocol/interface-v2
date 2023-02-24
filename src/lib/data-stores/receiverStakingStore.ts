import type { ReceiverStakingData } from '$lib/types/storeTypes';
import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

const defaultValue = DEFAULT_RECEIVER_STAKING_DATA;
// receiver staked data store
export const receiverStakingStore: Writable<ReceiverStakingData> = writable(defaultValue);

/**
 * Reset receiver staked data to its default value.
 */
export function resetReceiverStakingStore(): void {
	receiverStakingStore.set(defaultValue);
}
