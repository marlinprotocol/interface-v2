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
import { BigNumberZero, WALLET_TYPE } from './constants';

// walletProviderStore
export const DEFAULT_WALLET_STORE: WalletStore = {
	walletType: WALLET_TYPE.metamask,
	provider: undefined,
	signer: undefined,
	address: ''
};

// walletBalanceStore
export const DEFAULT_WALLET_BALANCE: WalletBalance = {
	pond: BigNumberZero,
	mPond: BigNumberZero
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
	approvedBalance: BigNumberZero,
	stakedBalance: BigNumberZero,
	queuedBalance: BigNumberZero,
	epochData: {
		epochCycle: 0,
		startTime: 0,
		epochLength: 1
	}
};

export const DEFAULT_BRIDGE_STORE: BridgeStore = {
	allowances: {
		pond: BigNumberZero,
		mPond: BigNumberZero
	},
	requestedMPond: BigNumberZero
};

export const DEFAULT_OYSTER_STORE: OysterStore = {
	providerData: {
		registered: false
	},
	allMarketplaceData: [],
	jobsData: [],
	allowance: BigNumberZero,
	merchantJobsData: [],
	marketplaceLoaded: false,
	oysterStoreLoaded: false,
	merchantJobsLoaded: false,
	providerDetailsLoaded: false
};
