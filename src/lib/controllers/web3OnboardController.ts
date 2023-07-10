import Onboard from '@web3-onboard/core';
import type { OnboardAPI } from '@web3-onboard/core';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import gnosisModule from '@web3-onboard/gnosis';
import icon from '../../logos/logo-name.svg';
import infinityWalletWalletModule from '@web3-onboard/infinity-wallet';
import injectedWalletsModule from '@web3-onboard/injected-wallets';
import ledgerModule from '@web3-onboard/ledger';
import trezorModule from '@web3-onboard/trezor';
import walletConnectModule from '@web3-onboard/walletconnect';

const injected = injectedWalletsModule();
const ledger = ledgerModule({
	walletConnectVersion: 2,
	projectId: '85c0877a4199946ad75f772be3aab90d',
	requiredChains: [42161, 421613]
});
const coinbaseWalletSdk = coinbaseWalletModule();
const gnosis = gnosisModule();
const infinityWalletSDK = infinityWalletWalletModule();
const trezor = trezorModule({
	email: 'roshan@blackfishtech.in',
	appUrl: 'https://app2.aragog.live'
});
const walletConnect = walletConnectModule({
	projectId: '85c0877a4199946ad75f772be3aab90d',
	requiredChains: [42161, 421613],
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
