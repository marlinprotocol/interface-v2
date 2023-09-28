import type { ChainConfig } from '$lib/types/environmentTypes';

export const LINEA_GOERLI: ChainConfig = {
	chain_id: '0xe704',
	chain_name: 'Linea Goerli',
	chain_token: 'LineaETH',
	block_explorer_name: 'Lineascan',
	block_explorer_url: 'https://goerli.lineascan.build',
	rpc_url: 'https://linea-goerli.infura.io/v3/',
	backend_enum: 'Linea',
	contract_addresses: {
		BRIDGE: '',
		CLUSTER_REGISTRY: '',
		CLUSTER_REWARDS: '',
		RECEIVER_STAKING: '',
		REWARD_DELEGATORS: '',
		STAKE_MANAGER: '',
		OYSTER: '0xe43EFeA7f40a885f4B35a149CAB5FC3fE01564C6',
		POND: '0xDcD2846DCA523Db1C8F3c842a41A58099dE26A0A',
		MPOND: '',
		USDC: ''
	},
	subgraph_urls: {
		RECEIVER_STAKING: '',
		BRIDGE: '',
		OYSTER:
			'https://graph-query.goerli.linea.build/subgraphs/name/marlinprotocol/oyster-linea-goerli',
		POND: '',
		MPOND: ''
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
		}
	}
};
