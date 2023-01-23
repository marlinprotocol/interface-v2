import type { BigNumber, providers } from 'ethers';

// wallet provider store
export type WalletStore = {
	provider: providers.Web3Provider | null;
	signer: providers.JsonRpcSigner | null;
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
	pond: BigNumber;
	mpond: BigNumber;
};

// chain store
export type ChainStore = {
	chainId: number | null;
	chainName: string;
};
