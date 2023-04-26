import { connectWallet } from '$lib/controllers/walletController';
import ENVIRONMENT from '$lib/environments/environment';

/**
 * Checks if current chain is supported by the app or not
 * @param chainId
 * @returns if chain is supported or not
 */
export function isValidChain(chainId: number): boolean {
	return ENVIRONMENT.valid_chain_ids.includes(chainId);
}

export async function switchChain(provider: any, chainId: string) {
	await Promise.all([
		provider.provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: chainId }]
		}),
		connectWallet(provider)
	]);
}

export const getChainDisplayName = (chainId: number): string | undefined => {
	switch (chainId) {
		case 421613:
			return 'ETH GARB1';

		default:
			return undefined;
	}
};
