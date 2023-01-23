import type { ChainStore } from '$lib/types/storeTypes';
import { DEFAULT_CHAIN_STORE } from '$lib/utils/constants/storeConstants';
import { writable, type Writable } from 'svelte/store';

// svelte store
export const chainStore: Writable<ChainStore> = writable(DEFAULT_CHAIN_STORE);

/**
 *  Resets the chainStore to its default value.
 */
export function resetChainProviderStore() {
	chainStore.set(DEFAULT_CHAIN_STORE);
}
