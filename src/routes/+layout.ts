import { subgraphQueryWrapper } from '$lib/controllers/subgraphController';
import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import { environmentStore } from '$lib/data-stores/environment';
import { oysterStore } from '$lib/data-stores/oysterStore';
import { addToast } from '$lib/data-stores/toastStore';
import { GET_OPTIONS } from '$lib/utils/constants/constants.js';
import { regionNameConstants } from '$lib/utils/constants/regionNameConstants';
import { QUERY_TO_GET_ALL_PROVIDERS_DATA } from '$lib/utils/constants/subgraphQueries';
import { getOysterProvidersModified } from '$lib/utils/data-modifiers/oysterModifiers';
import { addRegionNameToMarketplaceData } from '$lib/utils/helpers/oysterHelpers';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

let contractDetailsUrl = '';
let enclavesContractSubgraphUrl = '';
environmentStore.subscribe((value) => {
	contractDetailsUrl = value.public_contract_details_url;
	enclavesContractSubgraphUrl = value.public_enclaves_contract_subgraph_url;
});

export const trailingSlash = 'always';
export const prerender = true;
export const ssr = false;

export const load = (async ({ fetch }) => {
	try {
		const response = await fetch(contractDetailsUrl, GET_OPTIONS);

		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

		const contractDetails = await response.json();
		if (!contractDetails) {
			throw new Error('Contract details not found');
		}
		if (!contractDetails.ABI) {
			throw new Error('Contract ABI details not found');
		}
		if (!contractDetails.addresses) {
			throw new Error('Contract address details not found');
		}

		// updating stores instead of returning data as we don't need to show this data explicitly
		contractAbiStore.update((value) => {
			return {
				...value,
				ClusterRegistry: contractDetails.ABI.ClusterRegistry,
				ERC20: contractDetails.ABI.ERC20,
				EpochSelector: contractDetails.ABI.EpochSelector,
				MPond: contractDetails.ABI.MPond,
				ReceiverStaking: contractDetails.ABI.ReceiverStaking,
				RewardDelegators: contractDetails.ABI.RewardDelegators,
				StakeManager: contractDetails.ABI.StakeManager
			};
		});
		contractAddressStore.update((value) => {
			return {
				...value,
				ClusterRegistry: contractDetails.addresses.ClusterRegistry,
				ClusterRewards: contractDetails.addresses.ClusterRewards,
				EpochSelector: contractDetails.addresses.EpochSelector,
				ReceiverStaking: contractDetails.addresses.ReceiverStaking,
				RewardDelegators: contractDetails.addresses.RewardDelegators,
				StakeManager: contractDetails.addresses.StakeManager,
				tokens: contractDetails.addresses.tokens
			};
		});
		console.log('contractAbiStore', get(contractAbiStore));
		console.log('contractAddressStore', get(contractAddressStore));

		const query = QUERY_TO_GET_ALL_PROVIDERS_DATA;
		const options: RequestInit = subgraphQueryWrapper(query, {});

		const response2 = await fetch(enclavesContractSubgraphUrl, options);

		if (!response2.ok) throw new Error(`HTTP error: ${response2.status}`);

		const result = await response2.json();
		const providers = result['data']?.providers;
		if (!providers?.length) {
			throw new Error('No providers found');
		}
		if (result?.['errors']) {
			throw new Error('Error fetching providers details from subgraph');
		}

		const allMarketplaceData = await getOysterProvidersModified(providers);

		// mapping region names to region ids, may be we can do this in subgraph itself
		const allMarketplaceDataWithRegionName = addRegionNameToMarketplaceData(
			allMarketplaceData,
			regionNameConstants
		);

		// updating stores instead of returning data as we don't need to show this data explicitly
		oysterStore.update((store) => {
			return {
				...store,
				allMarketplaceData: allMarketplaceDataWithRegionName,
				marketplaceLoaded: true
			};
		});
	} catch (error) {
		console.error(error);
		addToast({
			message: 'Error fetching contract details. Please try again later.',
			variant: 'error'
		});
		return { error: 'Unable to fetch contract details' };
	}
}) satisfies LayoutLoad;
