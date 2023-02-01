<script lang="ts">
	import { buttonClasses } from '$lib/components/componentClasses';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import DisconnectWalletModal from './DisconnectWalletModal.svelte';
	import ConnectWalletModal from './ConnectWalletModal.svelte';
	import lock from 'svelte-awesome/icons/lock';
	import Icon from '$lib/components/icons/Icon.svelte';
</script>

{#if $connected}
	<label for="disconnect-wallet-modal" class={`${buttonClasses.outlined} flex gap-2`}>
		<img src="./images/metamaskicon.svg" alt="Metamask Logo" width="24" />
		Disconnect Wallet
	</label>
	<DisconnectWalletModal />
{:else}
	<label for="connect-wallet-modal" class={`${buttonClasses.outlined} flex gap-1`}>
		<Icon data={lock} size={20} />
		<!-- if using below image then color is not updating on theme change -->
		<!-- <img src="./images/lockicon.svg" alt="Lock Icon" width="12" /> -->
		Connect Wallet
	</label>
	<ConnectWalletModal />
{/if}
