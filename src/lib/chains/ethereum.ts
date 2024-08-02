import { staticImages } from '$lib/components/images/staticImages';
import type { ChainConfig } from '$lib/types/environmentTypes';

export const ETH: ChainConfig = {
	chain_id: '0x1',
	chain_name: 'Ethereum',
	chain_token: 'ETH',
	chain_image: staticImages.EthereumLogo,
	block_explorer_name: 'Etherscan',
	block_explorer_url: 'https://etherscan.io',
	rpc_url: 'wss://ethereum-rpc.publicnode.com',
	backend_network_id: '',
	contract_addresses: {
		BRIDGE: '0xB8324885ffe77b2A69f9dB4d7917ad2Ad1b8F957',
		OYSTER: '',
		POND: '0x57B946008913B82E4dF85f501cbAeD910e58D26C',
		MPOND: '0x1C77d15857646687005dbbAfFf5873F4495a9731',
		USDC: '',
		OYSTER_CREDIT: '',
		KALYPSO: ''
	},
	subgraph_urls: {
		RECEIVER_STAKING: '',
		BRIDGE: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/bridge',
		OYSTER: '',
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
			address: '0x57B946008913B82E4dF85f501cbAeD910e58D26C'
		},
		MPOND: {
			decimal: 18,
			precision: 6,
			currency: 'MPOND',
			symbol: '$',
			address: '0x1C77d15857646687005dbbAfFf5873F4495a9731'
		}
	}
};
