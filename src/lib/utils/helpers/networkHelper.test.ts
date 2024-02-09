import { describe, expect, it, afterEach, vi } from 'vitest';
import { isValidChain, switchChain } from './networkHelper';
import { PUBLIC_NODE_ENV } from '$env/static/public';
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
