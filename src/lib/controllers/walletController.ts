import { ethers } from 'ethers';
import { resetWalletBalanceStore, walletStore } from '$lib/data-stores/walletProviderStore';
import { getChainDisplayName, isValidChain } from '$lib/utils/helpers/networkHelper';
import { chainStore } from '$lib/data-stores/chainProviderStore';
import { resetWalletProviderStore } from '$lib/data-stores/walletProviderStore';
import onboard from './web3OnboardController';
import type { EIP1193Provider, WalletState } from '@web3-onboard/core';
import { resetReceiverStakingStore } from '$lib/data-stores/receiverStakingStore';
import { resetOysterStore } from '$lib/data-stores/oysterStore';

export const web3WalletStore = onboard.state.select('wallets');
let ethersProvider: ethers.providers.Web3Provider;

export async function connectWallet(provider: EIP1193Provider) {
	ethersProvider = new ethers.providers.Web3Provider(provider);
	console.log('ethersProvider', ethersProvider);

	if (provider !== undefined) {
		// get signer from provider
		const walletSigner = ethersProvider.getSigner();

		// get wallet address from signer and network data from the provider
		const [walletChecksumAddress, networkData] = await Promise.all([
			walletSigner.getAddress(),
			ethersProvider.getNetwork()
		]);
		const walletHexAddress = walletChecksumAddress.toLowerCase() as Lowercase<string>;
		// instead of update we set the wallet store since each provider will overwrite the previous one
		walletStore.set({
			provider: ethersProvider,
			signer: walletSigner,
			address: walletHexAddress
		});

		// setting chain data in chain store
		const { chainId, name } = networkData;
		const validChain = isValidChain(chainId);
		const chainDisplayName = getChainDisplayName(chainId);
		chainStore.set({
			chainId: chainId,
			chainName: name,
			chainDisplayName: chainDisplayName ?? name,
			isValidChain: validChain
		});
	}
}

export function disconnectWallet(wallets: WalletState[]) {
	onboard.disconnectWallet({ label: wallets?.[0]?.label });
	resetWalletBalanceStore();
	resetWalletProviderStore();
	resetReceiverStakingStore();
	resetOysterStore();
}
