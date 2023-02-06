import type {
	ChainStore,
	ContractAbi,
	ContractAddress,
	EpochStore,
	ReceiverStakingData,
	WalletBalance,
	WalletStore
} from '$lib/types/storeTypes';
import { BigNumber, ethers } from 'ethers';

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
export const DEFAULT_CONTRACT_ABI_STORE: ContractAbi = {
	ERC20: [],
	ClusterRegistry: [],
	StakeManager: [],
	RewardDelegators: [],
	ReceiverStaking: [],
	EpochSelector: [],
	MPond: []
};

// addressStore
export const DEFAULT_CONTRACT_ADDRESS_STORE: ContractAddress = {
	StakeManager: '',
	RewardDelegators: '',
	ClusterRegistry: '',
	ClusterRewards: '',
	ReceiverStaking: '',
	EpochSelector: {},
	Bridge: '',
	tokens: {}
};

// receiver staked, queued data store
export const DEFAULT_RECEIVER_STAKING_DATA: ReceiverStakingData = {
	approvedBalance: BigNumber.from(0),
	stakedBalance: BigNumber.from(0),
	queued: {
		epoch: 0,
		balance: BigNumber.from(0)
	}
};

// default epoch data
export const DEFAULT_EPOCH_STORE: EpochStore = {
	epochCycle: 171,
	epochStartTime: 1673222400,
	epochLength: 14400
};
