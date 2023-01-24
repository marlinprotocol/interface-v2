import { PUBLIC_NODE_ENV } from '$env/static/public';
import { derived, writable } from 'svelte/store';
import { ENVIRONMENT_DEV } from '$lib/environments/environment.dev';
import { ENVIRONMENT_ARB } from '$lib/environments/environment.arb';
import { ENVIRONMENT_MAINNET } from '$lib/environments/environment.mainnet';

let env;

switch (PUBLIC_NODE_ENV) {
	case 'dev':
		env = ENVIRONMENT_DEV;
		break;
	case 'arb':
		env = ENVIRONMENT_ARB;
		break;
	case 'mainnet':
		env = ENVIRONMENT_MAINNET;
		break;
	default:
		env = ENVIRONMENT_DEV;
}

const _environment = writable(env);
export const environmentStore = derived(_environment, ($environment) => $environment);
