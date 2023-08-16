import type { ContractAbi } from '$lib/types/storeTypes';
import { DEFAULT_CONTRACT_ABI_STORE } from '$lib/utils/constants/storeDefaults';
import { get, writable, type Writable, derived } from 'svelte/store';
import { environment } from '$lib/data-stores/environment';
import { chainStore } from '$lib/data-stores/chainProviderStore';

/**
 * store containing contract addresses of almost all the contracts used in the app
 */
export const contractAddressStore = derived([chainStore], ([$chainStore]) => {
	const isChainValid =
		$chainStore.chainId !== null && environment.valid_chains[$chainStore.chainId];
	return isChainValid
		? environment.valid_chains[$chainStore.chainId as number].contract_addresses
		: environment.valid_chains[environment.default_chain_id].contract_addresses;
});

/**
 * store containing contract abis of almost all the contracts used in the app
 */
export const contractAbiStore: Writable<ContractAbi> = writable(DEFAULT_CONTRACT_ABI_STORE);

/**
 * updates the contract stores with the given ABIS.
 * Note, if working with bridge contracts, use updateContractStoresWithBridge instead
 * @param addresses
 * @param ABIS
 */
export function updateContractStoresWithoutBridge(ABIS: any) {
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
	console.log('contractAddressStore :>> ', get(contractAddressStore));
	console.log('contractAbiStore :>> ', get(contractAbiStore));
}

/**

 * updates the contract stores with the given ABIS explicitly for bridge contract.
 * Note, if working with other contracts, use updateContractStoresWithoutBridge instead
 * @param addresses
 * @param ABIS
 */
export function updateContractStoresWithBridge(ABIS: any) {
	contractAbiStore.update((value) => {
		return {
			...value,
			Bridge: ABIS.Bridge
		};
	});
}
