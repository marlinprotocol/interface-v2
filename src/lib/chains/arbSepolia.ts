import type { ChainConfig } from '$lib/types/environmentTypes';

export const ARB_SEPOLIA: ChainConfig = {
	chain_id: '0x66eee',
	chain_name: 'Arbitrum Sepolia',
	chain_token: 'ETH',
	block_explorer_name: 'Arbiscan',
	block_explorer_url: 'https://sepolia.arbiscan.io',
	rpc_url: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
	backend_network_id: 'ArbOne',
	contract_addresses: {
		BRIDGE: '',
		CLUSTER_REGISTRY: '0x1fe9f98C4c0eC29a012f8B8fFDe962a13fCECe1E',
		CLUSTER_REWARDS: '0x0266E6D433466D0ff153A4F853bF9C7516512E13',
		RECEIVER_STAKING: '0x2f2Ee222bfe110E37C4F7b84A542fF53CE8e5C77',
		REWARD_DELEGATORS: '0x09c7369e72726dBE24C34e1822D38cC919b793DC',
		STAKE_MANAGER: '0x464d85D3a29A52F15886376823D56aB5D37619AB',
		OYSTER: '0xdbc4779b69bdc0f657ba35648e434bae042a00e0',
		POND: '0x8995673cef56d4cBAE3cE96157a8fc977D4f8525',
		MPOND: '0x071BaFF53B0Ca54E4aec59Cda64f9cC5a7205e2c',
		USDC: '0xf3C3351D6Bd0098EEb33ca8f830FAf2a141Ea2E1'
	},
	subgraph_urls: {
		RECEIVER_STAKING: 'https://api.thegraph.com/subgraphs/name/marlin-staging/staking-arb1-dev',
		BRIDGE: '',
		OYSTER: 'https://api.thegraph.com/subgraphs/name/marlin-staging/enclaves-arb-dev',
		POND: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/pond-dev',
		MPOND: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/governance-dev'
	},
	oyster_token: 'POND',
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
