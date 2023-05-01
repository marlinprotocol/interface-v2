import { derived, writable, type Readable, type Writable } from 'svelte/store';
import type {
	Address,
	ReceiverStakingData,
	WalletBalance,
	WalletOptions,
	WalletStore
} from '$lib/types/storeTypes';
import { DEFAULT_WALLET_BALANCE, DEFAULT_WALLET_STORE } from '$lib/utils/constants/storeDefaults';
import { WALLET_TYPE } from '$lib/utils/constants/constants';
import {
	getMPondBalance,
	getPondBalance,
	getReceiverStakingDataFromSubgraph
} from '$lib/controllers/subgraphController';
import { receiverStakingStore } from './receiverStakingStore';
import { addToast } from './toastStore';

export const walletOptions: WalletOptions = [
	{ id: 1, provider: WALLET_TYPE.metamask },
	{ id: 2, provider: WALLET_TYPE.walletconnect }
];

let walletAddress: Address = DEFAULT_WALLET_STORE.address;

// svelte stores
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
 * fetches the balance for POND and MPond based on
 * wallet address and sets the walletBalance store.
 * @param walletAddress should be a Hex Address i.e. all lowercase
 */
async function setWalletBalance(walletAddress: Address): Promise<void> {
	try {
		const balances = await Promise.all([
			getPondBalance(walletAddress),
			getMPondBalance(walletAddress)
		]);
		walletBalance.set({
			pond: balances[0],
			mPond: balances[1]
		});
		console.log(' Wallet balance updated ');
	} catch (error) {
		console.log('error while setting wallet balance');
		console.log(error);
	}
}

/**
 *  Resets the walletStore to its default value,
 *  changes the session storage value of connected to false when called
 */
export function resetWalletProviderStore(): void {
	walletStore.set(DEFAULT_WALLET_STORE);
}

/**
 * Reset wallet balance to its default value.
 */
export function resetWalletBalanceStore(): void {
	walletBalance.set(DEFAULT_WALLET_BALANCE);
}

/**
 * Subscriptions to walletStore
 * allows us to fetch wallet balance when the user has a valid wallet address
 */
walletStore.subscribe((value) => {
	walletAddress = value.address;
	if (walletAddress !== DEFAULT_WALLET_STORE.address) {
		setWalletBalance(walletAddress);
	}
});

// subcription to walletStore allows us to fetch
// receiver staked balance, queued data when the user has a valid wallet address
walletStore.subscribe(async (value) => {
	const walletAddress = value.address;
	if (walletAddress !== DEFAULT_WALLET_STORE.address) {
		try {
			const data: ReceiverStakingData = await getReceiverStakingDataFromSubgraph(walletAddress);
			receiverStakingStore.set(data);
		} catch (e) {
			addToast({
				message: 'Error fetching receiver staking data',
				variant: 'error'
			});
			console.error(e);
		}
	}
});
