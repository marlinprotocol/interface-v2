import { ARB_ONE } from '$lib/chains/arbOne';
import type { Environment } from '$lib/types/environmentTypes';
import { LINEA } from '$lib/chains/linea';
import { POLYGON } from '$lib/chains/polygon';

export const ENVIRONMENT_MAINNET: Environment = {
	environment_name: 'mainnet',
	production: true,
	valid_chains: { 42161: ARB_ONE, 59144: LINEA, 137: POLYGON },
	default_chain_id: 42161,
	supported_chains: {
		dashboard: [42161, 59144, 137],
		bridge: [42161],
		oyster: [42161, 59144, 137],
		receiver_staking: [42161],
		receiver_rewards: []
	},
	dapp_url: 'https://arb1.marlin.org',
	trezor_email: 'security@marlin.org',
	backend_url: 'https://sk.arb1.marlin.org/'
};
