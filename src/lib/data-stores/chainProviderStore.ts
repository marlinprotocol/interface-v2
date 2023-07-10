import { loadEnvironment } from '$lib/data-stores/environment';
import type { ChainStore } from '$lib/types/storeTypes';
import { DEFAULT_CHAIN_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

let prevChainId: number | null = null;

export const chainStore: Writable<ChainStore> = writable(DEFAULT_CHAIN_STORE);

// subscription to chainStore enables us to load environment based on chainID
chainStore.subscribe(({ chainId }) => {
	if (chainId === null) return;
	if (prevChainId !== chainId || prevChainId === null) {
		prevChainId = chainId;
		loadEnvironment(chainId);
	}
});

/**
 *  Resets the chainStore to its default value.
 */
export function resetChainStore() {
	chainStore.set(DEFAULT_CHAIN_STORE);
}
