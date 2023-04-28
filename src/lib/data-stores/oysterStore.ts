import type { OysterStore } from '$lib/types/storeTypes';
import { BigNumberZero } from '$lib/utils/constants/constants';
import { DEFAULT_OYSTER_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

export const oysterStore: Writable<OysterStore> = writable(DEFAULT_OYSTER_STORE);

export function resetOysterStore() {
	oysterStore.update((state) => {
		return {
			providerData: {
				registered: false
			},
			allMarketplaceData: state.allMarketplaceData,
			jobsData: [],
			allowance: BigNumberZero,
			merchantJobsData: []
		};
	});
}
