import type { ContractAbiStore, ContractAddressStore } from '$lib/types/storeTypes';
import {
	DEFAULT_CONTRACT_ABI_STORE,
	DEFAULT_CONTRACT_ADDRESS_STORE
} from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

export const contractAddressStore: Writable<ContractAddressStore> = writable(
	DEFAULT_CONTRACT_ADDRESS_STORE
);
export const contractAbiStore: Writable<ContractAbiStore> = writable(DEFAULT_CONTRACT_ABI_STORE);
