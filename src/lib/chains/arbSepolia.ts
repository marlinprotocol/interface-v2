import { staticImages } from '../../lib/components/images/staticImages';
import type { ChainConfig } from '../../lib/types/environmentTypes';

export const ARB_SEPOLIA: ChainConfig = {
	chain_id: '0x66eee',
	chain_name: 'Arbitrum Sepolia',
	chain_token: 'ETH',
	chain_image: staticImages.ArbitrumLogo,
	block_explorer_name: 'Arbiscan',
	block_explorer_url: 'https://sepolia.arbiscan.io',
	rpc_url: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
	backend_network_id: 'ArbOne',
	contract_addresses: {
		BRIDGE: '0x1bC0EFc6cd42884EB527228b0A41AcaEB5FdEB27',
		CLUSTER_REGISTRY: '0x1fe9f98C4c0eC29a012f8B8fFDe962a13fCECe1E',
		CLUSTER_REWARDS: '0x0266E6D433466D0ff153A4F853bF9C7516512E13',
		RECEIVER_STAKING: '0x2f2Ee222bfe110E37C4F7b84A542fF53CE8e5C77',
		REWARD_DELEGATORS: '0x09c7369e72726dBE24C34e1822D38cC919b793DC',
		STAKE_MANAGER: '0x464d85D3a29A52F15886376823D56aB5D37619AB',
		OYSTER: '0xDcD2846DCA523Db1C8F3c842a41A58099dE26A0A',
		POND: '0x8995673cef56d4cBAE3cE96157a8fc977D4f8525',
		MPOND: '0x071BaFF53B0Ca54E4aec59Cda64f9cC5a7205e2c',
		USDC: '0xf4137957B53668800CEAb1Eb71ACb91aDdD1D8fe',
		OYSTER_CREDIT: '0x6699E4A8ef9937b7451CFe06fAA208008bDC5c97',
		KALYPSO: '0xCf30295AfC4F12FfAC6EE96Da3607e7749881BA7'
	},
	subgraph_urls: {
		RECEIVER_STAKING: 'https://api.studio.thegraph.com/query/76614/staking-arb1-dev/version/latest',
		BRIDGE: 'https://api.thegraph.com/subgraphs/name/marlin-staging/bridge-arb-sepolia',
		OYSTER: 'https://api.studio.thegraph.com/query/76614/marlin-oyster-arbitrum-dev/version/latest',
		POND: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/pond-dev',
		MPOND: 'https://api.thegraph.com/subgraphs/name/marlinprotocol/governance-dev',
		OYSTER_CREDIT: 'https://api.thegraph.com/subgraphs/name/rajatlko13/oyster-credits-arb-sepolia'
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
			address: '0x8995673cef56d4cBAE3cE96157a8fc977D4f8525'
		},
		MPOND: {
			decimal: 18,
			precision: 6,
			currency: 'MPOND',
			symbol: '$',
			address: '0x071BaFF53B0Ca54E4aec59Cda64f9cC5a7205e2c'
		},
		USDC: {
			decimal: 6,
			precision: 6,
			currency: 'USDC',
			symbol: '$',
			address: '0xf4137957B53668800CEAb1Eb71ACb91aDdD1D8fe'
		},
		MOCK: {
			decimal: 18,
			precision: 6,
			currency: 'MOCK',
			symbol: '$',
			address: '0xdb69299dDE4A00c99b885D9f8748B2AeD1Fe4Ed4'
		}
	}
};
