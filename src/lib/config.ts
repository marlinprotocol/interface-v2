export type Network = {
	chainId: number;
	rpcUrl: string;
	chainName: string;
	nativeCurrency: { name: string; symbol: string; decimals: number };
	multicall2Address: string;
	blockExplorerUrl?: string;
};

export const NETWORKS: Network[] = [
	// {
	//   chainId: 1,
	//   rpcUrl: 'https://rpc.ankr.com/eth', // Enter your RPC endpoint here.
	//   chainName: 'Ethereum',
	//   nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
	//   multicall2Address: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696', // Address to Uniswap Multicall2 Contract
	//   blockExplorerUrl: 'https://etherscan.com'
	// },
	{
		chainId: 421613,
		rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
		chainName: 'Arbitrum Görli',
		nativeCurrency: { name: 'Ether', symbol: 'AGOR', decimals: 18 },
		multicall2Address: '',
		blockExplorerUrl: 'https://goerli-rollup-explorer.arbitrum.io'
	}
];
