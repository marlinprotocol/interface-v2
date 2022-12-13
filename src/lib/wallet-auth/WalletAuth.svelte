<script type="ts">
	import detectEthereumProvider from '@metamask/detect-provider';
	import { provider as s_provider, address as s_address, networkId } from '../stores/provider';
	import { onMount } from 'svelte';
	import { providers } from 'ethers';
	import Modal from '$lib/modal/Modal.svelte';

	export let allowedNetworks = [import.meta.env.VITE_NETWORK_ID as string];
	let networkNames = {
		'0x1': 'ETH MAINNET',
		'0x4': 'ETH RINKEBY',
		'0xa4b1': 'ARB ONE',
		'0x66eeb': 'ARB RINKEBY',
		'0x66eed': 'ARB GOERLI'
	};

	$: walletType = 'NONE';
	$: address = undefined;

	$: {
		s_provider.set(provider ? new providers.Web3Provider(provider) : provider);
		s_address.set(address);
	}

	$: connectModal = true;
	$: logoutModal = false;

	$: hasMetamask = false;
	let provider;

	onMount(async () => {
		provider = await detectEthereumProvider();
		console.log(provider);
		if (provider) {
			hasMetamask = true;

			let accounts = await provider.request({ method: 'eth_accounts' });
			if (accounts.length !== 0) {
				// existing account
				let chainId = await provider.request({ method: 'eth_chainId' });
				if (!allowedNetworks.includes(chainId)) {
					/* alert(`Must be on ${allowedNetworks.map(x => networkNames[x] || x).reduce((x,y) => x + ' or ' + y)}, currently on ${networkNames[chainId] || chainId}`); */
					networkId.set(undefined);
					return;
				}
				networkId.set(chainId);
				await setMetamask(accounts[0]);
			}
		}
	});

	async function connectMetamask() {
		let chainId = await provider.request({ method: 'eth_chainId' });
		if (!allowedNetworks.includes(chainId)) {
			alert(
				`Must be on ${allowedNetworks
					.map((x) => networkNames[x] || x)
					.reduce((x, y) => x + ' or ' + y)}, currently on ${networkNames[chainId] || chainId}`
			);
			networkId.set(undefined);
			return;
		}
		networkId.set(chainId);

		let accounts = await provider.request({ method: 'eth_accounts' });

		if (accounts.length === 0) {
			accounts = await provider.request({ method: 'eth_requestAccounts' });
		}

		if (accounts.length !== 0) {
			await setMetamask(accounts[0]);
			connectModal = false;
		}
	}

	async function setMetamask(account: string) {
		walletType = 'METAMASK';
		address = account;

		provider.on('accountsChanged', accountsChanged);
		provider.on('chainChanged', chainChanged);
	}

	async function accountsChanged(accounts: Array<string>) {
		if (walletType !== 'METAMASK') {
			return;
		}
		address = accounts[0];
	}

	async function chainChanged(chainId: string) {
		if (walletType !== 'METAMASK') {
			return;
		}
		if (!allowedNetworks.includes(chainId)) {
			/* alert(`Must be on ${allowedNetworks.map(x => networkNames[x] || x).reduce((x,y) => x + ' or ' + y)}, currently on ${networkNames[chainId] || chainId}`); */
			walletType = 'NONE';
			address = undefined;
			networkId.set(undefined);
			return;
		}
		networkId.set(chainId);
	}

	async function logout() {
		walletType = 'NONE';
		address = undefined;
		logoutModal = false;
		networkId.set(undefined);
	}
</script>

{#if walletType !== 'NONE'}
	<button
		class="flex flex-row justify-center space-x-3 bg-white rounded-lg px-4 py-2 shadow-sm hover:shadow-lg transition-shadow duration-000"
		on:click={() => (logoutModal = !logoutModal)}
	>
		{#if walletType === 'METAMASK'}
			<img src="/images/wallet.svg" alt="metamask icon" width="35" class="my-auto" />
		{:else if walletType == 'WALLETCONNECT'}
			<img src="/images/wallet.svg" alt="wallet connect icon" width="35" class="my-auto" />
		{:else}
			<img src="/images/wallet.svg" alt="unrecognized wallet icon" width="35" class="my-auto" />
		{/if}
		<div class="info flex flex-col">
			<span class="font-[Poppins] font-bold text-primary text-sm"
				>{networkNames[$networkId] || 'UNKNOWN'}</span
			>
			<span class="font-[Poppins] font-normal text-primary text-[11px]"
				>{address.slice(0, 6)}...{address.slice(address.length - 5)}</span
			>
		</div>
	</button>

	{#if logoutModal}
		<Modal bind:value={logoutModal}>
			<p
				slot="title"
				class="modal-title my-auto font-[Poppins] font-bold text-neutral-800 text-2xl"
			>
				Your wallet
			</p>

			<button
				slot="actions"
				on:click={logout}
				class="connect-wallet-btn bg-primary text-center text-white font-semibold p-4 w-full bg-primaryBlue rounded-lg"
				>Logout</button
			>
		</Modal>
	{/if}
{:else}
	<button
		class="flex flex-row space-x-3 items-center bg-transparent outline outline-[1px]  outline-primary rounded-lg px-4 py-2.5 leading-[1.313]"
		on:click={() => (connectModal = !connectModal)}
	>
		<img src="/images/lockicon.svg" alt="wallet icon" class="my-auto" />

		<span class="font-semibold font-[poppins] text-sm text-primary flex items-center"
			>Connect Wallet</span
		>
	</button>
	{#if connectModal}
		<Modal bind:value={connectModal}>
			<div slot="title">
				<p class="my-auto font-[Poppins] font-medium text-neutral-800/60 text-sm">Unlock Wallet</p>
				<p class="my-auto font-[Poppins] font-bold text-neutral-800 text-2xl">Select a provider</p>
			</div>
			<div class="flex flex-row justify-evenly gap-5 mt-4">
				<div class="connect-card p-4 w-full bg-gray-100 rounded-lg h-fit">
					<img class="mx-auto mb-4 h-16" src="/images/metamaskicon.svg" alt="metamask icon" />
					<p class="heading pb-6 text-lg font-semibold text-center">MetaMask</p>

					<button
						on:click={connectMetamask}
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
