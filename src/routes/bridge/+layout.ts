import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import { addToast } from '$lib/data-stores/toastStore';
import ENVIRONMENT from '$lib/environments/environment';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { get } from 'svelte/store';
import type { LayoutLoad } from '../$types';

export const load = (async ({ fetch }) => {
	try {
		const response = await fetch(ENVIRONMENT.public_bridge_contract_details_url, GET_OPTIONS);

		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

		const bridgeContractDetails = await response.json();

		if (!bridgeContractDetails) {
			throw new Error('Bridge contract details not found');
		}
		if (!bridgeContractDetails.ABI) {
			throw new Error('Bridge contract ABI details not found');
		}
		if (!bridgeContractDetails.addresses) {
			throw new Error('Bridge contract address details not found');
		}
		contractAbiStore.update((value) => {
			return {
				...value,
				Bridge: bridgeContractDetails.ABI.Bridge
			};
		});
		contractAddressStore.update((value) => {
			return {
				...value,
				Bridge: bridgeContractDetails.addresses.bridge,
				tokens: bridgeContractDetails.addresses.tokens
			};
		});
		console.log('contractAbiStore', get(contractAbiStore));
		console.log('contractAddressStore', get(contractAddressStore));
	} catch (error) {
		console.error(error);
		addToast({
			message: 'Error fetching bridge contract details. Please try again later.',
			variant: 'error'
		});
		return { error: 'Unable to fetch contract details' };
	}
}) satisfies LayoutLoad;
