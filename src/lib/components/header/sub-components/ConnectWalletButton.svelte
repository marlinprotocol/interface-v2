<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import lock from 'svelte-awesome/icons/lock';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import onboard from '$lib/controllers/web3OnboardController';
	import { setWalletAndChainStores } from '$lib/controllers/walletController';
	import { web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import ChainSwitcher from '$lib/components/header/sub-components/ChainSwitcher.svelte';

	export let isLarge = false;
	export let connectButtonText = 'Connect Wallet';

	const connectWalletStyles = 'flex gap-[10.3px] ';

	const connect = async () => {
		console.log('connecting to the wallet...');
		const connection = await onboard.connectWallet();
		console.log('connection', connection);
	};

	$: connectedAccount = $web3WalletStore?.[0];
	$: if (connectedAccount) {
		setWalletAndChainStores(connectedAccount.provider);
	}
</script>

{#if isLarge}
	<Button
		onclick={connect}
		styleClass={`${connectWalletStyles} w-full h-14 text-base font-semibold`}
	>
		<Icon data={lock} size={20} iconColorClass={'icon-white'} />
		Connect Wallet
	</Button>
{:else}
	<div class="flex gap-2 items-center">
		<ChainSwitcher />
		<Button
			onclick={connect}
			size="small"
			variant="outlined"
			styleClass={`${connectWalletStyles} w-fit text-sm h-12 flex items-center`}
		>
			<img src="/images/lockicon.svg" alt="Connect" />
			{connectButtonText}
		</Button>
	</div>
{/if}
