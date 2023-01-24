import { PUBLIC_NODE_ENV } from '$env/static/public';
import { ENVIRONMENT_DEV } from '$lib/environments/environment.dev';
import { ENVIRONMENT_ARB } from '$lib/environments/environment.arb';
import { ENVIRONMENT_MAINNET } from '$lib/environments/environment.mainnet';
import type { Environment } from '$lib/types/environmentTypes';

let ENVIRONMENT: Environment;

switch (PUBLIC_NODE_ENV) {
	case 'dev':
		ENVIRONMENT = ENVIRONMENT_DEV;
		break;
	case 'arb':
		ENVIRONMENT = ENVIRONMENT_ARB;
		break;
	case 'mainnet':
		ENVIRONMENT = ENVIRONMENT_MAINNET;
		break;
	default:
		ENVIRONMENT = ENVIRONMENT_DEV;
}

export default ENVIRONMENT;
