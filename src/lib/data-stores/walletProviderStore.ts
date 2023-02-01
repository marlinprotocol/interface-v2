import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { WalletOptions, WalletStore } from '../types/storeTypes';
import { DEFAULT_WALLET_STORE } from '../utils/constants/storeDefaults';
import { WALLET_TYPE } from '$lib/utils/constants/constants';
import { connectWallet } from '$lib/controllers/walletController';

export const walletOptions: WalletOptions = [
	{ id: 1, provider: WALLET_TYPE.metamask },
	{ id: 2, provider: WALLET_TYPE.walletconnect }
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
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore: we get connectType only when connected is true
		connectWallet(sessionStorage.getItem('connectType')).catch(console.error);
		console.log(`restoring ${sessionStorage.getItem('connectType')} connection`);
	}

	// Order of execution matters, subscription to the connected store before
	// we call the connect metamask function returns undefined.
	connected.subscribe((value) => {
		if (browser) sessionStorage.setItem('connected', JSON.stringify(value));
	});
}
