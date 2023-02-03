import type {
	ChainStore,
	ReceiverStakeBalanceSnapshotData,
	WalletBalance,
	WalletStore
} from '$lib/types/storeTypes';
import { ethers } from 'ethers';

// walletProviderStore
export const DEFAULT_WALLET_STORE: WalletStore = {
	provider: undefined,
	signer: undefined,
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
	ReceiverStaking: [],
	EpochSelector: [],
	MPond: []
};

// addressStore
export const DEFAULT_CONTRACT_ADDRESS_STORE = {
	StakeManager: '',
	RewardDelegators: '',
	ClusterRegistry: '',
	ClusterRewards: '',
	ReceiverStaking: '',
	EpochSelector: {},
	Bridge: '',
	tokens: {}
};

// default receiver stake queued data
export const DEFAULT_RECEIVER_BALANCE_SNAPSHOT_DATA: ReceiverStakeBalanceSnapshotData = {
	balance: BigInt('0'),
	epoch: BigInt('0')
};

// default receiver stake balance data
export const DEFAULT_RECEIVER_BALANCE_DATA: BigInt = BigInt('0');
