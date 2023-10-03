import { derived, writable, type Readable, type Writable } from 'svelte/store';
import type { Address, WalletBalanceStore, WalletStore } from '$lib/types/storeTypes';
import {
	DEFAULT_WALLET_BALANCE_STORE,
	DEFAULT_WALLET_STORE
} from '$lib/utils/constants/storeDefaults';
import {
	getMPondBalanceFromSubgraph,
	getPondBalanceFromSubgraph
} from '$lib/controllers/subgraphController';
import onboard from '$lib/controllers/web3OnboardController';
import type { WalletState } from '@web3-onboard/core';
import type { BrowserProvider, ethers } from 'ethers';
import { getBalanceOfToken } from '$lib/controllers/contract/usdc';
import type { ChainConfig } from '$lib/types/environmentTypes';
import { chainConfigStore } from './chainProviderStore';

// web3-onboard stores
const wallets$ = onboard.state.select('wallets');
export const web3WalletStore = writable<WalletState[]>([]);
// wallets$ is an observable so we turn it into a store for easier access throughout the app
wallets$.subscribe((wallets) => {
	web3WalletStore.set(wallets);
});
let chainConfig: ChainConfig;
chainConfigStore.subscribe((value) => {
	chainConfig = value;
});

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
	provider: ethers.BrowserProvider,
	signer: ethers.JsonRpcSigner,
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

export function addPondToWalletBalanceStore(amount: bigint) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			pond: walletBalanceStore.pond + amount
		};
	});
}
export function addMpondToWalletBalanceStore(amount: bigint) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			mPond: walletBalanceStore.mpond + amount
		};
	});
}
export function withdrawPondFromWalletBalanceStore(amount: bigint) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			pond: walletBalanceStore.pond - amount
		};
	});
}
export function withdrawMpondFromWalletBalanceStore(amount: bigint) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			mPond: walletBalanceStore.mpond - amount
		};
	});
}
/**
 * fetches the balance for POND and MPond based on
 * wallet address and sets the walletBalanceStore store.
 * @param walletAddress should be a Hex Address i.e. all lowercase
 */
export async function initializeWalletBalancesStore(
	walletAddress: Address,
	walletProvider: BrowserProvider
): Promise<void> {
	try {
		// get all the tokens for current chain
		const tokens = Object.keys(chainConfig.tokens);
		let balances = DEFAULT_WALLET_BALANCE_STORE;

		// get balance from subgaph if subgraph url is provided else get it from contract
		if (tokens.includes('POND') && chainConfig.subgraph_urls.POND !== '') {
			const pondBalance = await getPondBalanceFromSubgraph(walletAddress);
			balances = { ...balances, pond: pondBalance };
		} else {
			const pondBalance = await getBalanceOfToken(
				walletAddress,
				chainConfig.contract_addresses.POND,
				walletProvider
			);
			balances = { ...balances, pond: pondBalance };
		}
		if (tokens.includes('MPOND')) {
			const mpondBalance = await getMPondBalanceFromSubgraph(walletAddress);
			balances = { ...balances, mpond: mpondBalance };
		}
		if (tokens.includes('USDC')) {
			const usdcBalance = await getBalanceOfToken(
				walletAddress,
				chainConfig.contract_addresses.USDC,
				walletProvider
			);
			balances = { ...balances, usdc: usdcBalance };
		}
		walletBalanceStore.set(balances);
		console.log('balances set', balances);
		console.log('Wallet balance updated');
	} catch (error) {
		console.log('error while setting wallet balance');
		console.log(error);
	}
}
