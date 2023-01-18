import { ethers } from 'ethers';
import { walletStore } from './walletProviderStore';
import { walletBalance } from './walletBalanceStore';
import { getMpondBalance, getPondBalance } from '$lib/controllers/subgraphController';

export async function connectMetamask() {
	console.log('connecting to metamask...');

	// establish metamask connection
	const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);

	try {
		await metamaskProvider.send('eth_requestAccounts', []);
		sessionStorage.setItem('connectType', 'metamask');
		console.log('connected to metamask wallet.');
	} catch (error) {
		console.log('error while connecting to metamask', error);
	}

	const metamaskSigner = metamaskProvider.getSigner();
	const metamaskChecksumAddress = await metamaskSigner.getAddress();
	const metamaskHexAddress = metamaskChecksumAddress.toLowerCase();
	const metamaskPondBalance = await getPondBalance(metamaskHexAddress);
	const metamaskMpondBalance = await getMpondBalance(metamaskHexAddress);

	walletStore.set({
		provider: metamaskProvider,
		signer: metamaskSigner,
		hexAddress: metamaskHexAddress,
		checksumAddress: metamaskChecksumAddress
	});
	walletBalance.set({
		pond: metamaskPondBalance,
		mpond: metamaskMpondBalance
	});

	console.log('Metamask wallet address:', metamaskChecksumAddress);
	console.log('!! Wallet store updated !!');
}
