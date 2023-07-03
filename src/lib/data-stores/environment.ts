import { ENVIRONMENT_DEV } from '$lib/environments/environment.dev';
import { ENVIRONMENT_ARB } from '$lib/environments/environment.arb';
import { ENVIRONMENT_MAINNET } from '$lib/environments/environment.mainnet';
import type { Environment } from '$lib/types/environmentTypes';
import { get, writable, type Writable } from 'svelte/store';

const environments: Record<number, Environment> = {
	421613: ENVIRONMENT_DEV,
	42161: ENVIRONMENT_ARB,
	1: ENVIRONMENT_MAINNET
};

export const environmentStore: Writable<Environment> = writable(ENVIRONMENT_ARB);
console.log('Initial Environment Loaded');

// subscription to chainStore.chainId
export function loadEnvironment(chainId: number) {
	console.log('Environment Loaded based on chainId: ', chainId);
	// check if chainId exists in environments and set environmentStore else set default
	if (!environments[chainId]) {
		console.log('Environment not found, setting default');
		environmentStore.set(ENVIRONMENT_DEV);
		return;
	}

	environmentStore.set(ENVIRONMENT_DEV);
	console.log(environmentStore, get(environmentStore));
}
