import type { BigNumber, providers, Signer } from 'ethers';
import type { WalletType } from './controllerTypes';

// wallet provider store
export type WalletStore = {
	provider: providers.Provider | undefined;
	signer: Signer | undefined;
	address: Lowercase<string>;
};

export type WalletProvider = {
	id: number;
	provider: WalletType;
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
	StakeManager: string;
	RewardDelegators: string;
	ClusterRegistry: string;
	ClusterRewards: string;
	ReceiverStaking: string;
	EpochSelector: any;
	Bridge: string;
	tokens: any;
};
