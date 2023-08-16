import type { OysterStore } from '$lib/types/storeTypes';
import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
import { DEFAULT_OYSTER_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

export const oysterStore: Writable<OysterStore> = writable(DEFAULT_OYSTER_STORE);

// we keep the marketplace data untouched as it does not depend on the wallet address and is loaded
// regardless of whether the user is connected or not.
// NOTE: if the user switches network, the marketplace data is overwritten
/**
 * Resets the oysterStore to its default value. (read file comments)
 */
export function resetOysterStore() {
	oysterStore.update((state) => {
		return {
			...DEFAULT_OYSTER_STORE,
			providerData: {
				registered: false,
				data: undefined
			},
			allMarketplaceData: state.allMarketplaceData,
			jobsData: [],
			allowance: BIG_NUMBER_ZERO,
			merchantJobsData: [],
			marketplaceLoaded: true
		};
	});
}
