<script lang="ts">
	import { connected } from '$lib/data-stores/walletProviderStore';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import DisconnectWalletButton from '$lib/components/header/sub-components/DisconnectWalletButton.svelte';
</script>

{#if $connected}
	<DisconnectWalletButton />
{:else}
	<ConnectWalletButton />
{/if}
