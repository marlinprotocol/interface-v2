import { writable, type Writable } from 'svelte/store';
import { DEFAULT_WALLET_BALANCE, DEFAULT_WALLET_STORE } from '../utils/constants/storeConstants';
import type { WalletBalance, WalletStore } from '../types/storeTypes';
import { walletStore } from './walletProviderStore';
import { getMpondBalance, getPondBalance } from '$lib/controllers/subgraphController';

let walletAddress: Lowercase<string> = DEFAULT_WALLET_STORE.hexAddress;

// svelte store
export const walletBalance: Writable<WalletBalance> = writable(DEFAULT_WALLET_BALANCE);

// subcription to walletStore allows us to fetch
// balance when the user has a valid wallet address
walletStore.subscribe((value) => {
	walletAddress = value.hexAddress;
	if (walletAddress !== DEFAULT_WALLET_STORE.hexAddress) {
		setWalletBalance(walletAddress);
	}
});

/**
 * fetches the balance for Pond and Mpond based on
 * wallet address and sets the walletBalance store.
 * @param walletAddress: should be a Hex Address i.e. all lowercase
 */
async function setWalletBalance(walletAddress: WalletStore['hexAddress']): Promise<void> {
	Promise.all([getPondBalance(walletAddress), getMpondBalance(walletAddress)])
		.then((results) => {
			walletBalance.set({
				pond: results[0],
				mpond: results[1]
			});
			console.log('!! Wallet balance updated !!');
		})
		.catch((error) => {
			console.log('error while setting wallet balance');
			console.log(error);
		});
}

/**
 * Reset wallet balance to zero.
 */
export function resetWalletBalanceStore(): void {
	walletBalance.set(DEFAULT_WALLET_BALANCE);
}
