import { ethers } from 'ethers';
import { walletStore } from '../data-stores/walletProviderStore';
import { walletBalance } from '../data-stores/walletBalanceStore';
import { getMpondBalance, getPondBalance } from '$lib/controllers/subgraphController';
import { isValidNetwork, switchToValidNetwork } from '$lib/utils/helpers/networkHelper';
import { chainStore } from '$lib/data-stores/chainProviderStore';
import { amountDivideByPow18 } from '$lib/utils/conversion';

export async function connectMetamask() {
	console.log('connecting to metamask...');

	// establish metamask connection
	const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
	const { chainId, name } = await metamaskProvider.getNetwork();

	// update network store
	chainStore.set({ chainId: chainId, chainName: name });

	// if the chain is valid then connect else switch chain
	if (isValidNetwork(chainId)) {
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
			pond: ethers.BigNumber.from(metamaskPondBalance),
			mpond: ethers.BigNumber.from(metamaskMpondBalance)
		});

		console.log('Metamask wallet address:', metamaskChecksumAddress);
		console.log('!! Wallet store updated !!');
	} else {
		console.log('Switching to a valid chain.');
		switchToValidNetwork();
	}
}
