import type { EIP1193Provider, WalletState } from '@web3-onboard/core';
import { getChainDisplayName, isValidChain } from '$lib/utils/helpers/networkHelper';
import { resetWalletBalanceStore, walletStore } from '$lib/data-stores/walletProviderStore';

import { chainStore } from '$lib/data-stores/chainProviderStore';
import { ethers } from 'ethers';
import onboard from '$lib/controllers//web3OnboardController';
import { resetOysterStore } from '$lib/data-stores/oysterStore';
import { resetReceiverStakingStore } from '$lib/data-stores/receiverStakingStore';
import { resetWalletProviderStore } from '$lib/data-stores/walletProviderStore';
import { writable } from 'svelte/store';

const wallets$ = onboard.state.select('wallets');
export const web3WalletStore = writable<WalletState[]>([]);
// wallets$ is an observable so we turn it into a store for easier access throughout the app
wallets$.subscribe((wallets) => {
	web3WalletStore.set(wallets);
});

export function createEthersProviderAndSigner(provider: EIP1193Provider) {
	const ethersProvider = new ethers.providers.Web3Provider(provider);

	if (provider !== undefined) {
		const ethersSigner = ethersProvider.getSigner();
		return { ethersProvider, ethersSigner };
	} else {
		console.error('wallet provider is undefined');
		return { ethersProvider: undefined, ethersSigner: undefined };
	}
}

export async function getWalletAddressAndConnectedChain(
	signer: ethers.providers.JsonRpcSigner,
	provider: ethers.providers.Web3Provider
) {
	const [walletChecksumAddress, networkData] = await Promise.all([
		signer.getAddress(),
		provider.getNetwork()
	]);
	const walletHexAddress = walletChecksumAddress.toLowerCase() as Lowercase<string>;
	const { chainId, name } = networkData;
	const validChain = isValidChain(chainId);
	const chainDisplayName = getChainDisplayName(chainId);

	return {
		walletHexAddress,
		chainId,
		chainName: name,
		chainDisplayName: chainDisplayName ?? name,
		isValidChain: validChain
	};
}

export async function setWalletAndChainStores(provider: EIP1193Provider) {
	const { ethersProvider, ethersSigner } = createEthersProviderAndSigner(provider);

	const providerIsValid = ethersProvider !== undefined && ethersSigner !== undefined;

	if (providerIsValid) {
		const { walletHexAddress, chainId, chainName, chainDisplayName, isValidChain } =
			await getWalletAddressAndConnectedChain(ethersSigner, ethersProvider);

		walletStore.set({
			provider: ethersProvider,
			signer: ethersSigner,
			address: walletHexAddress
		});
		chainStore.set({
			chainId: chainId,
			chainName: chainName,
			chainDisplayName: chainDisplayName ?? chainName,
			isValidChain: isValidChain
		});
		console.log('walletStore updated with address:', walletHexAddress);
		console.log(
			'chainStore updated to chainId:',
			chainId,
			'| chainName:',
			chainName,
			'| isValidChain:',
			isValidChain
		);
	}
}

export function disconnectWallet(wallets: WalletState[]) {
	onboard.disconnectWallet({ label: wallets?.[0]?.label });
	resetWalletBalanceStore();
	resetWalletProviderStore();
	resetReceiverStakingStore();
	resetOysterStore();
}
