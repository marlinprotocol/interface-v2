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
export const mPondPrecisions = 6;

export const amountPrecision = (token: 'pond' | 'mPond') => {
	switch (token) {
		case 'pond':
			return pondPrecisions;
		case 'mPond':
			return mPondPrecisions;
		default:
			return 2;
	}
};

export const BigNumberZero = BigNumber.from(0);
