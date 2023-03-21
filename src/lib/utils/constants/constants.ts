import { BigNumber } from 'ethers';

export const enum WALLET_TYPE {
	metamask = 'MetaMask',
	walletconnect = 'WalletConnect'
}
export const GET_OPTIONS = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};

export const pondPrecisions = 2;
export const mPondPrecisions = 4;

export const BigNumberZero = BigNumber.from(0);
