import { chainStore } from '$lib/data-stores/chainProviderStore';
import { derived } from 'svelte/store';
import { environment } from '$lib/data-stores/environment';

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
