import type {
	BridgeStore,
	ChainStore,
	ContractAbi,
	ContractAddress,
	OysterStore,
	ReceiverStakingData,
	WalletBalance,
	WalletStore
} from '$lib/types/storeTypes';

import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';

// walletProviderStore
export const DEFAULT_WALLET_STORE: WalletStore = {
	provider: undefined,
	signer: undefined,
	address: ''
};

// walletBalanceStore
export const DEFAULT_WALLET_BALANCE: WalletBalance = {
	pond: BIG_NUMBER_ZERO,
	mPond: BIG_NUMBER_ZERO,
	usdc: BIG_NUMBER_ZERO
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
	STAKE_MANAGER: '',
	REWARD_DELEGATORS: '',
	CLUSTER_REGISTRY: '',
	CLUSTER_REWARDS: '',
	RECEIVER_STAKING: '',
	BRIDGE: '',
	OYSTER: '',
	POND: '',
	MPOND: '',
	USDC: ''
};

// receiver staked, queued data store
export const DEFAULT_RECEIVER_STAKING_DATA: ReceiverStakingData = {
	signer: '',
	approvedBalance: BIG_NUMBER_ZERO,
	stakedBalance: BIG_NUMBER_ZERO,
	queuedBalance: BIG_NUMBER_ZERO,
	epochData: {
		epochCycle: 0,
		startTime: 0,
		epochLength: 1
	}
};

// bridgeStore
export const DEFAULT_BRIDGE_STORE: BridgeStore = {
	allowances: {
		pond: BIG_NUMBER_ZERO,
		mPond: BIG_NUMBER_ZERO
	},
	requestedMPond: BIG_NUMBER_ZERO
};

// oysterStore
export const DEFAULT_OYSTER_STORE: OysterStore = {
	providerData: {
		registered: false
	},
	allMarketplaceData: [],
	jobsData: [],
	allowance: BIG_NUMBER_ZERO,
	merchantJobsData: [],
	marketplaceLoaded: false,
	oysterStoreLoaded: false,
	merchantJobsLoaded: false,
	providerDetailsLoaded: false
};

// receiverRewardsStore
export const DEFAULT_RECEIVER_REWARDS_DATA = {
	rewardPerEpoch: BIG_NUMBER_ZERO,
	rewardBalance: BIG_NUMBER_ZERO,
	amountApproved: BIG_NUMBER_ZERO
};
