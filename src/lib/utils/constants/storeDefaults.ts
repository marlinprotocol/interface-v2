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

// contractAbiStore
export const DEFAULT_CONTRACT_ABI_STORE = {
	ERC20: [],
	ClusterRegistry: [],
	StakeManager: [],
	RewardDelegators: [],
	ReceiversStaking: [],
	EpochSelector: [],
	MPond: []
};

// addressStore
export const DEFAULT_CONTRACT_ADDRESS_STORE = {
	StakeManager: '',
	RewardDelegators: '',
	ClusterRegistry: '',
	ClusterRewards: '',
	ReceiversStaking: '',
	EpochSelector: {},
	Bridge: '',
	tokens: {}
};
