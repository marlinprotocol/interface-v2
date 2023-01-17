import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import { connectMetamask } from './metamask';
import { connectWalletConnect } from './walletConnect';
import type { ethers } from 'ethers';

export type WalletStore = {
	provider: ethers.providers.Web3Provider | null;
	signer: ethers.providers.JsonRpcSigner | null;
	address: string;
	pondBalance: string;
	mpondBalance: string;
};

type WalletProvider = {
	id: number;
	provider: string;
	connect: () => Promise<void>;
}[];

export const walletProviders: WalletProvider = [
	{ id: 1, provider: 'Metamask', connect: connectMetamask },
	{ id: 2, provider: 'WalletConnect', connect: connectWalletConnect }
];

// svelte stores
export const walletStore: Writable<WalletStore> = writable({
	provider: null,
	signer: null,
	address: '',
	pondBalance: '0',
	mpondBalance: '0'
});

export const connected: Readable<boolean> = derived(walletStore, ($walletStore) => {
	return Boolean($walletStore.provider);
});

/**
 *  Reset all the values in the walletStore,
 *  changes the session storage value of connected to false when called
 */
export function resetWalletStore(): void {
	walletStore.set({
		provider: null,
		signer: null,
		address: '',
		pondBalance: '0',
		mpondBalance: '0'
	});
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
