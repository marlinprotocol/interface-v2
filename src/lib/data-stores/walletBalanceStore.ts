import { writable, type Writable } from 'svelte/store';
import { DEFAULT_WALLET_BALANCE } from '../utils/constants/storeConstants';
import type { WalletBalance } from '../utils/types/wallet';

export const walletBalance: Writable<WalletBalance> = writable(DEFAULT_WALLET_BALANCE);

/**
 * Reset wallet balance to Zero
 */
export function resetWalletBalance(): void {
	walletBalance.set(DEFAULT_WALLET_BALANCE);
}
