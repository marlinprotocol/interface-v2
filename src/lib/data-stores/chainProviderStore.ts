import type { ChainStore } from '$lib/types/storeTypes';
import { DEFAULT_CHAIN_STORE } from '$lib/utils/constants/storeDefaults';
import { type Writable, writable, derived } from 'svelte/store';
import { environmentStore } from './environment';

export const chainStore: Writable<ChainStore> = writable(DEFAULT_CHAIN_STORE);

export const chainConfigStore = derived(
	[chainStore, environmentStore],
	([$chainStore, $environmentStore]) => {
		const isChainValid =
			$chainStore.chainId !== null && $environmentStore.valid_chains[$chainStore.chainId];
		return isChainValid
			? $environmentStore.valid_chains[$chainStore.chainId as number]
			: $environmentStore.valid_chains[$environmentStore.default_chain_id];
	}
);

/**
 *  Resets the chainStore to its default value.
 */
export function resetChainStore() {
	chainStore.set(DEFAULT_CHAIN_STORE);
}
