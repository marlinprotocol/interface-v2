import type {
	BridgeStore,
	ChainStore,
	ContractAbi,
	ContractAddress,
	ReceiverStakingData,
	WalletBalance,
	WalletStore
} from '$lib/types/storeTypes';
import { BigNumber, ethers } from 'ethers';
import { WALLET_TYPE } from './constants';

// walletProviderStore
export const DEFAULT_WALLET_STORE: WalletStore = {
	walletType: WALLET_TYPE.metamask,
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
export const DEFAULT_CHAIN_STORE: ChainStore = {
	chainId: null,
	chainName: '',
	chainDisplayName: '',
	isValidChain: true
};

// contractAbiStore
export const DEFAULT_CONTRACT_ABI_STORE: ContractAbi = {
	ERC20: [],
	ClusterRegistry: [],
	StakeManager: [],
	RewardDelegators: [],
	ReceiverStaking: [],
	EpochSelector: [],
	MPond: [],
	Bridge: []
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
	signer: '',
	approvedBalance: BigNumber.from(0),
	stakedBalance: BigNumber.from(0),
	queuedBalance: BigNumber.from(0),
	epochData: {
		epochCycle: 0,
		startTime: 0,
		epochLength: 1
	}
};

export const DEFAULT_BRIDGE_STORE: BridgeStore = {
	allowances: {
		pond: BigNumber.from(0),
		mpond: BigNumber.from(0)
	}
};
