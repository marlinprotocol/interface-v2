import type { WALLET_TYPE } from '$lib/utils/constants/constants';
import type { BigNumber, providers, Signer } from 'ethers';

//common types
export type Address = string;

// wallet provider store
export type WalletStore = {
	provider: providers.Provider | undefined;
	signer: Signer | undefined;
	address: Address;
};

export type WalletOptions = {
	id: number;
	provider: WALLET_TYPE;
}[];

// wallet balance store
export type WalletBalance = {
	pond: BigNumber;
	mpond: BigNumber;
};

// chain store
export type ChainStore = {
	chainId: number | null;
	chainName: string;
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
