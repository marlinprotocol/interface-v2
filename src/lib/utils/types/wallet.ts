import type { ethers } from 'ethers';

export type WalletStore = {
	provider: ethers.providers.Web3Provider | null;
	signer: ethers.providers.JsonRpcSigner | null;
	address: string;
};

export type WalletProvider = {
	id: number;
	provider: string;
	connect: () => Promise<void>;
}[];

export type WalletBalance = {
	pond: string;
	mpond: string;
};
