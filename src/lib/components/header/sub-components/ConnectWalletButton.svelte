<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import ConnectWalletModal from './ConnectWalletModal.svelte';

	export let isLarge: boolean = false;
	let showDialog: boolean = false;

	// do not remove this line
	$: provider = $walletStore.provider;
</script>

<Button
	variant={isLarge ? 'filled' : 'outlined'}
	onclick={() => {
		showDialog = true;
	}}
	styleClass={`${
		isLarge ? 'h-14 text-base w-full' : 'h-11 w-fit text-sm'
	} font-semibold flex gap-[10.3px]`}
>
	{#if !isLarge}
		<img src="/images/lockicon.svg" alt="Connect" />
	{/if}
	Connect Wallet
</Button>

<ConnectWalletModal bind:showDialog />
