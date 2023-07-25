import type { BigNumber, Signer, providers } from 'ethers';
import type {
	OysterInventoryDataModel,
	OysterMarketplaceDataModel
} from '$lib/types/oysterComponentType';

//common types
export type Address = string;

// wallet provider store
export type WalletStore = {
	provider: providers.Provider | undefined;
	signer: Signer | undefined;
	address: Address;
};

// wallet balance store
export type WalletBalance = {
	pond: BigNumber;
	mPond: BigNumber;
	usdc: BigNumber;
};

// chain store
export type ChainStore = {
	chainId: number | null;
	chainName: string;
	chainDisplayName: string;
	isValidChain: boolean;
};

// contract abi store
export type ContractAbi = {
	ClusterRegistry: any[];
	ERC20: any[];
	StakeManager: any[];
	RewardDelegators: any[];
	ReceiverStaking: any[];
	EpochSelector: any[];
	MPond: any[];
	Bridge: any[];
};

// address store
export type ContractAddress = {
	STAKE_MANAGER: Address;
	REWARD_DELEGATORS: Address;
	CLUSTER_REGISTRY: Address;
	CLUSTER_REWARDS: Address;
	RECEIVER_STAKING: Address;
	BRIDGE: Address;
	OYSTER: Address;
	POND: Address;
	MPOND: Address;
	USDC: Address;
};

// receiver staking store
export type ReceiverStakingData = {
	signer: Address;
	approvedBalance: BigNumber;
	stakedBalance: BigNumber;
	queuedBalance: BigNumber;
	epochData: {
		epochCycle: number;
		startTime: number;
		epochLength: number;
	};
};

export type EpochCycleStore = number;

export type BridgeStore = {
	allowances: {
		pond: BigNumber;
		mPond: BigNumber;
	};
	requestedMPond: BigNumber;
};

export type OysterStore = {
	providerData: {
		registered?: boolean;
		data?: {
			id: string;
			cp: string;
			live: boolean;
		};
	};
	allMarketplaceData: OysterMarketplaceDataModel[];
	jobsData: OysterInventoryDataModel[];
	allowance: BigNumber;
	merchantJobsData: OysterInventoryDataModel[];
	marketplaceLoaded: boolean;
	oysterStoreLoaded: boolean;
	merchantJobsLoaded: boolean;
	providerDetailsLoaded: boolean;
};

// receiver rewards store
export type ReceiverRewardsData = {
	rewardPerEpoch: BigNumber;
	rewardBalance: BigNumber;
	amountApproved: BigNumber;
};
