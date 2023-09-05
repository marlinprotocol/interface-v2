import { ARB_ONE } from '$lib/chains/arbOne';
import type { Environment } from '$lib/types/environmentTypes';

export const ENVIRONMENT_MAINNET: Environment = {
	environment_name: 'mainnet',
	production: true,
	valid_chains: { 42161: ARB_ONE },
	default_chain_id: 42161,
	supported_chains: {
		bridge: [42161],
		receiver_portal: [42161],
		oyster: [42161],
		relay: [42161]
	},
	dapp_url: 'https://arb1.marlin.org',
	trezor_email: 'security@marlin.org'
};
