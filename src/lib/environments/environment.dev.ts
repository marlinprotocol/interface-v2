import { ARB_GOERLI } from '$lib/chains/arbGoerli';
import { ARB_ONE } from '$lib/chains/arbOne';
import type { Environment } from '$lib/types/environmentTypes';

export const ENVIRONMENT_DEV: Environment = {
	environment_name: 'development',
	production: false,
	valid_chains: { 421613: ARB_GOERLI, 42161: ARB_ONE },
	default_chain_id: 421613,
	supported_chains: {
		bridge: [421613, 42161],
		receiver_staking: [421613, 42161],
		oyster: [421613, 42161],
		relay: [421613, 42161]
	},
	dapp_url: 'https://adummy.site',
	trezor_email: 'arandomsupportemail@xyz.com'
};
