import type { ChainStore } from '$lib/types/storeTypes';
import { DEFAULT_CHAIN_STORE } from '$lib/utils/constants/storeDefaults';
import { type Writable, writable, derived } from 'svelte/store';
import { environment } from '$lib/data-stores/environment';

export const chainStore: Writable<ChainStore> = writable(DEFAULT_CHAIN_STORE);

export const chainConfigStore = derived([chainStore], ([$chainStore]) => {
	const isChainValid =
		$chainStore.chainId !== null && environment.valid_chains[$chainStore.chainId];
	return isChainValid
		? environment.valid_chains[$chainStore.chainId as number]
		: environment.valid_chains[environment.default_chain_id];
});

/**
 *  Resets the chainStore to its default value.
 */
export function resetChainStore() {
	chainStore.set(DEFAULT_CHAIN_STORE);
}
