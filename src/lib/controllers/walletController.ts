import { ethers } from 'ethers';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import { getChainDisplayName, isValidChain } from '$lib/utils/helpers/networkHelper';
import { chainStore } from '$lib/data-stores/chainProviderStore';
import { WALLET_TYPE } from '$lib/utils/constants/constants';
import { PUBLIC_PROJECT_ID } from '$env/static/public';
import type { SessionTypes } from '@walletconnect/types';
import UniversalProvider from '@walletconnect/universal-provider';
import { Web3Modal } from '@web3modal/standalone';
import { resetWalletProviderStore } from '$lib/data-stores/walletProviderStore';
import { get } from 'svelte/store';
import { resetReceiverStakingStore } from '$lib/data-stores/receiverStakingStore';

export async function connectWallet(walletType: WALLET_TYPE) {
	const provider = await getWalletProvider(walletType);
	sessionStorage.setItem('connectType', walletType);

	if (provider !== undefined) {
		const walletSigner = provider.getSigner();
		console.log('metamaskWalletSigner', walletSigner);
		const walletChecksumAddress = await walletSigner.getAddress();
		const walletHexAddress = walletChecksumAddress.toLowerCase() as Lowercase<string>;
		walletStore.set({
			walletType: walletType,
			provider: provider,
			signer: walletSigner,
			address: walletHexAddress
		});

		const { chainId, name } = await provider.getNetwork();
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

async function getWalletProvider(walletType: WALLET_TYPE) {
	try {
		if (walletType === WALLET_TYPE.metamask) {
			return await getMetamaskWalletProvider();
		} else if (walletType === WALLET_TYPE.walletconnect) {
			return await getWalletConnectProvider();
		} else {
			throw new Error('Invalid wallet type');
		}
	} catch (error) {
		console.log(error);
	}
}

async function getMetamaskWalletProvider() {
	console.log('connecting to metamask...');
	const metamaskProvider = window.ethereum;

	metamaskProvider.on('accountsChanged', (accounts: string[]) => {
		console.log('account changed to', accounts[0]);
		connectWallet(WALLET_TYPE.metamask);
	});

	metamaskProvider.on('chainChanged', (networkId: string) => {
		//TODO: add network change handler
		console.log('network changed to', networkId);
		connectWallet(WALLET_TYPE.metamask);
	});

	try {
		await metamaskProvider.request({ method: 'eth_requestAccounts' });
		console.log('connected to wallet.');
	} catch (error) {
		console.log('error while connecting to wallet', error);
	}

	return new ethers.providers.Web3Provider(metamaskProvider);
}

let wallletConnectProvider: UniversalProvider;
let web3Modal: Web3Modal;
async function getWalletConnectProvider() {
	console.log('connecting to wallet connect...');

	wallletConnectProvider = await UniversalProvider.init({
		logger: 'info',
		projectId: PUBLIC_PROJECT_ID
		// metadata: {
		//   name: "React App",
		//   description: "React App for WalletConnect",
		//   url: "https://walletconnect.com/",
		//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
		// },
	});
	_subscribeToProviderEvents(wallletConnectProvider);

	const client = wallletConnectProvider.client;

	web3Modal = new Web3Modal({
		walletConnectVersion: 2, // or 2
		projectId: PUBLIC_PROJECT_ID,
		standaloneChains: ['eip155:421613', 'eip155:1'],
		themeZIndex: 9999
	});
	web3Modal.setTheme({
		themeMode: 'light',
		themeColor: 'blue',
		themeBackground: 'gradient'
	});

	await wallletConnectProvider.connect({
		namespaces: {
			eip155: {
				methods: [
					'eth_sendTransaction',
					'eth_signTransaction',
					'eth_sign',
					'personal_sign',
					'eth_signTypedData'
				],
				chains: ['eip155:421613'],
				events: ['connect', 'disconnect', 'chainChanged', 'accountsChanged'],
				rpcMap: { 421613: 'https://goerli-rollup.arbitrum.io/rpc' }
			}
		}
	});

	//  Create Web3 Provider
	const web3Provider = new ethers.providers.Web3Provider(wallletConnectProvider);
	console.log(web3Provider);

	const _accounts = await wallletConnectProvider.enable();
	console.log('_accounts', _accounts);
	web3Modal?.closeModal();

	console.log('connected to wallet connect');
	return web3Provider;
}

export async function disconnectWalletConnect() {
	try {
		await wallletConnectProvider.disconnect();
		resetWalletProviderStore();
		console.log('wallet disconnected from the button');
	} catch (error) {
		console.log(error);
	}
}

async function _subscribeToProviderEvents(_client: UniversalProvider) {
	if (!_client) throw Error('No events to subscribe to b/c the provider does not exist');

	try {
		_client.on('display_uri', async (uri: string) => {
			console.log('EVENT', 'QR Code Modal open');
			web3Modal?.openModal({ uri });
		});

		// Subscribe to session ping
		_client.on('session_ping', ({ id, topic }: { id: number; topic: string }) => {
			console.log('EVENT', 'session_ping');
			console.log(id, topic);
		});

		// Subscribe to session event
		_client.on('session_event', ({ event, chainId }: { event: any; chainId: string }) => {
			console.log('EVENT', 'session_event');
			console.log(event, chainId);
		});

		// Subscribe to session update
		_client.on(
			'session_update',
			({ topic, session }: { topic: string; session: SessionTypes.Struct }) => {
				console.log('EVENT', 'session_updated');
				//   setSession(session);
			}
		);

		// Subscribe to session delete
		_client.on('session_delete', ({ id, topic }: { id: number; topic: string }) => {
			console.log('EVENT', 'session_deleted');
			console.log(id, topic);
			resetWalletProviderStore();
		});
	} catch (e) {
		console.log(e);
	}
}

export async function disconnectWallet() {
	const walletType = get(walletStore).walletType;
	if (walletType === WALLET_TYPE.metamask) {
		resetWalletProviderStore();
		resetReceiverStakingStore();
	} else if (walletType === WALLET_TYPE.walletconnect) {
		await disconnectWalletConnect();
		resetReceiverStakingStore();
	}
}
