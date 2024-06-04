import type { ChainConfig } from '$lib/types/environmentTypes';
import { PUBLIC_SUBGRAPH_KEY } from '$env/static/public';

export const LINEA: ChainConfig = {
	chain_id: '0xe708',
	chain_name: 'Linea',
	chain_token: 'ETH',
	block_explorer_name: 'Lineascan',
	block_explorer_url: 'https://lineascan.build',
	rpc_url: 'https://rpc.linea.build',
	backend_network_id: 'Linea',
	contract_addresses: {
		BRIDGE: '',
		CLUSTER_REGISTRY: '',
		CLUSTER_REWARDS: '',
		RECEIVER_STAKING: '',
		REWARD_DELEGATORS: '',
		STAKE_MANAGER: '',
		OYSTER: '0xdD78e7F31B98dD8BD1F44F8FFCCeb4EdA6abdc5B',
		POND: '',
		MPOND: '',
		USDC: '0x176211869cA2b568f2A7D4EE941E073a821EE1ff'
	},
	subgraph_urls: {
		RECEIVER_STAKING: '',
		BRIDGE: '',
		OYSTER: `https://gateway-arbitrum.network.thegraph.com/api/${PUBLIC_SUBGRAPH_KEY}/subgraphs/id/GRms7wGqfw3tdHyrEVxmdWpPNduj9tEfQ6oD8g6aj1bU`,
		POND: '',
		MPOND: ''
	},
	oyster_token: 'USDC',
	oyster_rate_metadata: {
		rateUnit: 'hour',
		rateCPUrlUnitInSeconds: 1, // 1 hour
		rateReviseWaitingTime: 5 * 60 // 5 minutes
	},
	tokens: {
		USDC: {
			decimal: 6,
			precision: 6,
			currency: 'USDC',
			symbol: '$'
		}
	}
};
