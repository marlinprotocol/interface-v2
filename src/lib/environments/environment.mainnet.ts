import { ARB_ONE } from '$lib/chains/arbOne';
import type { Environment } from '$lib/types/environmentTypes';

export const ENVIRONMENT_MAINNET: Environment = {
	environment_name: 'mainnet',
	production: true,
	valid_chains: { 42161: ARB_ONE },
	default_chain_id: 42161,
	dapp_url: 'https://app.aragog.live',
	trezor_email: 'security@marlin.org'
};
