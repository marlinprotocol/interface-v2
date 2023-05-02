import type { NetworkInfo } from '$lib/types/networkTypes';

export const networkInfo: Record<string, NetworkInfo> = {
	'0x66eed': {
		chainId: '0x66eed',
		chainName: 'Arbitrum Goerli',
		nativeCurrency: {
			name: 'Ether',
			symbol: 'ETH',
			decimals: 18
		},
		rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
		blockExplorerUrls: ['https://goerli.etherscan.io/']
	}
};
