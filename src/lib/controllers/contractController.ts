import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import ENVIRONMENT from '$lib/environments/environment';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import { get } from 'svelte/store';

export async function getContractDetails() {
	const url = ENVIRONMENT.public_contract_details_url;
	const options = GET_OPTIONS;
	// TODO: add type for contractDetails
	const contractDetails = await fetchHttpData(url, options);
	if (!contractDetails) {
		throw new Error('Unable to fetch contract details');
	}
	if (!contractDetails.ABI) {
		throw new Error('Unable to fetch contract ABI');
	}
	if (!contractDetails.addresses) {
		throw new Error('Unable to fetch contract addresses');
	} else {
		contractAbiStore.set(contractDetails?.ABI);
		contractAddressStore.set(contractDetails?.addresses);
		console.log('contractAbiStore', get(contractAbiStore));
		console.log('contractAddressStore', get(contractAddressStore));
	}
}
