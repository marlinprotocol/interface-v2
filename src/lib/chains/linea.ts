import type { ChainConfig } from '$lib/types/environmentTypes';

export const LINEA: ChainConfig = {
	chain_id: '0xe708',
	chain_name: 'Linea',
	chain_token: 'ETH',
	block_explorer_name: 'Lineascan',
	block_explorer_url: 'https://lineascan.build',
	rpc_url: 'https://rpc.linea.build',
	contract_addresses: {
		BRIDGE: '',
		CLUSTER_REGISTRY: '',
		CLUSTER_REWARDS: '',
		RECEIVER_STAKING: '',
		REWARD_DELEGATORS: '',
		STAKE_MANAGER: '',
		OYSTER: '0xdbc4779b69bdc0f657ba35648e434bae042a00e0',
		POND: '',
		MPOND: '',
		USDC: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892'
	},
	subgraph_urls: {
		RECEIVER_STAKING: '',
		BRIDGE: '',
		OYSTER: 'https://graph-query.linea.build/subgraphs/name/marlinprotocol/oyster-linea',
		POND: '',
		MPOND: ''
	},
	oyster_urls: {
		instances_using_cp_url: 'https://api.aragog.live/operators/spec/cp/',
		instances_using_operator_address: 'https://api.aragog.live/operators/spec/Linea/',
		provider_names_url: 'https://api.aragog.live/operators/names',
		provider_instances_url: 'https://api.aragog.live/operators/spec/Linea',
		job_status_url: 'https://api.aragog.live/operators/jobs/Linea/',
		job_refresh_url: 'https://api.aragog.live/operators/jobs/refresh/Linea/'
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
