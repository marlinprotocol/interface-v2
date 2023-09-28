import type { ChainConfig } from '$lib/types/environmentTypes';

export const ARB_ONE: ChainConfig = {
	chain_id: '0xa4b1',
	chain_name: 'Arbitrum One',
	chain_token: 'ETH',
	block_explorer_name: 'Arbiscan',
	block_explorer_url: 'https://arbiscan.io',
	rpc_url: 'https://arbiscan.io/rpc',
	backend_enum: 'ArbOne',
	contract_addresses: {
		BRIDGE: '0x7cf89b836d1c647ef31a5eeb152b7addcf002a08',
		CLUSTER_REGISTRY: '0x1f3Fe1E2a752cF6732C8be849a424482639EffC9',
		CLUSTER_REWARDS: '0xc2033B3Ea8C226461ac7408BA948806F09148788',
		RECEIVER_STAKING: '0x298222e9f54396e70ee1eb2fb58aad4e7da1f878',
		REWARD_DELEGATORS: '0xfB1F3fFa0d9819Da45D4E91967D46fAF025aa1c3',
		STAKE_MANAGER: '0xf90490186F370f324DEF2871F077668455f65253',
		OYSTER: '0x9d95D61eA056721E358BC49fE995caBF3B86A34B',
		POND: '0xdA0a57B710768ae17941a9Fa33f8B720c8bD9ddD',
		MPOND: '0xC606157CdBEb8e0BDB273E40D6Ee96e151083194',
		USDC: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
	},
	subgraph_urls: {
		RECEIVER_STAKING: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/staking-arb1',
		BRIDGE: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/bridge',
		OYSTER: 'https://api.thegraph.com/subgraphs/name/marlin-staging/oyster-arb1',
		POND: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/pond-arb1',
		MPOND: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/governance-arb1'
	},
	oyster_token: 'USDC',
	oyster_rate_metadata: {
		rateUnit: 'hour',
		rateCPUrlUnitInSeconds: 1, // 1 hour
		rateReviseWaitingTime: 5 * 60 // 5 minutes
	},
	tokens: {
		POND: {
			decimal: 18,
			precision: 2,
			currency: 'POND',
			symbol: '$'
		},
		MPOND: {
			decimal: 18,
			precision: 6,
			currency: 'MPOND',
			symbol: '$'
		},
		USDC: {
			decimal: 6,
			precision: 6,
			currency: 'USDC',
			symbol: '$'
		}
	}
};
