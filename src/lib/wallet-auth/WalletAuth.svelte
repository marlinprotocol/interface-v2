<script type="ts">
	import {
		walletAddress,
		connectMetamask,
		connected,
		disconnect,
		checkNetwork,
		switchNetwork
	} from '../stores/provider';
	import Modal from '$lib/modal/Modal.svelte';
	import { onMount } from 'svelte';

	let walletType = 'NONE';
	let logoutModal = false;
	let connectModal = false;
	let hasMetamask = false;

	onMount(() => {
		hasMetamask = window['ethereum'] ? true : false;
	});

	async function disconnectWalletHandler() {
		await disconnect();
		connectModal = false;
	}

	// connect to metamask wallet if the network is valid or switch to the valid network
	async function connectMetamaskHandler() {
		const isValidNetwork = await checkNetwork(import.meta.env.VITE_NETWORK_ID);
		if (isValidNetwork) {
			await connectMetamask();
			// resetting logout modal state to prevent opening after connect
			logoutModal = false;
		} else {
			await switchNetwork(import.meta.env.VITE_NETWORK_ID);
		}
	}

	$: walletType = $connected ? 'METAMASK' : 'NONE';
	$: chainName = import.meta.env.VITE_NETWORK_NAME || 'UNKNOWN';
</script>

{#if walletType !== 'NONE'}
	<button
		class="flex flex-row justify-center space-x-3 bg-white rounded-lg px-[18px] py-2 shadow-sm hover:shadow-lg transition-shadow duration-000"
		on:click={() => (logoutModal = true)}
	>
		{#if walletType === 'METAMASK'}
			<img src="/images/wallet.svg" alt="metamask icon" width="35" class="my-auto" />
		{:else if walletType == 'WALLETCONNECT'}
			<img src="/images/wallet.svg" alt="wallet connect icon" width="35" class="my-auto" />
		{:else}
			<img src="/images/wallet.svg" alt="unrecognized wallet icon" width="35" class="my-auto" />
		{/if}
		<div class="info flex flex-col">
			<span class="font-[Poppins] font-bold text-primary text-sm">{chainName}</span>
			<span class="font-[Poppins] font-normal text-primary text-[11px]"
				>{$walletAddress.slice(0, 6)}...{$walletAddress.slice($walletAddress.length - 5)}</span
			>
		</div>
	</button>

	{#if logoutModal}
		<Modal bind:value={logoutModal} modalWidth="max-w-[610px]" persistent>
			<p
				slot="title"
				class="modal-title my-auto font-[Poppins] font-bold text-neutral-800 text-2xl"
			>
				Your wallet
			</p>

			<div class="body mt-6 mb-[40px] font-[Poppins]">
				<div class="address-wrapper py-3.5 px-4 bg-gray-100 rounded-lg mb-5">
					<div class="flex ">
						<div class="text-sm font-normal">My Address</div>
						<!-- TODO: implement tooltip and integrate here -->
						<img
							class="ml-1"
							src="./images/infoSecondary.svg"
							alt="You may optionally delegate the tokens in this stash to an operator address now or leave it for later."
						/>
					</div>
					<div class="text-xl font-semibold">{$walletAddress}</div>
				</div>
				<div class="row flex">
					<!-- TODO: extract these buttons to a seperate component -->
					<button
						class="font-medium text-sm text-primary py-3 px-4 flex bg-gray-100 rounded-lg mr-4"
					>
						<img src="./images/copyicon.svg" alt="copy" />
						<div class="ml-3.5">Copy Address</div>
					</button>
					<button class="font-medium text-sm text-primary py-3 px-4 flex bg-gray-100 rounded-lg">
						<img src="./images/openIcon.svg" alt="etherscan" />
						<div class="ml-3.5">View on Etherscan</div>
					</button>
				</div>
			</div>

			<button
				slot="actions"
				class="connect-wallet-btn bg-primary text-center text-white font-bold p-4 w-full text-base bg-primaryBlue rounded-lg"
				on:click={disconnectWalletHandler}
			>
				LOGOUT
			</button>
		</Modal>
	{/if}
{:else}
	<button
		class="flex flex-row space-x-3 items-center bg-transparent outline outline-[1px]  outline-primary rounded-lg p-4 leading-[1.313]"
		on:click={() => (connectModal = true)}
	>
		<img src="/images/lockicon.svg" alt="wallet icon" class="my-auto" />
		<span class="font-semibold font-[poppins] text-sm text-primary flex items-center"
			>Connect Wallet</span
		>
	</button>
	{#if connectModal}
		<Modal bind:value={connectModal} persistent>
			<div slot="title">
				<p class="my-auto font-[Poppins] font-medium text-neutral-800/60 text-sm">Unlock Wallet</p>
				<p class="my-auto font-[Poppins] font-bold text-neutral-800 text-2xl">Select a provider</p>
			</div>
			<div class="flex flex-row justify-evenly gap-5 mt-4">
				<div class="connect-card p-4 w-full bg-gray-100 rounded-lg h-fit">
					<img class="mx-auto mb-4 h-16" src="/images/metamaskicon.svg" alt="metamask icon" />
					<p class="heading pb-6 text-lg font-semibold text-center">MetaMask</p>

					<button
						on:click={connectMetamaskHandler}
						disabled={!hasMetamask}
						class:bg-gray-400={!hasMetamask}
						class:bg-primaryBlue={hasMetamask}
						class="connect-wallet-btn bg-primary text-center text-white font-semibold p-2 w-full h-12 rounded-lg"
						>{#if hasMetamask}Connect{:else}Not Found{/if}</button
					>
				</div>
				<div class="connect-card p-4 w-full bg-gray-100 rounded-lg h-fit">
					<img class="mx-auto mb-4 h-16" src="/images/walleticon.svg" alt="wallet connect icon" />
					<p class="heading pb-6 text-lg font-semibold text-center">WalletConnect</p>

					<button
						class="connect-wallet-btn bg-gray-400 text-center text-white font-semibold p-2 w-full h-12 rounded-lg"
						>Coming Soon</button
					>
				</div>
			</div>
		</Modal>
	{/if}
{/if}
