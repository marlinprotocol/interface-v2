import Onboard from '@web3-onboard/core';
import type { OnboardAPI } from '@web3-onboard/core';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import { environment } from '$lib/data-stores/environment';
import gnosisModule from '@web3-onboard/gnosis';
import icon from '../../logos/logo-name.svg';
import infinityWalletWalletModule from '@web3-onboard/infinity-wallet';
import injectedWalletsModule from '@web3-onboard/injected-wallets';
import ledgerModule from '@web3-onboard/ledger';
import trezorModule from '@web3-onboard/trezor';
import walletConnectModule from '@web3-onboard/walletconnect';

const valid_chain_ids = Object.keys(environment.valid_chains).map((chainId) => parseInt(chainId));
const valid_chains_metadata = Object.entries(environment.valid_chains).map(
	([chainId, chainConfig]) => ({
		id: parseInt(chainId),
		token: chainConfig.chain_token,
		label: chainConfig.chain_name,
		rpcUrl: chainConfig.rpc_url
	})
);

const injected = injectedWalletsModule();
const ledger = ledgerModule({
	walletConnectVersion: 2,
	projectId: import.meta.env.VITE_PROJECT_ID,
	requiredChains: valid_chain_ids
});
const coinbaseWalletSdk = coinbaseWalletModule();
const gnosis = gnosisModule();
const infinityWalletSDK = infinityWalletWalletModule();
const trezor = trezorModule({
	email: environment.trezor_email,
	appUrl: environment.dapp_url
});
const walletConnect = walletConnectModule({
	projectId: import.meta.env.VITE_PROJECT_ID,
	requiredChains: valid_chain_ids
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

const chains = valid_chains_metadata;

const appMetadata = {
	name: 'Marlin',
	logo: icon,
	description: 'Marlin Onboarding',
	recommendedInjectedWallets: [{ name: 'MetaMask', url: 'https://metamask.io' }]
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
