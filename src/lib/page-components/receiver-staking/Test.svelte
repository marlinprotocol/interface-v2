<script lang="ts">
	import {
		approvePondTokenForReceiverStaking,
		depositStakingToken,
		getContractDetails,
		withdrawStakingToken
	} from '$lib/controllers/contractController';
	import { getReceiverPondBalanceFromSubgraph } from '$lib/controllers/subgraphController';
	import { disconnectWalletConnect } from '$lib/controllers/walletController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected, walletBalance, walletStore } from '$lib/data-stores/walletProviderStore';
	import ENVIRONMENT from '$lib/environments/environment';
	import type { ChainStore, WalletBalance, WalletStore } from '$lib/types/storeTypes';
	import { MESSAGES } from '$lib/utils/constants/messages';
	import { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	let wallet: WalletStore;
	let balance: WalletBalance;
	let chain: ChainStore;
	let contractAbiDetails = {};
	let contractAddressDetails = {};
	let pageTitle = 'Marlin Receiver Staking Portal (Ignore this part)';

	const unsubscribeWalletProviderStore: Unsubscriber = walletStore.subscribe(
		(value: WalletStore) => {
			wallet = value;
		}
	);
	const unsubscribeWalletBalanceStore: Unsubscriber = walletBalance.subscribe(
		(value: WalletBalance) => {
			balance = value;
		}
	);
	const unsubscribeChainProviderStore: Unsubscriber = chainStore.subscribe((value: ChainStore) => {
		chain = value;
	});

	const unsubscribeContractAbiStore: Unsubscriber = contractAbiStore.subscribe((value) => {
		contractAbiDetails = value;
	});

	const unsubscribeContractAddressStore: Unsubscriber = contractAddressStore.subscribe((value) => {
		contractAddressDetails = value;
	});

	function fetchContractDetails() {
		console.log('fetching contract details');
		getContractDetails();
	}

	function onClickHandlerForToastError() {
		console.log('creating an error toast 🥪 ...');
		addToast({
			message: MESSAGES.TOAST.ACTIONS.APPROVE.POND(11),
			variant: 'error'
		});
	}
	function onClickHandlerForToastInfo() {
		console.log('creating an info toast 🥪 ...');
		addToast({
			message: 'Hello, World!, Again',
			variant: 'info'
		});
	}
	function onClickHandlerForToastSuccess() {
		console.log('creating success toast 🥪 ...');
		addToast({
			message: 'Hello, World!, Again',
			variant: 'success',
			dismissible: false
		});
	}

	onDestroy(unsubscribeWalletProviderStore);
	onDestroy(unsubscribeWalletBalanceStore);
	onDestroy(unsubscribeChainProviderStore);
	onDestroy(unsubscribeContractAbiStore);
	onDestroy(unsubscribeContractAddressStore);
</script>

<div>
	<h2 class="text-primary text-2xl font-bold my-5">{pageTitle}</h2>
	<div>Environment: {ENVIRONMENT.environment_name}</div>
	{#if $connected}
		<div>Address: {wallet.address}</div>
		<div>POND Balance: {balance.pond}</div>
		<div>MPond Balance: {balance.mPond}</div>
		<div>Chain ID: {chain.chainId}</div>
		<br />
	{:else}
		The wallet is not connected.
	{/if}
	<br />
	<br />
	<button class="btn btn-secondary" on:click={() => fetchContractDetails()}
		>Fetch contract details</button
	>
	<div>Contract ABI Details</div>
	<pre>{JSON.stringify(contractAbiDetails)}</pre>
	<div>Contract Address Details</div>
	<pre>{JSON.stringify(contractAddressDetails)}</pre>
	<button
		class="btn btn-secondary"
		on:click={() => getReceiverPondBalanceFromSubgraph(wallet.address)}
		>Fetch receiver pond balance</button
	>
	<div>Check console for response</div>
	<button
		class="btn btn-secondary"
		on:click={() => approvePondTokenForReceiverStaking(BigNumber.from(500))}
		>Approve 50 pond from POND contract</button
	>
	<div>Check console for response</div>
	<button class="btn btn-secondary" on:click={() => depositStakingToken(BigNumber.from(5))}
		>Deposit 5 POND to receiver staking contract</button
	>
	<div>Check console for response</div>
	<button class="btn btn-secondary" on:click={() => withdrawStakingToken(BigNumber.from(5))}
		>Withdraw 5 POND from receiver staking contract</button
	>
	<div>Check console for response</div>
	<button class="btn btn-secondary" on:click={() => onClickHandlerForToastError()}
		>Add a new snackbar</button
	>
	<button class="btn btn-secondary" on:click={() => onClickHandlerForToastInfo()}
		>Add a new snackbar</button
	>
	<button class="btn btn-secondary" on:click={() => onClickHandlerForToastSuccess()}
		>Add a new snackbar</button
	>
	<button class="btn btn-secondary" on:click={() => disconnectWalletConnect()}
		>Disconnect Wallet Connect</button
	>
</div>
