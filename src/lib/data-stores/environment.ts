import { ENVIRONMENT_DEV } from '$lib/environments/environment.dev';
import type { Environment } from '$lib/types/environmentTypes';
import { PUBLIC_NODE_ENV } from '$env/static/public';
import { type Writable, writable, get } from 'svelte/store';
import { ENVIRONMENT_MAINNET } from '$lib/environments/environment.mainnet';

const environments: Record<string, Environment> = {
	development: ENVIRONMENT_DEV,
	arb_mainnet: ENVIRONMENT_MAINNET
};

export const environmentStore: Writable<Environment> = writable(environments[PUBLIC_NODE_ENV]);
console.log('Environment Loaded for', PUBLIC_NODE_ENV);
console.log(get(environmentStore));
