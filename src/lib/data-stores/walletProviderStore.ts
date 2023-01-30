import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { WalletProvider, WalletStore } from '../types/storeTypes';
import { DEFAULT_WALLET_STORE } from '../utils/constants/storeDefaults';
import { WALLET_TYPE_METAMASK, WALLET_TYPE_WALLETCONNECT } from '$lib/utils/constants/constants';
import { connectWallet } from '$lib/controllers/walletController';

export const walletProviders: WalletProvider = [
	{ id: 1, provider: 'Metamask' },
	{ id: 2, provider: 'WalletConnect' }
];

// svelte stores
export const walletStore: Writable<WalletStore> = writable(DEFAULT_WALLET_STORE);

export const connected: Readable<boolean> = derived(walletStore, ($walletStore) => {
	return Boolean($walletStore.provider);
});

/**
 *  Resets the walletStore to its default value,
 *  changes the session storage value of connected to false when called
 */
export function resetWalletProviderStore(): void {
	walletStore.set(DEFAULT_WALLET_STORE);
}

/**
 *  Restores wallet connection based on values in session storage
 */
export function restoreWalletConnection() {
	// This stores connection between reloads.
	if (browser && JSON.parse(sessionStorage.getItem('connected') || 'false')) {
		if (sessionStorage.getItem('connectType') === WALLET_TYPE_METAMASK) {
			connectWallet(WALLET_TYPE_METAMASK).catch(console.error);
			console.log('restoring metamask connection');
		} else if (sessionStorage.getItem('connectType') === WALLET_TYPE_WALLETCONNECT) {
			connectWallet(WALLET_TYPE_WALLETCONNECT).catch(console.error);
			console.log('restoring walletconnect connection');
		}
	}

	// Order of execution matters, subscription to the connected store before
	// we call the connect metamask function returns undefined.
	connected.subscribe((value) => {
		if (browser) sessionStorage.setItem('connected', JSON.stringify(value));
	});
}
