import { ethers } from 'ethers';
import { resetWalletBalanceStore, walletStore } from '$lib/data-stores/walletProviderStore';
import { getChainDisplayName, isValidChain } from '$lib/utils/helpers/networkHelper';
import { chainStore } from '$lib/data-stores/chainProviderStore';
import { WALLET_TYPE } from '$lib/utils/constants/constants';
import { resetWalletProviderStore } from '$lib/data-stores/walletProviderStore';
import { get } from 'svelte/store';
import { resetReceiverStakingStore } from '$lib/data-stores/receiverStakingStore';
// import WalletConnectProvider from '@walletconnect/web3-provider';
let metamaskProvider;
// let walletConnectProvider: WalletConnectProvider;
export async function connectWallet(walletType) {
    const provider = await getWalletProvider(walletType);
    sessionStorage.setItem('connectType', walletType);
    if (provider !== undefined) {
        const walletSigner = provider.getSigner();
        console.log('WalletSigner', walletSigner);
        const [walletChecksumAddress, networkData] = await Promise.all([
            walletSigner.getAddress(),
            provider.getNetwork()
        ]);
        // const walletChecksumAddress = await walletSigner.getAddress();
        const walletHexAddress = walletChecksumAddress.toLowerCase();
        walletStore.set({
            walletType: walletType,
            provider: provider,
            signer: walletSigner,
            address: walletHexAddress
        });
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
async function getWalletProvider(walletType) {
    try {
        if (walletType === WALLET_TYPE.metamask) {
            return await getMetamaskWalletProvider();
        }
        else if (walletType === WALLET_TYPE.walletconnect) {
            return await getWalletConnectProvider();
        }
        else {
            throw new Error('Invalid wallet type');
        }
    }
    catch (error) {
        console.log(error);
    }
}
async function getMetamaskWalletProvider() {
    console.log('connecting to metamask...');
    metamaskProvider = window.ethereum;
    _subscribeToProviderEvents(metamaskProvider, WALLET_TYPE.metamask);
    try {
        await metamaskProvider.request({ method: 'eth_requestAccounts' });
        console.log('connected to wallet.');
    }
    catch (error) {
        console.log('error while connecting to wallet', error);
    }
    return new ethers.providers.Web3Provider(metamaskProvider);
}
async function getWalletConnectProvider() {
    console.log('connecting to wallet connect...');
    // walletConnectProvider = new WalletConnectProvider({
    // 	rpc: {
    // 		1: 'https://mainnet.infura.io/v3/f69c3698961e47d7834969e8c4347c1b',
    // 		421613: 'https://goerli-rollup.arbitrum.io/rpc'
    // 	}
    // });
    // //  Enable session (triggers QR Code modal)
    // await walletConnectProvider.enable();
    // _subscribeToProviderEvents(walletConnectProvider, WALLET_TYPE.walletconnect);
    // return new ethers.providers.Web3Provider(walletConnectProvider);
}
async function _subscribeToProviderEvents(_provider, walletType) {
    if (!_provider)
        throw Error('No events to subscribe to b/c the provider does not exist');
    try {
        _provider.on('connect', async (uri) => {
            console.log('EVENT', 'QR Code Modal open');
        });
        _provider.on('disconnect', (code, reason) => {
            console.log(code, reason);
            console.log(walletType);
            resetWalletProviderStore();
        });
        _provider.on('accountsChanged', (accounts) => {
            console.log('EVENT', 'accountsChanged');
            console.log('account changed to', accounts[0]);
            if (accounts[0] === undefined) {
                resetWalletProviderStore();
            }
        });
        _provider.on('chainChanged', (networkId) => {
            connectWallet(walletType);
            console.log('network changed to', networkId);
        });
    }
    catch (e) {
        console.log(e);
    }
}
export async function disconnectWallet() {
    const walletType = get(walletStore).walletType;
    if (walletType === WALLET_TYPE.metamask) {
        resetWalletBalanceStore();
        resetWalletProviderStore();
        resetReceiverStakingStore();
    }
    else if (walletType === WALLET_TYPE.walletconnect) {
        await disconnectWalletConnect();
    }
}
export async function disconnectWalletConnect() {
    try {
        // await walletConnectProvider.disconnect();
        resetWalletBalanceStore();
        resetWalletProviderStore();
        resetReceiverStakingStore();
        console.log('wallet disconnected from the button');
    }
    catch (error) {
        console.log(error);
    }
}
//# sourceMappingURL=walletController.js.map