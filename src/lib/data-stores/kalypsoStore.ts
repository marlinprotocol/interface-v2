import type { KalypsoStore } from '$lib/types/storeTypes';
import { DEFAULT_KALYPSO_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

export const kalypsoStore: Writable<KalypsoStore> = writable(DEFAULT_KALYPSO_STORE);
