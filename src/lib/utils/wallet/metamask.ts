import { ethers } from 'ethers';
import { walletStore } from './walletProviderStore';
import { getMpondBalance, getPondBalance, walletBalance } from './walletBalanceStore';

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
	const metamaskAddress = await metamaskSigner.getAddress();
	const metamaskPondBalance = await getPondBalance(metamaskProvider, metamaskAddress);
	const metamaskMpondBalance = await getMpondBalance(metamaskProvider, metamaskAddress);

	walletStore.set({
		provider: metamaskProvider,
		signer: metamaskSigner,
		address: metamaskAddress
	});
	walletBalance.set({
		pond: metamaskPondBalance,
		mpond: metamaskMpondBalance
	});

	console.log('Metamask wallet address:', metamaskAddress);
	console.log('!! Wallet store updated !!');
}
