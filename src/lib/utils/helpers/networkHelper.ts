import type { EIP1193Provider } from '@web3-onboard/core';
import { environment } from '$lib/data-stores/environment';
import onboard from '$lib/controllers/web3OnboardController';
import { setWalletAndChainStores } from '$lib/controllers/walletController';

/**
 * Checks if current chain is supported by the app or not
 * @param chainId
 * @returns if chain is supported or not
 */
export function isValidChain(chainId: number): boolean {
	// check if environment.valid_chains has chainId as a key in it
	return Object.keys(environment.valid_chains).includes(chainId.toString());
}

export async function switchChain(chainId: number, provider: EIP1193Provider) {
	if (isValidChain(chainId)) {
		const success = await onboard.setChain({ chainId: chainId });
		if (success) {
			console.log('setting wallet and chain stores due to chain switch');
			setWalletAndChainStores(provider);
		}
	}
}
