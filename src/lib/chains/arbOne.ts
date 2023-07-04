import type { ChainConfig } from '$lib/types/environmentTypes';

export const ARB_ONE: ChainConfig = {
	chain_id: '0xa4b1',
	chain_name: 'Arbitrum One',
	contract_subgraph_url: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/staking-arb1',
	contract_details_url: 'https://sk.arb1.marlin.org/getcontractdetails',
	bridge: {
		contract_details_url: 'https://sk.arb1.marlin.org/getBridgeDetails',
		contract_subgraph_url: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/bridge-arb1'
	},
	oyster: {
		contract_address: '0x9d95D61eA056721E358BC49fE995caBF3B86A34B',
		contract_subgraph_url: 'https://api.thegraph.com/subgraphs/name/marlin-staging/oyster-arb1',
		instances_using_cp_url: 'https://sk.arb1.marlin.org/operators/spec/cp/',
		instances_using_operator_address: 'https://sk.arb1.marlin.org/operators/spec/',
		provider_names_url: 'https://sk.arb1.marlin.org/operators/names',
		provider_instances_url: 'https://sk.arb1.marlin.org/operators/spec',
		job_status_url: 'https://sk.arb1.marlin.org/operators/jobs/',
		job_refresh_url: 'https://sk.arb1.marlin.org/operators/jobs/refresh/',
		token: 'usdc'
	},
	tokens: {
		pond: {
			token_address: '0xdA0a57B710768ae17941a9Fa33f8B720c8bD9ddD',
			subgraph_url: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/pond-dev',
			token_decimals: 18,
			token_precision: 2,
			symbol: 'POND'
		},
		mpond: {
			token_address: '0xC606157CdBEb8e0BDB273E40D6Ee96e151083194',
			subgraph_url: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/governance-arb1',
			token_decimals: 18,
			token_precision: 6,
			symbol: 'MPOND'
		},
		usdc: {
			// token_address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
			token_address: '0xdA0a57B710768ae17941a9Fa33f8B720c8bD9ddD',
			subgraph_url: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/pond-dev',
			token_decimals: 6,
			token_precision: 6,
			symbol: 'USDC'
		}
	}
};
