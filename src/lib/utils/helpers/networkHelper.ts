import { connectWallet } from '$lib/controllers/walletController';
import ENVIRONMENT from '$lib/environments/environment';
import { WALLET_TYPE } from '../constants/constants';

/**
 * Checks if current chain is supported by the app or not
 * @param chainId
 * @returns if chain is supported or not
 */
export function isValidChain(chainId: number): boolean {
	return ENVIRONMENT.valid_chain_ids.includes(chainId);
}

export async function switchChain(chainId: string) {
	await window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: chainId }]
	});
	await connectWallet(WALLET_TYPE.metamask);
}
