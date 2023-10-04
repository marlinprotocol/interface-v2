import type { Address } from '$lib/types/storeTypes';
import type { BytesLike } from 'ethers';
import type { CPInstances } from '$lib/types/oysterComponentType';
import type { ChainConfig } from '$lib/types/environmentTypes';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import { environment } from '$lib/data-stores/environment';
import { OYSTER_URL_ENDPOINTS } from '$lib/utils/constants/oysterConstants';

let chainConfig: ChainConfig;

chainConfigStore.subscribe((value) => {
	chainConfig = value;
});

export async function getInstancesFromControlPlaneUsingCpUrl(controlPlaneUrl: string) {
	const controlPlaneDetailsEndpoint =
		environment.backend_url +
		OYSTER_URL_ENDPOINTS.instances_using_cp_url +
		encodeURIComponent(controlPlaneUrl.trim());
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
		environment.backend_url +
		OYSTER_URL_ENDPOINTS.instances_using_operator_address +
		chainConfig.backend_network_id +
		'/' +
		operatorAddress.trim();
	const options = GET_OPTIONS;
	const response: CPInstances = await fetchHttpData(controlPlaneDetailsEndpoint, options);

	if (!response || response.error) {
		console.log('error from getInstancesFromControlPlaneUsingOperatorAddress');
		throw new Error('Unable to fetch instances');
	}
	return response;
}

export async function getProvidersNameJSON() {
	const providerNameEndPoint = environment.backend_url + OYSTER_URL_ENDPOINTS.provider_names_url;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(providerNameEndPoint, options);

	if (!response || response.error) {
		console.log('no getProvidersNameJSON');
		return {};
	}
	return response;
}

export async function getProvidersInstancesJSON() {
	const providerNameEndPoint =
		environment.backend_url +
		OYSTER_URL_ENDPOINTS.provider_instances_url +
		chainConfig.backend_network_id;
	const options = GET_OPTIONS;
	const response: Record<string, CPInstances> = await fetchHttpData(providerNameEndPoint, options);
	if (!response || response.error) {
		console.log('no getProvidersInstancesJSON');
		return {};
	}
	return response;
}

export async function getJobStatuses(userAddress: Address) {
	const jobStatusEndpoint =
		environment.backend_url +
		OYSTER_URL_ENDPOINTS.job_status_url +
		chainConfig.backend_network_id +
		'/' +
		userAddress;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(jobStatusEndpoint, options);
	if (!response || response.error) {
		console.log('no getJobStatuses');
		return [];
	}
	return response;
}

export async function refreshJobStatusForJobId(jobId: BytesLike) {
	const refreshJobStatusEndpoint =
		environment.backend_url +
		OYSTER_URL_ENDPOINTS.job_refresh_url +
		chainConfig.backend_network_id +
		'/' +
		jobId;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(refreshJobStatusEndpoint, options);
	if (!response || response.error) {
		console.log('no refreshJobStatusForJobId');
		return [];
	}
	return response;
}
