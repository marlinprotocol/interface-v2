import type { EIP1193Provider } from '@web3-onboard/core';
import { environment } from '$lib/data-stores/environment';
import onboard from '$lib/controllers/web3OnboardController';
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

export async function switchChain(chainId: number, provider: EIP1193Provider) {
	if (isValidChain(chainId)) {
		const success = await onboard.setChain({ chainId: chainId });
		if (success) {
			setWalletAndChainStores(provider);
		}
	}
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
		case 137:
			return 'Polygon';
		case 59140:
			return 'Linea Goerli';
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
		case 59140:
			return staticImages.LineaLogo;
		case 137:
			return staticImages.PolygonLogo;
		default:
			return staticImages.ArbitrumLogo;
	}
};
