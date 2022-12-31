<script lang="ts">
	import { connectMetamask, checkNetwork, switchNetwork } from '../../stores/provider';
	import { showConnectModal } from '../../components/Modal/provider';
	import { onMount } from 'svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';

	let hasMetamask = false;

	onMount(() => {
		hasMetamask = window['ethereum'] ? true : false;
	});

	// connect to metamask wallet if the network is valid or switch to the valid network
	async function connectMetamaskHandler() {
		const isValidNetwork = await checkNetwork(import.meta.env.VITE_NETWORK_ID);
		if (isValidNetwork) {
			await connectMetamask();
			// resetting connectModal store
			showConnectModal.set(false);
		} else {
			await switchNetwork(import.meta.env.VITE_NETWORK_ID);
		}
	}
</script>

<Modal bind:value={$showConnectModal} persistent>
	<div slot="title">
		<p class="my-auto font-[Poppins] font-medium text-neutral-800/60 text-sm">Unlock Wallet</p>
		<p class="my-auto font-[Poppins] font-bold text-neutral-800 text-2xl">Select a provider</p>
	</div>
	<div class="flex flex-row justify-evenly gap-5 mt-4">
		<div class="connect-card p-4 w-full bg-gray-100 rounded-lg h-fit">
			<img class="mx-auto mb-4 h-16" src="/images/metamaskicon.svg" alt="metamask icon" />
			<p class="heading pb-6 text-lg font-semibold text-center">MetaMask</p>

			<button
				on:click|preventDefault={connectMetamaskHandler}
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
