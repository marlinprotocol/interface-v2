import Onboard from '@web3-onboard/core';
import type { OnboardAPI } from '@web3-onboard/core';
import injectedWalletsModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import ledgerModule from '@web3-onboard/ledger';
import trezorModule from '@web3-onboard/trezor';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import gnosisModule from '@web3-onboard/gnosis';
import torusModule from '@web3-onboard/torus';

const injected = injectedWalletsModule();
const torus = torusModule();
const ledger = ledgerModule();
const coinbaseWalletSdk = coinbaseWalletModule();
const gnosis = gnosisModule();
const trezor = trezorModule({
	email: '<EMAIL_CONTACT>',
	appUrl: '<APP_URL>'
});
const walletConnect = walletConnectModule({
	connectFirstChainId: true,
	qrcodeModalOptions: {
		mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
	}
});

const wallets = [injected, walletConnect, ledger, trezor, coinbaseWalletSdk, gnosis, torus];

const chains = [
	{
		id: 42161,
		token: 'ETH',
		label: 'Arbitrum One',
		rpcUrl: 'https://arbiscan.io/rpc'
	},
	{
		id: 421613,
		token: 'AGOR',
		label: 'Arbitrum Görli',
		rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc'
	}
];

const appMetadata = {
	name: 'Marlin',
	icon: '<svg />',
	logo: '<svg />',
	description: 'Marlin Onboarding',
	recommendedInjectedWallets: [
		{ name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
		{ name: 'MetaMask', url: 'https://metamask.io' }
	]
};
let onboard;

if (!onboard) {
	onboard = Onboard({
		wallets,
		chains,
		appMetadata,
		accountCenter: {
			desktop: { enabled: false },
			mobile: { enabled: false }
		},
		connect: {
			autoConnectLastWallet: true
		}
	});
}

export default onboard as OnboardAPI;
