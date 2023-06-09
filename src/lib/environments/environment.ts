import { PUBLIC_NODE_ENV } from '$env/static/public';
import { ENVIRONMENT_DEV } from '$lib/environments/environment.dev';
import { ENVIRONMENT_ARB } from '$lib/environments/environment.arb';
import { ENVIRONMENT_MAINNET } from '$lib/environments/environment.mainnet';
import type { Environment } from '$lib/types/environmentTypes';

const environments: Record<string, Environment> = {
	dev: ENVIRONMENT_DEV,
	arb: ENVIRONMENT_ARB,
	mainnet: ENVIRONMENT_MAINNET
};

const ENVIRONMENT = PUBLIC_NODE_ENV ? environments[PUBLIC_NODE_ENV] : environments.dev;

export default ENVIRONMENT;
