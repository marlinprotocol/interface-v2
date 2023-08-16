import { derived, writable, type Readable, type Writable } from 'svelte/store';
import type { Address, WalletBalance, WalletStore } from '$lib/types/storeTypes';
import { DEFAULT_WALLET_BALANCE, DEFAULT_WALLET_STORE } from '$lib/utils/constants/storeDefaults';
import {
	getMPondBalanceFromSubgraph,
	getPondBalanceFromSubgraph,
	getUsdcBalanceFromProvider
} from '$lib/controllers/subgraphController';
import onboard from '$lib/controllers/web3OnboardController';
import type { WalletState } from '@web3-onboard/core';

// web3-onboard stores
const wallets$ = onboard.state.select('wallets');
export const web3WalletStore = writable<WalletState[]>([]);
// wallets$ is an observable so we turn it into a store for easier access throughout the app
wallets$.subscribe((wallets) => {
	web3WalletStore.set(wallets);
});

let walletAddress: Address = DEFAULT_WALLET_STORE.address;
let walletProvider: any;

// local svelte stores
/**
 * Wallet store holds the wallet type, wallet address along with attached providera and signer
 */
export const walletStore: Writable<WalletStore> = writable(DEFAULT_WALLET_STORE);
/**
 * Wallet balance store holds the balance of POND and MPond for the connected wallet
 */
export const walletBalance: Writable<WalletBalance> = writable(DEFAULT_WALLET_BALANCE);
/**
 * Connected store holds the boolean value of whether the wallet is connected or not
 */
export const connected: Readable<boolean> = derived(walletStore, ($walletStore) => {
	return Boolean($walletStore.provider);
});

/**
 *  reset the walletStore to its default value
 */
export function resetWalletProviderStore(): void {
	walletStore.set(DEFAULT_WALLET_STORE);
}

/**
 * reset walletBalanceStore to its default value.
 */
export function resetWalletBalanceStore(): void {
	walletBalance.set(DEFAULT_WALLET_BALANCE);
}

/**
 * fetches the balance for POND and MPond based on
 * wallet address and sets the walletBalance store.
 * @param walletAddress should be a Hex Address i.e. all lowercase
 */
async function setWalletBalance(walletAddress: Address, walletProvider: any): Promise<void> {
	try {
		const balances = await Promise.all([
			getPondBalanceFromSubgraph(walletAddress),
			getMPondBalanceFromSubgraph(walletAddress),
			getUsdcBalanceFromProvider(walletAddress, walletProvider)
		]);
		walletBalance.set({
			pond: balances[0],
			mPond: balances[1],
			usdc: balances[2]
		});
		console.log('Wallet balance updated');
	} catch (error) {
		console.log('error while setting wallet balance');
		console.log(error);
	}
}

// subscription to walletStore allows us to fetch wallet balance
// when the user has a valid wallet address
walletStore.subscribe((value) => {
	walletAddress = value.address;
	walletProvider = value.provider;
	if (walletAddress !== DEFAULT_WALLET_STORE.address && Object.keys(walletProvider).length > 0) {
		setWalletBalance(walletAddress, walletProvider);
	}
});
