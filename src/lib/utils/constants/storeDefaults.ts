import type { ChainStore, WalletBalance, WalletStore } from '$lib/types/storeTypes';
import { ethers } from 'ethers';

// walletProviderStore
export const DEFAULT_WALLET_STORE: WalletStore = {
	provider: null,
	signer: null,
	address: ''
};

// walletBalanceStore
export const DEFAULT_WALLET_BALANCE: WalletBalance = {
	pond: ethers.BigNumber.from(0),
	mpond: ethers.BigNumber.from(0)
};

// chainProviderStore
export const DEFAULT_CHAIN_STORE: ChainStore = { chainId: null, chainName: '' };
