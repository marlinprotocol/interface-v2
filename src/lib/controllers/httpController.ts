import type { Address } from '$lib/types/storeTypes';
import type { Bytes } from 'ethers';
import type { CPInstances } from '$lib/types/oysterComponentType';
import type { ChainConfig } from '$lib/types/environmentTypes';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';

let chainConfig: ChainConfig;

chainConfigStore.subscribe((value) => {
	chainConfig = value;
	console.log('chainConfigStore', chainConfig);
});

export async function getContractDetails() {
	const contractDetailsUrl = chainConfig.contract_details_url;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(contractDetailsUrl, options);

	if (!response) {
		console.log('error from getContractDetails');
		throw new Error('Contract details not found');
	}
	if (!response.ABI) {
		console.log('error from getContractDetails');
		throw new Error('Contract ABI not found');
	}
	if (!response.addresses) {
		console.log('error from getContractDetails');
		throw new Error('Contract addresses not found');
	}
	return response;
}

export async function getBridgeContractDetails() {
	const bridgeContractDetailsUrl = chainConfig.bridge_contract_details_url;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(bridgeContractDetailsUrl, options);

	if (!response) {
		throw new Error('Bridge contract details not found');
	}
	if (!response.ABI) {
		throw new Error('Bridge contract ABI not found');
	}
	if (!response.addresses) {
		throw new Error('Bridge contract addresses not found');
	}

	return response;
}

export async function getInstancesFromControlPlaneUsingCpUrl(controlPlaneUrl: string) {
	const controlPlaneDetailsEndpoint =
		chainConfig.oyster_urls.instances_using_cp_url + encodeURIComponent(controlPlaneUrl.trim());
	const options = GET_OPTIONS;
	const response: CPInstances = await fetchHttpData(controlPlaneDetailsEndpoint, options);

	if (!response || response.error) {
		console.log('error from getInstancesFromControlPlaneUsingCpUrl');
		throw new Error('Unable to fetch instances');
	}
	return response;
}

export async function getInstancesFromControlPlaneUsingOperatorAddress(operatorAddress: Address) {
	const controlPlaneDetailsEndpoint =
		chainConfig.oyster_urls.instances_using_operator_address + operatorAddress.trim();
	const options = GET_OPTIONS;
	const response: CPInstances = await fetchHttpData(controlPlaneDetailsEndpoint, options);

	if (!response || response.error) {
		console.log('error from getInstancesFromControlPlaneUsingOperatorAddress');
		throw new Error('Unable to fetch instances');
	}
	return response;
}

export async function getProvidersNameJSON() {
	const providerNameEndPoint = chainConfig.oyster_urls.provider_names_url;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(providerNameEndPoint, options);

	if (!response || response.error) {
		console.log('no getProvidersNameJSON');
		return {};
	}
	return response;
}

export async function getProvidersInstancesJSON() {
	const providerNameEndPoint = chainConfig.oyster_urls.provider_instances_url;
	const options = GET_OPTIONS;
	const response: Record<string, CPInstances> = await fetchHttpData(providerNameEndPoint, options);
	if (!response || response.error) {
		console.log('no getProvidersInstancesJSON');
		return {};
	}
	return response;
}

export async function getJobStatuses(userAddress: Address) {
	const jobStatusEndpoint = chainConfig.oyster_urls.job_status_url + userAddress;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(jobStatusEndpoint, options);
	if (!response || response.error) {
		console.log('no getJobStatuses');
		return [];
	}
	return response;
}

export async function refreshJobStatusForJobId(jobId: Bytes) {
	const refreshJobStatusEndpoint = chainConfig.oyster_urls.job_refresh_url + jobId;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(refreshJobStatusEndpoint, options);
	if (!response || response.error) {
		console.log('no refreshJobStatusForJobId');
		return [];
	}
	return response;
}
