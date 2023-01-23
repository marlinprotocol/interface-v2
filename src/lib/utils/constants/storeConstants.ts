import type { ChainStore, WalletBalance, WalletStore } from '$lib/types/storeTypes';

// walletProviderStore
export const DEFAULT_WALLET_STORE: WalletStore = {
	provider: null,
	signer: null,
	hexAddress: '',
	checksumAddress: ''
};

// walletBalanceStore
export const DEFAULT_WALLET_BALANCE: WalletBalance = {
	pond: 0,
	mpond: 0
};

// chainProviderStore
export const DEFAULT_CHAIN_STORE: ChainStore = { chainId: null, chainName: '' };
