import { staticImages } from '$lib/components/images/staticImages';
import type { ChainConfig } from '$lib/types/environmentTypes';
import { PUBLIC_SUBGRAPH_KEY } from '$env/static/public';

export const POLYGON: ChainConfig = {
	chain_id: '0x89',
	chain_name: 'Polygon',
	chain_token: 'MATIC',
	chain_image: staticImages.PolygonLogo,
	block_explorer_name: 'Polygonscan',
	block_explorer_url: 'https://polygonscan.com',
	rpc_url: 'https://polygon-rpc.com/',
	backend_network_id: 'Polygon',
	contract_addresses: {
		BRIDGE: '',
		CLUSTER_REGISTRY: '',
		CLUSTER_REWARDS: '',
		RECEIVER_STAKING: '',
		REWARD_DELEGATORS: '',
		STAKE_MANAGER: '',
		OYSTER: '0x4dA7A531EF660533074341df098F722F1Aa5dFaa',
		POND: '',
		MPOND: '',
		USDC: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
		OYSTER_CREDIT: '',
		KALYPSO: ''
	},
	subgraph_urls: {
		RECEIVER_STAKING: '',
		BRIDGE: '',
		OYSTER: `https://gateway-arbitrum.network.thegraph.com/api/${PUBLIC_SUBGRAPH_KEY}/subgraphs/id/GAvm9MJadcg2Uao3eraFXMfzNMCmckHPDTLV15ux2cZC`,
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
			address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'
		}
	}
};
