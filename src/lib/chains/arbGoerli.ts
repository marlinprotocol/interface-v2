import type { ChainConfig } from '$lib/types/environmentTypes';

export const ARB_GOERLI: ChainConfig = {
	chain_id: '0x66eed',
	chain_name: 'Arbitrum Goerli',
	contract_subgraph_url:
		'https://api.thegraph.com/subgraphs/name/marlin-staging/staking-arb1-goerli',
	contract_details_url: 'https://api.aragog.live/getcontractdetails',
	bridge: {
		contract_details_url: 'https://api.aragog.live/getBridgeDetails',
		contract_subgraph_url: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/bridge-kovan'
	},
	oyster: {
		contract_address: '0x0F5F91BA30a00bD43Bd19466f020B3E5fc7a49ec',
		contract_subgraph_url:
			'https://api.thegraph.com/subgraphs/name/marlinprotocol/enclaves-arb-goerli',
		instances_using_cp_url: 'https://api.aragog.live/operators/spec/cp/',
		instances_using_operator_address: 'https://api.aragog.live/operators/spec/',
		provider_names_url: 'https://api.aragog.live/operators/names',
		provider_instances_url: 'https://api.aragog.live/operators/spec',
		job_status_url: 'https://api.aragog.live/operators/jobs/',
		job_refresh_url: 'https://api.aragog.live/operators/jobs/refresh/',
		token: 'usdc'
	},
	tokens: {
		pond: {
			token_address: '0xa9472a9C135Cb33221de441a4DEd393FD515a69C',
			subgraph_url: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/pond-dev',
			token_decimals: 18,
			token_precision: 2,
			symbol: 'POND'
		},
		mpond: {
			token_address: '0x0B3d9b224496C2A2Fa1a4096D8EB4D350eFd9079',
			subgraph_url: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/governance-dev',
			token_decimals: 18,
			token_precision: 6,
			symbol: 'MPOND'
		},
		usdc: {
			// token_address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
			token_address: '0xa9472a9C135Cb33221de441a4DEd393FD515a69C',
			subgraph_url: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/pond-dev',
			token_decimals: 6,
			token_precision: 6,
			symbol: 'USDC'
		}
	}
};
