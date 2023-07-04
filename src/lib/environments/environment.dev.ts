import { ARB_GOERLI } from '$lib/chains/arbGoerli';
import type { Environment } from '$lib/types/environmentTypes';

export const ENVIRONMENT_DEV: Environment = {
	environment_name: 'development',
	production: false,
	valid_chains: { 421613: ARB_GOERLI },
	default_chain_id: 421613
};
