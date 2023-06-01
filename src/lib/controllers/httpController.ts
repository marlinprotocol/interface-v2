import { environmentStore } from '$lib/data-stores/environment';
import type { Environment } from '$lib/types/environmentTypes';
import type { CPInstances } from '$lib/types/oysterComponentType';
import type { Address } from '$lib/types/storeTypes';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { getModifiedInstances } from '$lib/utils/data-modifiers/oysterModifiers';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';

let environment: Environment;
environmentStore.subscribe((value) => {
	environment = value;
});

export async function getInstancesFromControlPlaneUsingCpUrl(controlPlaneUrl: string) {
	const controlPlaneDetailsEndpoint =
		environment.public_oyster_instances_using_cp_url + encodeURIComponent(controlPlaneUrl.trim());
	const options = GET_OPTIONS;
	const instances: CPInstances = await fetchHttpData(controlPlaneDetailsEndpoint, options);

	if (!instances || instances.error) {
		console.log('error from getInstancesFromControlPlaneUsingCpUrl');
		throw new Error('Unable to fetch instances');
	}
	return getModifiedInstances(instances);
}

export async function getInstancesFromControlPlaneUsingOperatorAddress(operatorAddress: Address) {
	const controlPlaneDetailsEndpoint =
		environment.public_oyster_instances_using_operator_address + operatorAddress.trim();
	const options = GET_OPTIONS;
	const instances: CPInstances = await fetchHttpData(controlPlaneDetailsEndpoint, options);

	if (!instances) {
		throw new Error('Unable to fetch instances');
	}
	return getModifiedInstances(instances);
}

export async function getProvidersNameJSON() {
	const providerNameEndPoint = environment.public_oyster_provider_names_url;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(providerNameEndPoint, options);
	return response ?? {};
}

export async function getProvidersInstancesJSON() {
	const providerNameEndPoint = environment.public_oyster_provider_instances_url;
	const options = GET_OPTIONS;
	const response: Record<string, CPInstances> = await fetchHttpData(providerNameEndPoint, options);
	if (!response) {
		console.log('no  getProvidersInstancesJSON');
	}
	return response;
}

export async function getJobStatuses(userAddress: Address) {
	const jobStatusEndpoint = environment.public_oyster_job_status_url + userAddress;
	const options = GET_OPTIONS;
	const response = await fetchHttpData(jobStatusEndpoint, options);
	if (!response) {
		console.log('no job statuses found for user');
		return [];
	}
	return response;
}
