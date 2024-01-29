import type { EIP1193Provider, WalletState } from '@web3-onboard/core';
import { getChainInfo, isValidChain } from '$lib/utils/helpers/networkHelper';
import { initializeChainStore, resetChainStore } from '$lib/data-stores/chainProviderStore';
import {
	initializeWalletBalancesStore,
	initializeWalletStore,
	resetWalletBalanceStore
} from '$lib/data-stores/walletProviderStore';

import { ethers } from 'ethers';
import onboard from '$lib/controllers//web3OnboardController';
import { resetBridgeStore } from '$lib/data-stores/bridgeStore';
import { resetEpochCycleStore } from '$lib/data-stores/epochCycleStore';
import { resetOysterStore } from '$lib/data-stores/oysterStore';
import { resetReceiverStakingStore } from '$lib/data-stores/receiverStakingStore';
import { resetWalletProviderStore } from '$lib/data-stores/walletProviderStore';

async function createEthersProviderAndSigner(provider: EIP1193Provider) {
	const ethersProvider = new ethers.BrowserProvider(provider);

	if (provider !== undefined) {
		const ethersSigner = await ethersProvider.getSigner();
		return { ethersProvider, ethersSigner };
	} else {
		console.error('wallet provider is undefined');
		return { ethersProvider: undefined, ethersSigner: undefined };
	}
}

async function getWalletAddressAndConnectedChain(
	signer: ethers.JsonRpcSigner,
	provider: ethers.BrowserProvider
) {
	const [walletChecksumAddress, networkData] = await Promise.all([
		signer.getAddress(),
		provider.getNetwork()
	]);
	const walletHexAddress = walletChecksumAddress.toLowerCase() as Lowercase<string>;
	const { chainId, name } = networkData;
	const validChain = isValidChain(Number(chainId));
	const chainDisplayName = getChainInfo(Number(chainId)).displayName;

	return {
		walletHexAddress,
		chainId,
		chainName: name,
		chainDisplayName: chainDisplayName ?? name,
		isValidChain: validChain
	};
}

export async function setWalletAndChainStores(provider: EIP1193Provider) {
	const { ethersProvider, ethersSigner } = await createEthersProviderAndSigner(provider);

	const ethersProviderIsValid = ethersProvider !== undefined && ethersSigner !== undefined;

	if (ethersProviderIsValid) {
		const { walletHexAddress, chainId, chainName, chainDisplayName, isValidChain } =
			await getWalletAddressAndConnectedChain(ethersSigner, ethersProvider);
		initializeWalletStore(ethersProvider, ethersSigner, walletHexAddress);
		initializeChainStore(Number(chainId), chainName, chainDisplayName, isValidChain);
		await initializeWalletBalancesStore(walletHexAddress, ethersProvider);

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
	resetChainStore();
	resetEpochCycleStore();
	resetBridgeStore();
	resetWalletBalanceStore();
	resetWalletProviderStore();
	resetReceiverStakingStore();
	resetOysterStore();
}
