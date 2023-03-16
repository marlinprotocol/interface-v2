<script lang="ts">
	import { connected } from '$lib/data-stores/walletProviderStore';
	import ConnectWalletButton from './ConnectWalletButton.svelte';
	import DisconnectWalletButton from './DisconnectWalletButton.svelte';
</script>

{#if $connected}
	<DisconnectWalletButton />
{:else}
	<ConnectWalletButton />
{/if}
