import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import { connectMetamask } from '../controllers/metamaskContoller';
import { connectWalletConnect } from '../controllers/walletConnectController';
import type { WalletProvider, WalletStore } from '../types/storeTypes';
import { DEFAULT_WALLET_STORE } from '../utils/constants/storeConstants';
import { VALID_CHAIN_IDS } from '$lib/environments/environment.dev';

export const walletProviders: WalletProvider = [
	{ id: 1, provider: 'Metamask', connect: connectMetamask },
	{ id: 2, provider: 'WalletConnect', connect: connectWalletConnect }
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

// This stores connection between reloads.
if (browser && JSON.parse(sessionStorage.getItem('connected') || 'false')) {
	if (sessionStorage.getItem('connectType') === 'metamask') {
		connectMetamask().catch(console.error);
	} else if (sessionStorage.getItem('connectType') === 'walletconnect') {
		console.log('walletconnect was connected');
	}
}

// Order of execution matters, subscription to the connected store before
// we call the connect metamask function returns undefined.
connected.subscribe((value) => {
	if (browser) sessionStorage.setItem('connected', JSON.stringify(value));
});

export function isValidNetwork(id: number): boolean {
	return VALID_CHAIN_IDS.includes(id);
}
