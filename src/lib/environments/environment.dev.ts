import { ARB_GOERLI } from '$lib/chains/arbGoerli';
import type { Environment } from '$lib/types/environmentTypes';
import { LINEA_GOERLI } from '$lib/chains/lineaGoerli';
import { ARB_SEPOLIA } from '$lib/chains/arbSepolia';

export const ENVIRONMENT_DEV: Environment = {
	environment_name: 'development',
	production: false,
	valid_chains: { 421614: ARB_SEPOLIA, 421613: ARB_GOERLI, 59140: LINEA_GOERLI },
	default_chain_id: 421614,
	supported_chains: {
		bridge: [421613, 421614],
		oyster: [421613, 59140, 421614],
		receiver_staking: [421613, 421614],
		receiver_rewards: [421613, 421614]
	},
	dapp_url: 'https://adummy.site',
	trezor_email: 'arandomsupportemail@xyz.com',
	backend_url: 'https://api.lagoon.build/'
};
