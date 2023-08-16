import { NETWORK_INFO } from '$lib/utils/constants/network';
import { addToast } from '$lib/data-stores/toastStore';
import { environment } from '$lib/data-stores/environment';
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

export async function switchChain(provider: any, chainId: string) {
	await Promise.all([
		provider.provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: chainId }]
		}),
		setWalletAndChainStores(provider)
	]).catch(async (err) => {
		if (err.code === 4902) {
			if (!NETWORK_INFO[chainId]) {
				addToast({
					variant: 'error',
					message: 'This chain is not supported by the app'
				});
				return;
			}
			await provider.provider.request({
				method: 'wallet_addEthereumChain',
				params: [NETWORK_INFO[chainId]]
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
