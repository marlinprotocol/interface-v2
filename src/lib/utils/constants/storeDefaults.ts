import type {
	BridgeStore,
	ChainStore,
	ContractAbi,
	ContractAddress,
	OysterStore,
	ReceiverRewardsStore,
	ReceiverStakingData,
	WalletBalanceStore,
	WalletStore
} from '$lib/types/storeTypes';

import { environment } from '$lib/data-stores/environment';

// walletProviderStore
export const DEFAULT_WALLET_STORE: WalletStore = {
	provider: undefined,
	signer: undefined,
	address: ''
};

// walletBalanceStore
export const DEFAULT_WALLET_BALANCE_STORE: WalletBalanceStore = {
	pond: 0n,
	mpond: 0n,
	usdc: 0n
};

// chainProviderStore
export const DEFAULT_CHAIN_STORE: ChainStore = {
	chainId: environment.default_chain_id,
	chainName: environment.valid_chains[environment.default_chain_id].chain_name,
	chainDisplayName: '',
	chainImage: '',
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
	approvedBalance: 0n,
	stakedBalance: 0n,
	queuedBalance: 0n,
	epochData: {
		epochCycle: 0,
		startTime: 0,
		epochLength: 1
	}
};

// bridgeStore
export const DEFAULT_BRIDGE_STORE: BridgeStore = {
	allowances: {
		pond: 0n,
		mPond: 0n
	},
	requestedMPond: 0n
};

// oysterStore
export const DEFAULT_OYSTER_STORE: OysterStore = {
	providerData: {
		registered: false,
		data: undefined
	},
	allMarketplaceData: [],
	jobsData: [],
	allowance: 0n,
	merchantJobsData: [],
	marketplaceLoaded: false,
	oysterStoreLoaded: false,
	merchantJobsLoaded: false,
	providerDetailsLoaded: false
};

// receiverRewardsStore
export const DEFAULT_RECEIVER_REWARDS_STORE: ReceiverRewardsStore = {
	rewardPerEpoch: 0n,
	rewardBalance: 0n,
	amountApproved: 0n,
	epochDuration: 0,
	startTime: 0,
	lastTicketIssuedEpoch: undefined
};
