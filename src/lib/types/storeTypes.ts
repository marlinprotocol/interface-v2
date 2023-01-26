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
