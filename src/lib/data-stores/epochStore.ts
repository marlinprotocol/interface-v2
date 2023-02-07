import { getCurrentEpoch } from '$lib/controllers/subgraphController';
import type { EpochStore } from '$lib/types/storeTypes';
import { DEFAULT_EPOCH_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

let defaultEpoch: EpochStore = DEFAULT_EPOCH_STORE;

// receiver staked data store
export const epochStore: Writable<EpochStore> = writable(defaultEpoch);

try {
	const epochData = await getCurrentEpoch();
	epochStore.set(epochData);
} catch (e) {
	console.log('Error fetching epoch data', e);
}

/**
 * Reset epoch to its default value.
 */
export function resetEpochStore(): void {
	epochStore.set(defaultEpoch);
}
