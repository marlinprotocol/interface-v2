import { staticImages } from '$lib/components/images/staticImages';
import type { ChainConfig } from '$lib/types/environmentTypes';
import { PUBLIC_SUBGRAPH_KEY } from '$env/static/public';

export const ARB_ONE: ChainConfig = {
	chain_id: '0xa4b1',
	chain_name: 'Arbitrum One',
	chain_token: 'ETH',
	chain_image: staticImages.ArbitrumLogo,
	block_explorer_name: 'Arbiscan',
	block_explorer_url: 'https://arbiscan.io',
	rpc_url: 'https://arb1.arbitrum.io/rpc',
	backend_network_id: 'ArbOne',
	contract_addresses: {
		BRIDGE: '0x7cf89b836d1c647ef31a5eeb152b7addcf002a08',
		OYSTER: '0x9d95D61eA056721E358BC49fE995caBF3B86A34B',
		POND: '0xdA0a57B710768ae17941a9Fa33f8B720c8bD9ddD',
		MPOND: '0xC606157CdBEb8e0BDB273E40D6Ee96e151083194',
		USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
		OYSTER_CREDIT: '',
		KALYPSO: ''
	},
	subgraph_urls: {
		RECEIVER_STAKING: `https://gateway-arbitrum.network.thegraph.com/api/${PUBLIC_SUBGRAPH_KEY}/subgraphs/id/GUh83DEwZWMTkKaydusdkb46mLuAC7FTL4km1bcNjugc`,
		BRIDGE: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/bridge',
		OYSTER: `https://gateway-arbitrum.network.thegraph.com/api/${PUBLIC_SUBGRAPH_KEY}/subgraphs/id/3dPXK16x1dNRPvrUiNbvSDmeN68gKjM47L7nu2b8eEUa`,
		OYSTER_CREDIT: ''
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
			symbol: '$',
			address: '0xdA0a57B710768ae17941a9Fa33f8B720c8bD9ddD'
		},
		MPOND: {
			decimal: 18,
			precision: 6,
			currency: 'MPOND',
			symbol: '$',
			address: '0xC606157CdBEb8e0BDB273E40D6Ee96e151083194'
		},
		USDC: {
			decimal: 6,
			precision: 6,
			currency: 'USDC',
			symbol: '$',
			address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'
		}
	}
};
