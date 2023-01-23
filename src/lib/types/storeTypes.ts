import type { ethers } from 'ethers';

// wallet provider store
export type WalletStore = {
	provider: ethers.providers.Web3Provider | null;
	signer: ethers.providers.JsonRpcSigner | null;
	hexAddress: string;
	checksumAddress: string;
};

export type WalletProvider = {
	id: number;
	provider: string;
	connect: () => Promise<void>;
}[];

// wallet balance store
export type WalletBalance = {
	pond: ethers.BigNumber;
	mpond: ethers.BigNumber;
};

// chain store
export type ChainStore = {
	chainId: number | null;
	chainName: string;
};
