import { writable, type Writable } from 'svelte/store';
import { DEFAULT_WALLET_BALANCE, DEFAULT_WALLET_STORE } from '$lib/utils/constants/storeDefaults';
import type { Address, WalletBalance, WalletStore } from '$lib/types/storeTypes';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import { getMpondBalance, getPondBalance } from '$lib/controllers/subgraphController';

let walletAddress: Address = DEFAULT_WALLET_STORE.address;

// svelte store
export const walletBalance: Writable<WalletBalance> = writable(DEFAULT_WALLET_BALANCE);

// subcription to walletStore allows us to fetch
// balance when the user has a valid wallet address
walletStore.subscribe((value) => {
	walletAddress = value.address;
	if (walletAddress !== DEFAULT_WALLET_STORE.address) {
		setWalletBalance(walletAddress);
	}
});

/**
 * fetches the balance for Pond and Mpond based on
 * wallet address and sets the walletBalance store.
 * @param walletAddress: should be a Hex Address i.e. all lowercase
 */
async function setWalletBalance(walletAddress: WalletStore['address']): Promise<void> {
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
 * Reset wallet balance to its default value.
 */
export function resetWalletBalanceStore(): void {
	walletBalance.set(DEFAULT_WALLET_BALANCE);
}
