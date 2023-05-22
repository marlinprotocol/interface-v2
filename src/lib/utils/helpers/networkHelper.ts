import { connectWallet } from '$lib/controllers/walletController';
import { environmentStore } from '$lib/data-stores/environment';
import { networkInfo } from '../constants/network';
import { addToast } from '$lib/data-stores/toastStore';
import type { Environment } from '$lib/types/environmentTypes';

let environment: Environment;
environmentStore.subscribe((value) => {
	environment = value;
});

/**
 * Checks if current chain is supported by the app or not
 * @param chainId
 * @returns if chain is supported or not
 */
export function isValidChain(chainId: number): boolean {
	return environment.valid_chain_ids.includes(chainId);
}

export async function switchChain(provider: any, chainId: string) {
	await Promise.all([
		provider.provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: chainId }]
		}),
		connectWallet(provider)
	]).catch(async (err) => {
		if (err.code === 4902) {
			if (!networkInfo[chainId]) {
				addToast({
					variant: 'error',
					message: 'This chain is not supported by the app'
				});
				return;
			}
			await provider.provider.request({
				method: 'wallet_addEthereumChain',
				params: [networkInfo[chainId]]
			});
		} else {
			console.error(err);
			addToast({
				variant: 'error',
				message: 'Unexpected error occurred'
			});
			return;
		}
		await switchChain(provider, chainId);
	});
}

export const getChainDisplayName = (chainId: number): string | undefined => {
	switch (chainId) {
		case 421613:
			return 'ARB Goerli';

		default:
			return undefined;
	}
};
