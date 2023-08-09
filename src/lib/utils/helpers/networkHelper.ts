import type { Environment } from '$lib/types/environmentTypes';
import { addToast } from '$lib/data-stores/toastStore';
import { connectWallet } from '$lib/controllers/walletController';
import { environmentStore } from '$lib/data-stores/environment';
import { networkInfo } from '../constants/network';

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
	await provider
		.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: chainId }]
		})
		.catch(async (err: any) => {
			if (err.code === 4902 || err.code === -32603) {
				if (!networkInfo[chainId]) {
					addToast({
						variant: 'error',
						message: 'This chain is not supported by the app'
					});
					return;
				}
				await provider.request({
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
	connectWallet(provider);
}

export const getChainDisplayName = (chainId: number): string | undefined => {
	switch (chainId) {
		case 421613:
			return 'ARB Goerli';

		default:
			return undefined;
	}
};
