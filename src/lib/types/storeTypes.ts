import type { BigNumber, providers, Signer } from 'ethers';
import type { OysterInventoryDataModel, OysterMarketplaceDataModel } from './oysterComponentType';

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
	StakeManager: Address;
	RewardDelegators: Address;
	ClusterRegistry: Address;
	ClusterRewards: Address;
	ReceiverStaking: Address;
	EpochSelector: Record<string, Address>;
	Bridge: Address;
	tokens: Record<string, any>;
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
