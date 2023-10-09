import { ARB_GOERLI } from '$lib/chains/arbGoerli';
import type { Environment } from '$lib/types/environmentTypes';
import { LINEA_GOERLI } from '$lib/chains/lineaGoerli';

export const ENVIRONMENT_DEV: Environment = {
	environment_name: 'development',
	production: false,
	valid_chains: { 421613: ARB_GOERLI, 59140: LINEA_GOERLI },
	default_chain_id: 421613,
	supported_chains: {
		bridge: [421613],
		oyster: [421613, 59140],
		receiver_staking: [421613],
		receiver_rewards: [421613]
	},
	dapp_url: 'https://adummy.site',
	trezor_email: 'arandomsupportemail@xyz.com',
	backend_url: 'https://api.aragog.live/'
};
