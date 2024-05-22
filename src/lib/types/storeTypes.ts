import type { Signer, ethers } from 'ethers';
import type {
	OysterInventoryDataModel,
	OysterMarketplaceDataModel
} from '$lib/types/oysterComponentType';

//common types
export type Address = string;

// wallet provider store
export type WalletStore = {
	provider: ethers.BrowserProvider | undefined;
	signer: Signer | undefined;
	address: Address;
};

// wallet balance store
export type WalletBalanceStore = {
	pond: bigint;
	mpond: bigint;
	usdc: bigint;
};

// chain store
export type ChainStore = {
	chainId: number | null;
	chainName: string;
	chainDisplayName: string;
	chainImage: string;
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
	OYSTER_CREDIT: Address;
};

// receiver staking store
export type ReceiverStakingData = {
	signer: Address;
	approvedBalance: bigint;
	stakedBalance: bigint;
	queuedBalance: bigint;
	epochData: {
		epochCycle: number;
		startTime: number;
		epochLength: number;
	};
};

export type EpochCycleStore = number;

export type BridgeStore = {
	allowances: {
		pond: bigint;
		mPond: bigint;
	};
	requestedMPond: bigint;
};

export type OysterStore = {
	providerData: {
		registered?: boolean;
		data?: {
			id: string;
			cp: string | undefined;
			live: boolean;
		};
	};
	allMarketplaceData: OysterMarketplaceDataModel[];
	jobsData: OysterInventoryDataModel[];
	allowance: bigint;
	merchantJobsData: OysterInventoryDataModel[];
	marketplaceLoaded: boolean;
	oysterStoreLoaded: boolean;
	merchantJobsLoaded: boolean;
	providerDetailsLoaded: boolean;
	credits: {
		isWhitelisted: boolean;
		balance: bigint;
	};
};

// receiver rewards store
export type ReceiverRewardsStore = {
	rewardPerEpoch: bigint;
	rewardBalance: bigint;
	amountApproved: bigint;
	startTime: number;
	epochDuration: number;
	lastTicketIssuedEpoch: number | undefined;
};

// local storage store types
export type OysterLocalStorageDataModel = {
	[chainId: string]: {
		[walletAddress: string]: OysterInventoryDataModel[];
	};
};
