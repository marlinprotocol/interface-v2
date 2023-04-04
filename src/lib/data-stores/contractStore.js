import { DEFAULT_CONTRACT_ABI_STORE, DEFAULT_CONTRACT_ADDRESS_STORE } from '$lib/utils/constants/storeDefaults';
import { writable } from 'svelte/store';
export const contractAddressStore = writable(DEFAULT_CONTRACT_ADDRESS_STORE);
export const contractAbiStore = writable(DEFAULT_CONTRACT_ABI_STORE);
//# sourceMappingURL=contractStore.js.map