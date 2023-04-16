import Onboard from '@web3-onboard/core';
import type { OnboardAPI } from '@web3-onboard/core';
import injectedWalletsModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import ledgerModule from '@web3-onboard/ledger';
import trezorModule from '@web3-onboard/trezor';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import gnosisModule from '@web3-onboard/gnosis';
import mewWallet from '@web3-onboard/mew-wallet';
import infinityWalletWalletModule from '@web3-onboard/infinity-wallet';
import icon from '../../logos/logo-name.svg';

const injected = injectedWalletsModule();
const ledger = ledgerModule();
const coinbaseWalletSdk = coinbaseWalletModule();
const gnosis = gnosisModule();
const mewWalletModule = mewWallet();
const infinityWalletSDK = infinityWalletWalletModule();
const trezor = trezorModule({
	email: 'roshan@blackfishtech.in',
	appUrl: 'https://app2.aragog.live'
});
const walletConnect = walletConnectModule({
	connectFirstChainId: true,
	qrcodeModalOptions: {
		mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
	}
});

const wallets = [
	injected,
	walletConnect,
	ledger,
	trezor,
	coinbaseWalletSdk,
	gnosis,
	mewWalletModule,
	infinityWalletSDK
];

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
	logo: icon,
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
