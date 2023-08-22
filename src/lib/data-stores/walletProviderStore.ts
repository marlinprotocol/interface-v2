import { derived, writable, type Readable, type Writable } from 'svelte/store';
import type { Address, WalletBalanceStore, WalletStore } from '$lib/types/storeTypes';
import {
	DEFAULT_WALLET_BALANCE_STORE,
	DEFAULT_WALLET_STORE
} from '$lib/utils/constants/storeDefaults';
import {
	getMPondBalanceFromSubgraph,
	getPondBalanceFromSubgraph,
	getUsdcBalanceFromProvider
} from '$lib/controllers/subgraphController';
import onboard from '$lib/controllers/web3OnboardController';
import type { WalletState } from '@web3-onboard/core';
import type { BigNumber, ethers } from 'ethers';

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
export const walletBalanceStore: Writable<WalletBalanceStore> = writable(
	DEFAULT_WALLET_BALANCE_STORE
);
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

export function initializeWalletStore(
	provider: ethers.providers.Web3Provider,
	signer: ethers.providers.JsonRpcSigner,
	address: Lowercase<string>
) {
	walletStore.set({
		provider,
		signer,
		address
	});
}

/**
 * reset walletBalanceStore to its default value.
 */
export function resetWalletBalanceStore(): void {
	walletBalanceStore.set(DEFAULT_WALLET_BALANCE_STORE);
}

export function addPondToWalletBalanceStore(amount: BigNumber) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			pond: walletBalanceStore.pond.add(amount)
		};
	});
}
export function addMpondToWalletBalanceStore(amount: BigNumber) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			mPond: walletBalanceStore.mPond.add(amount)
		};
	});
}
export function withdrawPondFromWalletBalanceStore(amount: BigNumber) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			pond: walletBalanceStore.pond.sub(amount)
		};
	});
}
export function withdrawMpondFromWalletBalanceStore(amount: BigNumber) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			mPond: walletBalanceStore.mPond.sub(amount)
		};
	});
}
/**
 * fetches the balance for POND and MPond based on
 * wallet address and sets the walletBalanceStore store.
 * @param walletAddress should be a Hex Address i.e. all lowercase
 */
async function setWalletBalance(walletAddress: Address, walletProvider: any): Promise<void> {
	try {
		const balances = await Promise.all([
			getPondBalanceFromSubgraph(walletAddress),
			getMPondBalanceFromSubgraph(walletAddress),
			getUsdcBalanceFromProvider(walletAddress, walletProvider)
		]);
		walletBalanceStore.set({
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
