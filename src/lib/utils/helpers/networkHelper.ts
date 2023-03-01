import { connectWallet } from '$lib/controllers/walletController';
import ENVIRONMENT from '$lib/environments/environment';
import type { WALLET_TYPE } from '../constants/constants';

/**
 * Checks if current chain is supported by the app or not
 * @param chainId
 * @returns if chain is supported or not
 */
export function isValidChain(chainId: number): boolean {
	return ENVIRONMENT.valid_chain_ids.includes(chainId);
}

export async function switchChain(provider: any, walletType: WALLET_TYPE, chainId: string) {
	await provider.provider.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: chainId }]
	});
	await connectWallet(walletType);
}

export const getChainDisplayName = (chainId: number): string | undefined => {
	switch (chainId) {
		case 421613:
			return 'ETH GARB1';

		default:
			return undefined;
	}
};
