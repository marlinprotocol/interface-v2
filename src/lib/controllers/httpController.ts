import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import ENVIRONMENT from '$lib/environments/environment';
import type { CPInstances, CPUrlDataModel } from '$lib/types/oysterComponentType';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import { BigNumber } from 'ethers';
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
	}
}

export async function getBridgeContractDetails() {
	const url = ENVIRONMENT.public_bridge_contract_details_url;
	const options = GET_OPTIONS;

	const bridgeContractDetails = await fetchHttpData(url, options);
	if (!bridgeContractDetails) {
		throw new Error('Unable to fetch bridge contract details');
	}
	if (!bridgeContractDetails.ABI) {
		throw new Error('Unable to fetch bridge contract ABI');
	}
	if (!bridgeContractDetails.addresses) {
		throw new Error('Unable to fetch bridge contract addresses');
	} else {
		console.log('bridgeContractDetails', bridgeContractDetails);
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
		console.log(get(contractAbiStore));
		console.log(get(contractAddressStore));
	}
}

// TODO: ask if /spec is expected in the input of control place or we have to explicitly check
export async function getInstancesFromControlPlane(controlPlaneUrl: string) {
	const controlPlaneUrlWithSpecEndpoint = controlPlaneUrl.trim() + '/spec';

	const options = GET_OPTIONS;
	const instances: CPInstances = await fetchHttpData(controlPlaneUrlWithSpecEndpoint, options);
	console.log('controlPlaneUrl :>> ', controlPlaneUrl, instances);

	if (!instances) {
		throw new Error('Unable to fetch instances');
	}
	const { min_rates } = instances;

	// transforming response data so that each object in the array
	// corresponds to a row in the table
	const ret: CPUrlDataModel[] = min_rates.flatMap((region) => {
		return region.rate_cards.map((rate) => {
			return {
				url: controlPlaneUrl,
				instanceType: rate.instance,
				region: region.region,
				vcpu: region.region, //TODO: replace with actual vcpu value
				memory: region.region, // TODO: replace with actual memory value
				min_rate: BigNumber.from(rate.min_rate)
			};
		});
	});
	return ret;
}
