import { DEFAULT_CHAIN_STORE } from '$lib/utils/constants/storeDefaults';
import { writable } from 'svelte/store';
// svelte store
export const chainStore = writable(DEFAULT_CHAIN_STORE);
/**
 *  Resets the chainStore to its default value.
 */
export function resetChainProviderStore() {
    chainStore.set(DEFAULT_CHAIN_STORE);
}
//# sourceMappingURL=chainProviderStore.js.map