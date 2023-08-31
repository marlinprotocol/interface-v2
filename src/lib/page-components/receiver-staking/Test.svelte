<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';

	import { getReceiverPondBalanceFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainConfigStore, chainStore } from '$lib/data-stores/chainProviderStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected, walletBalanceStore, walletStore } from '$lib/data-stores/walletProviderStore';
	import { environment } from '$lib/data-stores/environment';
	import type { ChainStore, WalletBalanceStore, WalletStore } from '$lib/types/storeTypes';
	import { MESSAGES } from '$lib/utils/constants/messages';
	import { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import {
		depositStakingToken,
		withdrawStakingToken
	} from '$lib/controllers/contract/receiverStaking';
	import { approveToken } from '$lib/controllers/contract/token';

	let wallet: WalletStore;
	let balance: WalletBalanceStore;
	let chain: ChainStore;
	let contractAbiDetails = {};
	let contractAddressDetails = {};
	let pageTitle = 'Marlin Receiver Staking Portal (Ignore this part)';

	const unsubscribeWalletProviderStore: Unsubscriber = walletStore.subscribe(
		(value: WalletStore) => {
			wallet = value;
		}
	);
	const unsubscribeWalletBalanceStore: Unsubscriber = walletBalanceStore.subscribe(
		(value: WalletBalanceStore) => {
			balance = value;
		}
	);
	const unsubscribeChainProviderStore: Unsubscriber = chainStore.subscribe((value: ChainStore) => {
		chain = value;
	});

	const unsubscribeContractAddressStore: Unsubscriber = contractAddressStore.subscribe((value) => {
		contractAddressDetails = value;
	});

	function onClickHandlerForToastError() {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.APPROVE.POND(11),
			variant: 'error'
		});
	}
	function onClickHandlerForToastInfo() {
		addToast({
			message: 'Hello, World!, Again',
			variant: 'info'
		});
	}
	function onClickHandlerForToastSuccess() {
		addToast({
			message: 'Hello, World!, Again',
			variant: 'success',
			dismissible: false
		});
	}

	onDestroy(unsubscribeWalletProviderStore);
	onDestroy(unsubscribeWalletBalanceStore);
	onDestroy(unsubscribeChainProviderStore);
	onDestroy(unsubscribeContractAddressStore);
</script>

<div>
	<h2 class="text-primary text-2xl font-bold my-5">{pageTitle}</h2>
	<div>Environment: {environment.environment_name}</div>
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
		on:click={() =>
			approveToken($chainConfigStore.tokens.POND, BigNumber.from(500), $contractAddressStore.POND)}
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
	<div>Modal Buttons to control modal (uses label element under the hood)</div>
	<div class="flex justify-center gap-3">
		<ModalButton disabled={true} styleClass="w-fit" modalFor="connect-wallet-modal"
			>this is a modal button</ModalButton
		>
		<ModalButton styleClass="w-fit" modalFor="connect-wallet-modal"
			>this is a modal button</ModalButton
		>
		<ModalButton variant="outlined" styleClass="w-fit" modalFor="connect-wallet-modal"
			>this is a modal button</ModalButton
		>
	</div>
</div>
