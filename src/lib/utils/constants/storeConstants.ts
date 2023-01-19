// walletProviderStore
export const DEFAULT_WALLET_STORE = {
	provider: null,
	signer: null,
	hexAddress: '',
	checksumAddress: '',
	pondBalance: '0',
	mpondBalance: '0'
};

// walletBalanceStore
export const DEFAULT_WALLET_BALANCE = {
	pond: 0,
	mpond: 0,
	readablePond: 0,
	readableMpond: 0
};

// chainProviderStore
export const DEFAULT_CHAIN_STORE = { chainId: null, chainName: '' };
