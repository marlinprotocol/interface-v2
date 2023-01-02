<script type="ts">
	import { walletAddress, connected } from '$lib/stores/provider';
	import { showLogoutModal, showConnectModal } from '$lib/components/Modal/provider';
	import LogoutModal from '$lib/custom-components/LogoutModal/LogoutModal.svelte';
	import ConnectModal from '$lib/custom-components/ConnectModal/ConnectModal.svelte';

	let walletType = 'NONE';

	$: walletType = $connected ? 'METAMASK' : 'NONE';
	$: chainName = import.meta.env.VITE_NETWORK_NAME || 'UNKNOWN';
</script>

{#if walletType !== 'NONE'}
	<button
		class="flex flex-row justify-center space-x-3 bg-white rounded-lg px-[18px] py-2 shadow-sm hover:shadow-lg transition-shadow duration-000"
		on:click={() => showLogoutModal.set(true)}
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

	<LogoutModal />
{:else}
	<button
		class="flex flex-row space-x-3 items-center bg-transparent outline outline-[1px]  outline-primary rounded-lg px-4 py-3 leading-[1.313]"
		on:click={() => showConnectModal.set(true)}
	>
		<img src="/images/lockicon.svg" alt="wallet icon" class="my-auto" />
		<span class="font-semibold font-[poppins] text-sm text-primary flex items-center"
			>Connect Wallet</span
		>
	</button>
	<ConnectModal />
{/if}
