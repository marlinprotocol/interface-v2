import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import { addToast } from '$lib/data-stores/toastStore';
import { GET_OPTIONS } from '$lib/utils/constants/constants.js';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { environmentStore } from '$lib/data-stores/environment';

let contractDetailsUrl = '';
environmentStore.subscribe((value) => {
	contractDetailsUrl = value.public_contract_details_url;
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
	} catch (error) {
		console.error(error);
		addToast({
			message: 'Error fetching contract details. Please try again later.',
			variant: 'error'
		});
		return { error: 'Unable to fetch contract details' };
	}
}) satisfies LayoutLoad;
