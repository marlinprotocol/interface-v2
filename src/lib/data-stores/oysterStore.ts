import type { OysterStore } from '$lib/types/storeTypes';
import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
import { DEFAULT_OYSTER_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

export const oysterStore: Writable<OysterStore> = writable(DEFAULT_OYSTER_STORE);

export function resetOysterStore() {
	oysterStore.update((state) => {
		return {
			...DEFAULT_OYSTER_STORE,
			providerData: {
				registered: false
			},
			allMarketplaceData: state.allMarketplaceData,
			jobsData: [],
			allowance: BIG_NUMBER_ZERO,
			merchantJobsData: [],
			marketplaceLoaded: true
		};
	});
}
