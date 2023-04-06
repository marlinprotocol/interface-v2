<script lang="ts">
	import {
		connectWallet,
		disconnectWallet,
		web3WalletStore
	} from '$lib/controllers/walletController';
	import onboard from '$lib/controllers/web3OnboardController';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import ConnectWalletButton from './ConnectWalletButton.svelte';
	import DisconnectWalletButton from './DisconnectWalletButton.svelte';

	$: connectedAccount = $web3WalletStore?.[0];
	$: if (connectedAccount) {
		console.log('inside reactive if statement');
		connectWallet(connectedAccount.provider);
	}

	const connect = async () => {
		console.log('connecting to the wallet...');
		const connection = await onboard.connectWallet();
		console.log('connection', connection);
	};

	const disconnect = () => {
		disconnectWallet($web3WalletStore);
	};
</script>

{#if $connected}
	<DisconnectWalletButton {disconnect} />
{:else}
	<ConnectWalletButton {connect} />
{/if}
