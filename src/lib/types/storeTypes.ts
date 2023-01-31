import type { BigNumber, providers } from 'ethers';
import type { WalletType } from './controllerTypes';

// wallet provider store
export type WalletStore = {
	provider: providers.Web3Provider | null;
	signer: providers.JsonRpcSigner | null;
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
export type ContractAbiStore = {
	ClusterRegistry: any[];
	ERC20: any[];
	StakeManager: any[];
	RewardDelegators: any[];
	ReceiversStaking: any[];
	EpochSelector: any[];
	MPond: any[];
};

// address store
export type ContractAddressStore = {
	StakeManager: string;
	RewardDelegators: string;
	ClusterRegistry: string;
	ClusterRewards: string;
	ReceiversStaking: string;
	EpochSelector: any;
	Bridge: string;
	tokens: any;
};
