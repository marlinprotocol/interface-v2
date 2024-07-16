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

describe('initializeWalletBalancesStore', () => {
	const mockWalletAddress = '0x1234567890123456789012345678901234567890';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const mockWalletProvider = {} as any;

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('should handle errors and log them', async () => {
		const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
		vi.mocked(getBalanceOfToken).mockRejectedValue(new Error('API error'));

		await initializeWalletBalancesStore(mockWalletAddress, mockWalletProvider);

		expect(consoleLogSpy).toHaveBeenCalledWith('error while setting wallet balance');
		expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));

		consoleLogSpy.mockRestore();
	});
	it('should handle errors and log them', async () => {
		const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
		vi.mocked(getBalanceOfToken).mockRejectedValue(new Error('API error'));

		await initializeWalletBalancesStore(mockWalletAddress, mockWalletProvider);

		expect(consoleLogSpy).toHaveBeenCalledWith('error while setting wallet balance');
		expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));

		consoleLogSpy.mockRestore();
	});
});
