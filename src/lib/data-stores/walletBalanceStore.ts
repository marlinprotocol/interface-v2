import { writable, type Writable } from 'svelte/store';
import { DEFAULT_WALLET_BALANCE } from '../utils/constants/storeConstants';
import type { WalletBalance } from '../types/storeTypes';

// svelte store
export const walletBalance: Writable<WalletBalance> = writable(DEFAULT_WALLET_BALANCE);

/**
 * Reset wallet balance to zero.
 */
export function resetWalletBalanceStore(): void {
	walletBalance.set(DEFAULT_WALLET_BALANCE);
}
