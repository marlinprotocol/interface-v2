import type { OysterStore } from '$lib/types/storeTypes';
import { DEFAULT_OYSTER_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

export const oysterStore: Writable<OysterStore> = writable(DEFAULT_OYSTER_STORE);

export function resetOysterStore() {
	oysterStore.set(DEFAULT_OYSTER_STORE);
}
