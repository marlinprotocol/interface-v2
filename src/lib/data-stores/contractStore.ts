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

/**
 * updates the contract stores with the given addresees and ABIS.
 * Note, if working with bridge contracts, use updateContractStoresWithBridge instead
 * @param addresses
 * @param ABIS
 */
export function updateContractStoresWithoutBridge(addresses: any, ABIS: any) {
	contractAbiStore.update((value) => {
		return {
			...value,
			ClusterRegistry: ABIS.ClusterRegistry,
			ERC20: ABIS.ERC20,
			EpochSelector: ABIS.EpochSelector,
			MPond: ABIS.MPond,
			ReceiverStaking: ABIS.ReceiverStaking,
			RewardDelegators: ABIS.RewardDelegators,
			StakeManager: ABIS.StakeManager
		};
	});
	contractAddressStore.update((value) => {
		return {
			...value,
			ClusterRegistry: addresses.ClusterRegistry,
			ClusterRewards: addresses.ClusterRewards,
			EpochSelector: addresses.EpochSelector,
			ReceiverStaking: addresses.ReceiverStaking,
			RewardDelegators: addresses.RewardDelegators,
			StakeManager: addresses.StakeManager,
			tokens: addresses.tokens
		};
	});
}

/**

 * updates the contract stores with the given addresees and ABIS explicitly for bridge contract.
 * Note, if working with other contracts, use updateContractStoresWithoutBridge instead
 * @param addresses
 * @param ABIS
 */
export function updateContractStoresWithBridge(addresses: any, ABIS: any) {
	contractAbiStore.update((value) => {
		return {
			...value,
			Bridge: ABIS.Bridge
		};
	});
	contractAddressStore.update((value) => {
		return {
			...value,
			Bridge: addresses.bridge,
			tokens: addresses.tokens
		};
	});
}
