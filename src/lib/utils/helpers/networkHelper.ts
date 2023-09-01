import { NETWORK_INFO } from '$lib/utils/constants/network';
import { addToast } from '$lib/data-stores/toastStore';
import { environment } from '$lib/data-stores/environment';
import { setWalletAndChainStores } from '$lib/controllers/walletController';
import { staticImages } from '$lib/components/images/staticImages';

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
		case 1:
			return 'Ethereum';
		case 42161:
			return 'ARB One';
		case 421613:
			return 'ARB Goerli';
		case 59144:
			return 'Linea';
		default:
			return undefined;
	}
};

export const getImageForChain = (chainId: number | null) => {
	switch (chainId) {
		case 1:
			return staticImages.EthereumLogo;
		case 42161:
			return staticImages.ArbitrumLogo;
		case 421613:
			return staticImages.ArbitrumLogo;
		case 59144:
			return staticImages.LineaLogo;
		default:
			return staticImages.ArbitrumLogo;
	}
};
