import { staticImages } from '$lib/components/images/staticImages';
import type { ChainConfig } from '$lib/types/environmentTypes';

export const LINEA: ChainConfig = {
	chain_id: '0xe708',
	chain_name: 'Linea',
	chain_token: 'ETH',
	chain_image: staticImages.LineaLogo,
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
		USDC: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892',
		OYSTER_CREDIT: ''
	},
	subgraph_urls: {
		RECEIVER_STAKING: '',
		BRIDGE: '',
		OYSTER: 'https://graph-query.linea.build/subgraphs/name/marlinprotocol/oyster-linea',
		POND: '',
		MPOND: '',
		OYSTER_CREDIT: ''
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
			symbol: '$',
			address: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892'
		}
	}
};
