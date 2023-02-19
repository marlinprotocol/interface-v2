import { ethers } from 'ethers';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import { isValidChain, switchChain } from '$lib/utils/helpers/networkHelper';
import { chainStore } from '$lib/data-stores/chainProviderStore';
import { WALLET_TYPE } from '$lib/utils/constants/constants';
import ENVIRONMENT from '$lib/environments/environment';

export async function connectWallet(walletType: WALLET_TYPE) {
	const walletProvider = await getWalletProvider(walletType);

	const { chainId, name } = await walletProvider.getNetwork();

	// update network store
	chainStore.set({ chainId: chainId, chainName: name });

	// if the chain is valid then connect else switch chain
	if (isValidChain(chainId)) {
		try {
			await walletProvider.send('eth_requestAccounts', []);
			sessionStorage.setItem('connectType', walletType);
			console.log('connected to wallet.');
		} catch (error) {
			console.log('error while connecting to wallet', error);
		}

		const walletSigner = walletProvider.getSigner();
		const walletChecksumAddress = await walletSigner.getAddress();
		const walletHexAddress = walletChecksumAddress.toLowerCase() as Lowercase<string>;

		walletStore.set({
			provider: walletProvider,
			signer: walletSigner,
			address: walletHexAddress
		});

		console.log('Wallet type:', walletType);
		console.log('Wallet address:', walletHexAddress);
		console.log('!! Wallet store updated !!');
	} else {
		console.log('Switching to a valid chain.');
		await switchChain(ENVIRONMENT.public_chain_id);
		connectWallet(walletType);
	}
}

async function getWalletProvider(walletType: WALLET_TYPE) {
	if (walletType === WALLET_TYPE.metamask) {
		return await getMetamaskWalletProvider();
	} else if (walletType === WALLET_TYPE.walletconnect) {
		return await getWalletConnectProvider();
	} else {
		throw new Error('Invalid wallet type');
	}
}

async function getMetamaskWalletProvider() {
	console.log('connecting to metamask...');
	const metamaskProvider = window.ethereum;

	metamaskProvider.on('accountsChanged', (accounts: string[]) => {
		connectWallet(WALLET_TYPE.metamask);
	});

	metamaskProvider.on('networkChanged', (networkId: string) => {
		//TODO: add network change handler
		connectWallet(WALLET_TYPE.metamask);
	});

	return new ethers.providers.Web3Provider(metamaskProvider);
}

// TODO: need to integrate wallet connect
async function getWalletConnectProvider() {
	console.log('connecting to wallet connect...');
	return new ethers.providers.Web3Provider(window.ethereum);
}
