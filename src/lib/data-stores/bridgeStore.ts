import type { BridgeStore } from '$lib/types/storeTypes';
import { DEFAULT_BRIDGE_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

export const bridgeStore: Writable<BridgeStore> = writable(DEFAULT_BRIDGE_STORE);
