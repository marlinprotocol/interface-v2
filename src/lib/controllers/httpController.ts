import type { Address } from '$lib/types/storeTypes';
import type { Bytes } from 'ethers';
import type { CPInstances } from '$lib/types/oysterComponentType';
import type { Environment } from '$lib/types/environmentTypes';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { environmentStore } from '$lib/data-stores/environment';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';

let environment: Environment;
environmentStore.subscribe((value) => {
	environment = value;
});

export async function getInstancesFromControlPlaneUsingCpUrl(controlPlaneUrl: string) {
	const controlPlaneDetailsEndpoint =
		environment.public_oyster_instances_using_cp_url + encodeURIComponent(controlPlaneUrl.trim());
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
		environment.public_oyster_instances_using_operator_address + operatorAddress.trim();
	const options = GET_OPTIONS;
	const response: CPInstances = await fetchHttpData(controlPlaneDetailsEndpoint, options);

	if (!response || response.error) {
		console.log('error from getInstancesFromControlPlaneUsingOperatorAddress');
		throw new Error('Unable to fetch instances');
	}
	return response;
}

export async function getProvidersNameJSON() {
	const providerNameEndPoint = environment.public_oyster_provider_names_url;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(providerNameEndPoint, options);

	if (!response || response.error) {
		console.log('no getProvidersNameJSON');
		return {};
	}
	return response;
}

export async function getProvidersInstancesJSON() {
	const providerNameEndPoint = environment.public_oyster_provider_instances_url;
	const options = GET_OPTIONS;
	const response: Record<string, CPInstances> = await fetchHttpData(providerNameEndPoint, options);
	if (!response || response.error) {
		console.log('no getProvidersInstancesJSON');
		return {};
	}
	return response;
}

export async function getJobStatuses(userAddress: Address) {
	const jobStatusEndpoint = environment.public_oyster_job_status_url + userAddress;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(jobStatusEndpoint, options);
	if (!response || response.error) {
		console.log('no getJobStatuses');
		return [];
	}
	return response;
}

export async function refreshJobStatusForJobId(jobId: Bytes) {
	const refreshJobStatusEndpoint = environment.public_oyster_job_refresh_url + jobId;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(refreshJobStatusEndpoint, options);
	if (!response || response.error) {
		console.log('no refreshJobStatusForJobId');
		return [];
	}
	return response;
}
