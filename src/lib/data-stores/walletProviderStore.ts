import { derived, writable, type Readable, type Writable } from 'svelte/store';
import type { Address, WalletBalanceStore, WalletStore } from '$lib/types/storeTypes';
import {
	DEFAULT_WALLET_BALANCE_STORE,
	DEFAULT_WALLET_STORE
} from '$lib/utils/constants/storeDefaults';
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
 * Wallet balance store holds the balance of usdc, pond and mpond tokens for the connected wallet
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
	address: Lowercase<Address>
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
export function withdrawPondFromWalletBalanceStore(amount: bigint) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			pond: walletBalanceStore.pond - amount
		};
	});
}
export function addMpondToWalletBalanceStore(amount: bigint) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			mpond: walletBalanceStore.mpond + amount
		};
	});
}
export function withdrawMpondFromWalletBalanceStore(amount: bigint) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			mpond: walletBalanceStore.mpond - amount
		};
	});
}
export function addUsdcToWalletBalanceStore(amount: bigint) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			usdc: walletBalanceStore.usdc + amount
		};
	});
}
export function withdrawUsdcFromWalletBalanceStore(amount: bigint) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			usdc: walletBalanceStore.usdc - amount
		};
	});
}
export function addMockToWalletBalanceStore(amount: bigint) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			mock: walletBalanceStore.mock + amount
		};
	});
}
export function withdrawMockFromWalletBalanceStore(amount: bigint) {
	walletBalanceStore.update((walletBalanceStore) => {
		return {
			...walletBalanceStore,
			mock: walletBalanceStore.mock - amount
		};
	});
}
/**
 * fetches the balance for POND, MPond and USDC based on
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

		if (tokens.includes('POND')) {
			const pondBalance = await getBalanceOfToken(
				walletAddress,
				chainConfig.tokens.POND?.address as Address,
				walletProvider
			);
			balances = { ...balances, pond: pondBalance };
		} else {
			balances = { ...balances, pond: 0n };
		}

		if (tokens.includes('MPOND')) {
			const mpondBalance = await getBalanceOfToken(
				walletAddress,
				chainConfig.tokens.MPOND?.address as Address,
				walletProvider
			);
			balances = { ...balances, mpond: mpondBalance };
		} else {
			balances = { ...balances, mpond: 0n };
		}

		if (tokens.includes('USDC')) {
			const usdcBalance = await getBalanceOfToken(
				walletAddress,
				chainConfig.tokens.USDC?.address as Address,
				walletProvider
			);
			balances = { ...balances, usdc: usdcBalance };
		} else {
			balances = { ...balances, usdc: 0n };
		}

		if (tokens.includes('MOCK')) {
			const mockBalance = await getBalanceOfToken(
				walletAddress,
				chainConfig.tokens.MOCK?.address as Address,
				walletProvider
			);
			balances = { ...balances, mock: mockBalance };
		} else {
			balances = { ...balances, mock: 0n };
		}

		walletBalanceStore.set(balances);
		console.log('balances set', balances);
		console.log('Wallet balance updated');
	} catch (error) {
		console.log('error while setting wallet balance');
		console.log(error);
	}
}

export function walletAddressHasChanged(
	currentWalletAddress: Address,
	previousWalletAddress: Address
) {
	if (currentWalletAddress !== '') {
		return previousWalletAddress !== currentWalletAddress;
	}
	return false;
}
