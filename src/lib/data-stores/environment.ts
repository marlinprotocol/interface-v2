import { ENVIRONMENT_DEV } from '$lib/environments/environment.dev';
import { ENVIRONMENT_MAINNET } from '$lib/environments/environment.mainnet';
import type { Environment } from '$lib/types/environmentTypes';
import { PUBLIC_NODE_ENV } from '$env/static/public';

// to add an environment, create a new file in environments folder and import it here,
// then in the .env file, add the environment name to PUBLIC_NODE_ENV.
// Eg.PUBLIC_NODE_ENV = arb_mainnet
const environments: Record<string, Environment> = {
	development: ENVIRONMENT_DEV,
	arb_mainnet: ENVIRONMENT_MAINNET
};

// never manipulate this variable directly, use the .env file to set the environment
export const environment =
	PUBLIC_NODE_ENV && environments[PUBLIC_NODE_ENV]
		? environments[PUBLIC_NODE_ENV]
		: environments.development;
console.log('Environment Loaded for', PUBLIC_NODE_ENV);
console.log(environment);
