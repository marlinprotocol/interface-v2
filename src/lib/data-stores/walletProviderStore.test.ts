import { describe, it, expect, vi } from 'vitest';
import { get } from 'svelte/store';

import {
	DEFAULT_WALLET_STORE,
	DEFAULT_WALLET_BALANCE_STORE
} from '$lib/utils/constants/storeDefaults';
import { getBalanceOfToken } from '$lib/controllers/contract/usdc';
import {
	addMockToWalletBalanceStore,
	addMpondToWalletBalanceStore,
	addPondToWalletBalanceStore,
	addUsdcToWalletBalanceStore,
	initializeWalletBalancesStore,
	initializeWalletStore,
	resetWalletBalanceStore,
	resetWalletProviderStore,
	walletAddressHasChanged,
	walletBalanceStore,
	walletStore,
	withdrawMockFromWalletBalanceStore,
	withdrawMpondFromWalletBalanceStore,
	withdrawPondFromWalletBalanceStore,
	withdrawUsdcFromWalletBalanceStore
} from './walletProviderStore';
import type { ethers } from 'ethers';

import type { Address } from '$lib/types/storeTypes';
import type { BrowserProvider } from 'ethers';

vi.mock('$lib/controllers/contract/usdc', () => ({
	getBalanceOfToken: vi.fn()
}));

vi.mock('$lib/controllers/contract/usdc');
vi.mock('../src/lib/data-stores/chainProviderStore');

describe('walletProviderStore', () => {
	it('should reset wallet store to default', () => {
		resetWalletProviderStore();
		expect(get(walletStore)).toEqual(DEFAULT_WALLET_STORE);
	});

	it('should reset wallet balance store to default', async () => {
		walletBalanceStore.set({
			pond: 0n,
			mpond: 0n,
			usdc: 22n,
			mock: 3n
		});
		resetWalletBalanceStore();
		expect(get(walletBalanceStore)).toEqual(DEFAULT_WALLET_BALANCE_STORE);
	});

	it('should add POND to wallet balance store', () => {
		addPondToWalletBalanceStore(100n);
		expect(get(walletBalanceStore).pond).toBe(100n);
	});

	it('should withdraw POND from wallet balance store', () => {
		resetWalletBalanceStore();
		addPondToWalletBalanceStore(100n);
		withdrawPondFromWalletBalanceStore(50n);
		expect(get(walletBalanceStore).pond).toBe(50n);
	});

	it('should add MPOND to wallet balance store', () => {
		resetWalletBalanceStore();
		addMpondToWalletBalanceStore(100n);
		expect(get(walletBalanceStore).mpond).toBe(100n);
	});

	it('should withdraw MPOND from wallet balance store', () => {
		resetWalletBalanceStore();
		addMpondToWalletBalanceStore(100n);
		withdrawMpondFromWalletBalanceStore(50n);
		expect(get(walletBalanceStore).mpond).toBe(50n);
	});

	it('should add USDC to wallet balance store', () => {
		resetWalletBalanceStore();
		addUsdcToWalletBalanceStore(100n);
		expect(get(walletBalanceStore).usdc).toBe(100n);
	});

	it('should withdraw USDC from wallet balance store', () => {
		resetWalletBalanceStore();
		addUsdcToWalletBalanceStore(100n);
		withdrawUsdcFromWalletBalanceStore(50n);
		expect(get(walletBalanceStore).usdc).toBe(50n);
	});

	it('should add MOCK to wallet balance store', () => {
		resetWalletBalanceStore();
		addMockToWalletBalanceStore(100n);
		expect(get(walletBalanceStore).mock).toBe(100n);
	});

	it('should withdraw MOCK from wallet balance store', () => {
		resetWalletBalanceStore();
		addMockToWalletBalanceStore(100n);
		withdrawMockFromWalletBalanceStore(50n);
		expect(get(walletBalanceStore).mock).toBe(50n);
	});

	it('should detect wallet address change', () => {
		expect(walletAddressHasChanged('0x123', '0x456')).toBe(true);
		expect(walletAddressHasChanged('0x123', '0x123')).toBe(false);
		expect(walletAddressHasChanged('', '0x123')).toBe(false);
	});
});

describe('initializeWalletStore', () => {
	it('should initialize the wallet store with the provided values', () => {
		const mockProvider = {} as ethers.BrowserProvider;
		const mockSigner = {} as ethers.JsonRpcSigner;
		const mockAddress = '0x1234567890abcdef' as Lowercase<Address>;

		initializeWalletStore(mockProvider, mockSigner, mockAddress);

		const wallet = get(walletStore);
		expect(wallet.provider).toBe(mockProvider);
		expect(wallet.signer).toBe(mockSigner);
		expect(wallet.address).toBe(mockAddress);
	});
});

describe('initializeWalletBalancesStore', () => {
	const mockWalletAddress: Address = '0x1234567890abcdef1234567890abcdef12345678';
	const mockProvider = {} as BrowserProvider;

	beforeEach(() => {
		vi.clearAllMocks();
	});
	it('should set wallet balances correctly', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(getBalanceOfToken as any)
			.mockResolvedValueOnce(100n)
			.mockResolvedValueOnce(200n)
			.mockResolvedValueOnce(300n)
			.mockResolvedValueOnce(400n);

		await initializeWalletBalancesStore(mockWalletAddress, mockProvider);

		const balances = get(walletBalanceStore);
		expect(balances).toEqual({
			...DEFAULT_WALLET_BALANCE_STORE,
			pond: 100n,
			mpond: 200n,
			usdc: 300n,
			mock: 400n
		});
	});

	it('should handle errors gracefully', async () => {
		const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
		vi.mocked(getBalanceOfToken).mockRejectedValue(new Error('Test error'));

		await initializeWalletBalancesStore(mockWalletAddress, mockProvider);

		expect(consoleLogSpy).toHaveBeenCalledWith('error while setting wallet balance');
		expect(consoleLogSpy).toHaveBeenCalledWith(new Error('Test error'));
	});
});
