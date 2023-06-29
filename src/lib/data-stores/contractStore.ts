import type { ContractAddress, ContractAbi } from '$lib/types/storeTypes';
import {
	DEFAULT_CONTRACT_ABI_STORE,
	DEFAULT_CONTRACT_ADDRESS_STORE
} from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

/**
 * store containing contract addresses of almost all the contracts used in the app
 */
export const contractAddressStore: Writable<ContractAddress> = writable(
	DEFAULT_CONTRACT_ADDRESS_STORE
);

/**
 * store containing contract abis of almost all the contracts used in the app
 */
export const contractAbiStore: Writable<ContractAbi> = writable(DEFAULT_CONTRACT_ABI_STORE);
