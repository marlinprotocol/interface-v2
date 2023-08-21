import type { ChainConfig } from '$lib/types/environmentTypes';

export const ARB_GOERLI: ChainConfig = {
	chain_id: '0x66eed',
	chain_name: 'Arbitrum Görli',
	chain_token: 'AGOR',
	block_explorer_url: 'https://goerli.arbiscan.io',
	block_explorer_rpc_url: 'https://goerli.arbiscan.io/rpc',
	contract_addresses: {
		BRIDGE: '0xfeEa9a34e51e4E90b8B62F38120A345650164110',
		CLUSTER_REGISTRY: '0x1fe9f98C4c0eC29a012f8B8fFDe962a13fCECe1E',
		CLUSTER_REWARDS: '0xf0ac76EB619DA28ed6907965C17eDbFd16B15CE0',
		RECEIVER_STAKING: '0x49fB661B8Cd1A76DEF8E11eB6d16e7c61C2C9270',
		REWARD_DELEGATORS: '0xe62CC1181Fb74c1954f13246b6863A8E26a0D77d',
		STAKE_MANAGER: '0x03040082dc6d47cd9fa4AD474D6d821FD6F0A04C',
		OYSTER: '0xdbc4779b69bdc0f657ba35648e434bae042a00e0',
		POND: '0xa9472a9C135Cb33221de441a4DEd393FD515a69C',
		MPOND: '0x0B3d9b224496C2A2Fa1a4096D8EB4D350eFd9079',
		USDC: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
	},
	subgraph_urls: {
		RECEIVER_STAKING: 'https://api.thegraph.com/subgraphs/name/marlin-staging/staking-arb1-goerli',
		BRIDGE: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/bridge-kovan',
		OYSTER: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/enclaves-arb-goerli',
		POND: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/pond-dev',
		MPOND: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/governance-dev'
	},
	oyster_urls: {
		instances_using_cp_url: 'https://api.aragog.live/operators/spec/cp/',
		instances_using_operator_address: 'https://api.aragog.live/operators/spec/',
		provider_names_url: 'https://api.aragog.live/operators/names',
		provider_instances_url: 'https://api.aragog.live/operators/spec',
		job_status_url: 'https://api.aragog.live/operators/jobs/',
		job_refresh_url: 'https://api.aragog.live/operators/jobs/refresh/'
	},
	oyster_token: 'USDC',
	tokens: {
		POND: {
			token_decimals: 18,
			token_precision: 2,
			symbol: 'POND'
		},
		MPOND: {
			token_decimals: 18,
			token_precision: 6,
			symbol: 'MPOND'
		},
		USDC: {
			token_decimals: 6,
			token_precision: 6,
			symbol: 'USDC'
		}
	}
};
