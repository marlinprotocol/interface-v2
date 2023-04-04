import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
import { writable } from 'svelte/store';
const defaultValue = DEFAULT_RECEIVER_STAKING_DATA;
// receiver staked data store
export const receiverStakingStore = writable(defaultValue);
/**
 * Reset receiver staked data to its default value.
 */
export function resetReceiverStakingStore() {
    receiverStakingStore.set(defaultValue);
}
//# sourceMappingURL=receiverStakingStore.js.map