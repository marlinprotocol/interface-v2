import { getChainDisplayName, getImageForChain, isValidChain, switchChain } from './networkHelper';
import { PUBLIC_NODE_ENV } from '$env/static/public';
import { staticImages } from '$lib/components/images/staticImages';
import onboard from '$lib/controllers/web3OnboardController';
import type { EIP1193Provider } from '@web3-onboard/core';
import * as walletController from '$lib/controllers/walletController';

describe('isValidChain', () => {
	if (PUBLIC_NODE_ENV === 'development') {
		it('should return true if chain is valid', () => {
			expect(isValidChain(421613)).toBe(true);
		});
		it('should return false for invalid chain', () => {
			expect(isValidChain(1)).toBe(false);
			expect(isValidChain(42161)).toBe(false);
		});
	}
	if (PUBLIC_NODE_ENV === 'arb_mainnet') {
		it('should return true if chain is valid', () => {
			expect(isValidChain(42161)).toBe(true);
		});
		it('should return false for invalid chain', () => {
			expect(isValidChain(1)).toBe(false);
			expect(isValidChain(421613)).toBe(false);
		});
	}
});

describe('switchChain', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should set the chain through web3Onboard and set wallet and chain stores when chain is valid', async () => {
		const setWalletAndChainStoresSpy = vi
			.spyOn(walletController, 'setWalletAndChainStores')
			.mockImplementation((provider: EIP1193Provider) => {
				console.log(provider);
				return Promise.resolve();
			});
		const setChainSpy = vi.spyOn(onboard, 'setChain').mockResolvedValue(true);
		const consoleSpy = vi.spyOn(console, 'log');
		await switchChain(421613, {} as EIP1193Provider);

		expect(setChainSpy).toHaveBeenCalledWith({ chainId: 421613 });
		expect(consoleSpy).toHaveBeenCalledWith('setting wallet and chain stores due to chain switch');
		expect(setWalletAndChainStoresSpy).toHaveBeenCalledWith({} as EIP1193Provider);
	});
});

describe('getChainDisplayName', () => {
	it('should return correct chain name if the chain is supported in our app', () => {
		expect(getChainDisplayName(1)).toBe('Ethereum');
		expect(getChainDisplayName(42161)).toBe('Arbitrum One');
		expect(getChainDisplayName(421613)).toBe('Arbitrum Goerli');
		expect(getChainDisplayName(59144)).toBe('Linea');
		expect(getChainDisplayName(59140)).toBe('Linea Goerli');
	});
	it('should return undefined when the chain is not supported in our app', () => {
		expect(getChainDisplayName(2)).toBe(undefined);
	});
});

describe('getImageForChain', () => {
	it('should return correct chain image if the chain is supported in our app', () => {
		expect(getImageForChain(1)).toBe(staticImages.EthereumLogo);
		expect(getImageForChain(42161)).toBe(staticImages.ArbitrumLogo);
		expect(getImageForChain(421613)).toBe(staticImages.ArbitrumLogo);
		expect(getImageForChain(59144)).toBe(staticImages.LineaLogo);
		expect(getImageForChain(59140)).toBe(staticImages.LineaLogo);
	});
	it('should return undefined when the chain is not supported in our app', () => {
		expect(getImageForChain(2)).toBe(undefined);
	});
});
