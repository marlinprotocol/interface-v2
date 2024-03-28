import { staticImages } from '../../lib/components/images/staticImages';
import type { ChainConfig } from '../../lib/types/environmentTypes';

export const ARB_GOERLI: ChainConfig = {
	chain_id: '0x66eed',
	chain_name: 'Arb Goerli',
	chain_token: 'AGOR',
	chain_image: staticImages.ArbitrumLogo,
	block_explorer_name: 'Arbiscan',
	block_explorer_url: 'https://goerli.arbiscan.io',
	rpc_url: 'https://goerli-rollup.arbitrum.io/rpc',
	backend_network_id: 'ArbOne',
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
		USDC: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892',
		OYSTER_CREDIT: ''
	},
	subgraph_urls: {
		RECEIVER_STAKING: 'https://api.thegraph.com/subgraphs/name/marlin-staging/staking-arb1-goerli',
		BRIDGE: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/bridge-kovan',
		OYSTER: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/enclaves-arb-goerli',
		POND: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/pond-dev',
		MPOND: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/governance-dev',
		OYSTER_CREDIT: ''
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
			symbol: '$',
			address: '0xa9472a9C135Cb33221de441a4DEd393FD515a69C'
		},
		MPOND: {
			decimal: 18,
			precision: 6,
			currency: 'MPOND',
			symbol: '$',
			address: '0x0B3d9b224496C2A2Fa1a4096D8EB4D350eFd9079'
		},
		USDC: {
			decimal: 6,
			precision: 6,
			currency: 'USDC',
			symbol: '$',
			address: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892'
		}
	}
};
