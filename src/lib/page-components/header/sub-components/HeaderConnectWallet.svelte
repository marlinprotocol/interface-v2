<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import DisconnectWalletModal from '$lib/page-components/header/sub-components/DisconnectWalletModal.svelte';
	import ConnectWalletModal from '$lib/page-components/header/sub-components/ConnectWalletModal.svelte';
	import lock from 'svelte-awesome/icons/lock';
	import Icon from '$lib/atoms/icons/Icon.svelte';

	$: shortAddress =
		$walletStore.address.slice().substring(0, 6) +
		'...' +
		$walletStore.address.slice().substring(38, 42);
</script>

{#if $connected}
	<label
		for="disconnect-wallet-modal"
		class="bg-base-100 cursor-pointer text-primary text-sm font-semibold rounded-lg shadow-sm flex gap-2 pl-3 pr-4 py-1 items-center border-primary border"
	>
		<img src="./images/wallet-connected.svg" alt="Metamask Logo" />
		{shortAddress}
	</label>
	<DisconnectWalletModal />
{:else}
	<label for="connect-wallet-modal" class={`${buttonClasses.outlined} flex gap-1`}>
		<Icon data={lock} size={20} iconColorClass="icon-primary" />
		Connect Wallet
	</label>
	<ConnectWalletModal />
{/if}
