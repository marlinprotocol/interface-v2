<script type="ts">
	import detectEthereumProvider from '@metamask/detect-provider';
	import { provider as s_provider, address as s_address, networkId } from '../stores/provider';
	import { onMount } from 'svelte';
	import { providers } from 'ethers';

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
		class="flex flex-row justify-center space-x-2 bg-transparent outline outline-[1px] outline-primary rounded-lg p-2"
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
			<span class="font-[Poppins] font-bold text-primary"
				>{networkNames[$networkId] || 'UNKNOWN'}</span
			>
			<span class="font-[Poppins] font-normal text-primary text-xs"
				>{address.slice(0, 7)}...{address.slice(address.length - 5)}</span
			>
		</div>
	</button>

	{#if logoutModal}
		<div class="fixed z-10 inset-0 overflow-y-auto">
			<div
				class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
			>
				<!--
				Background overlay, show/hide based on modal state.

				Entering: "ease-out duration-300"
					From: "opacity-0"
					To: "opacity-100"
				Leaving: "ease-in duration-200"
					From: "opacity-100"
					To: "opacity-0"
			-->
				<div
					class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					on:click|self={() => (logoutModal = !logoutModal)}
				/>

				<!-- This element is to trick the browser into centering the modal contents. -->
				<span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

				<!--
				Modal panel, show/hide based on modal state.

				Entering: "ease-out duration-300"
					From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					To: "opacity-100 translate-y-0 sm:scale-100"
				Leaving: "ease-in duration-200"
					From: "opacity-100 translate-y-0 sm:scale-100"
					To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			-->
				<div
					class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
				>
					<div class="modal-header flex flex-row justify-between p-8 pb-0">
						<p class="modal-title my-auto font-[Poppins] font-bold text-neutral-800 text-2xl">
							Your wallet
						</p>
						<button type="button" class="modal-close" on:click={() => (logoutModal = !logoutModal)}>
							<img src="/images/closemodal.svg" alt="close modal" />
						</button>
					</div>
					<div class="modal-body my-4 font-[Poppins] font-lg font-semibold">
						<div class="p-8 pb-4 m-auto">
							<button
								on:click={logout}
								class="connect-wallet-btn bg-primary text-center text-white font-semibold p-4 w-full bg-primaryBlue rounded-lg"
								>Logout</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
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
		<div class="fixed z-10 inset-0 overflow-y-auto">
			<div
				class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
			>
				<!--
				Background overlay, show/hide based on modal state.

				Entering: "ease-out duration-300"
					From: "opacity-0"
					To: "opacity-100"
				Leaving: "ease-in duration-200"
					From: "opacity-100"
					To: "opacity-0"
			-->
				<div
					class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					on:click|self={() => (connectModal = !connectModal)}
				/>

				<!-- This element is to trick the browser into centering the modal contents. -->
				<span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

				<!--
				Modal panel, show/hide based on modal state.

				Entering: "ease-out duration-300"
					From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					To: "opacity-100 translate-y-0 sm:scale-100"
				Leaving: "ease-in duration-200"
					From: "opacity-100 translate-y-0 sm:scale-100"
					To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			-->
				<div
					class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
				>
					<div class="modal-header flex flex-row justify-between p-8 pb-0">
						<p class="my-auto font-[Poppins] font-bold text-neutral-800 text-2xl">
							Select a provider
						</p>
						<button
							type="button"
							class="modal-close"
							on:click={() => (connectModal = !connectModal)}
						>
							<img src="/images/closemodal.svg" alt="close modal" />
						</button>
					</div>
					<div class="my-4 font-[Poppins] font-lg font-semibold">
						<div class="flex flex-row justify-evenly px-4 gap-4">
							<div class="connect-card w-full bg-gray-100 rounded-lg">
								<img class="m-auto py-4 h-24" src="/images/metamaskicon.svg" alt="metamask icon" />
								<p class="heading text-center">MetaMask</p>
								<div class="p-8 pb-4 m-auto">
									<button
										on:click={connectMetamask}
										disabled={!hasMetamask}
										class:bg-gray-400={!hasMetamask}
										class:bg-primaryBlue={hasMetamask}
										class="connect-wallet-btn bg-primary text-center text-white font-semibold p-4 w-full rounded-lg"
										>{#if hasMetamask}Connect{:else}Not Found{/if}</button
									>
								</div>
							</div>
							<div class="connect-card w-full bg-gray-100">
								<img
									class="m-auto py-4 h-24"
									src="/images/walleticon.svg"
									alt="wallet connect icon"
								/>
								<p class="heading text-center">WalletConnect</p>
								<div class="p-8 pb-4 m-auto">
									<button
										class="connect-wallet-btn text-center text-white font-semibold p-4 w-full bg-gray-400 rounded-lg"
										>Coming Soon</button
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
{/if}
