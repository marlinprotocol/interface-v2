import { loadEnvironment } from '$lib/data-stores/environment';
import type { ChainStore } from '$lib/types/storeTypes';
import { DEFAULT_CHAIN_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';
import { environmentStore } from '$lib/data-stores/environment';
import type { Environment } from '$lib/types/environmentTypes';

let prevChainId: number | null = null;
let environment: Environment;
environmentStore.subscribe((value) => {
	environment = value;
});
// svelte store
export const chainStore: Writable<ChainStore> = writable(DEFAULT_CHAIN_STORE);

// load environment based on chainID
chainStore.subscribe(({ chainId }) => {
	if (chainId === null) return;
	if (
		prevChainId !== chainId ||
		(prevChainId === null && environment.valid_chain_ids.includes(chainId))
	) {
		prevChainId = chainId;
		loadEnvironment(chainId);
	}
});

/**
 *  Resets the chainStore to its default value.
 */
export function resetChainProviderStore() {
	chainStore.set(DEFAULT_CHAIN_STORE);
}
