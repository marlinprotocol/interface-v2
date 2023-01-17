import { ethers } from 'ethers';
import { walletStore } from './walletProviders';
import ERC20ABI from '../abi.json';
import { PUBLIC_POND_TOKEN_ADDRESS, PUBLIC_MPOND_TOKEN_ADDRESS } from '$env/static/public';

export async function connectMetamask(): Promise<void> {
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
		address: metamaskAddress,
		pondBalance: metamaskPondBalance,
		mpondBalance: metamaskMpondBalance
	});

	console.log('Metamask wallet address:', metamaskAddress);
	console.log('!! Wallet store updated !!');
}

async function getPondBalance(
	provider: ethers.providers.Web3Provider,
	WalletAddress: string
): Promise<string> {
	console.log('fetching POND balance...');
	let pondBalance;
	const pondTokenContract = await new ethers.Contract(
		PUBLIC_POND_TOKEN_ADDRESS,
		ERC20ABI,
		provider
	);
	pondBalance = await pondTokenContract.balanceOf(WalletAddress);
	pondBalance = ethers.utils.formatEther(pondBalance);
	return pondBalance;
}

async function getMpondBalance(
	provider: ethers.providers.Web3Provider,
	WalletAddress: string
): Promise<string> {
	console.log('fetching MPOND balance...');
	let mpondBalance;
	const mpondTokenContract = await new ethers.Contract(
		PUBLIC_MPOND_TOKEN_ADDRESS,
		ERC20ABI,
		provider
	);
	mpondBalance = await mpondTokenContract.balanceOf(WalletAddress);
	mpondBalance = ethers.utils.formatEther(mpondBalance);
	return mpondBalance;
}
