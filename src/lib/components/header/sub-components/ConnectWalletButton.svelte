<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import lock from 'svelte-awesome/icons/lock';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import onboard from '$lib/controllers/web3OnboardController';
	import ChainSwitcher from '$lib/components/header/sub-components/ChainSwitcher.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let styleClass = '';
	export let isLarge = false;
	export let connectButtonText = 'Connect Wallet';

	const connect = async () => {
		console.log('connecting to the wallet...');
		const connection = await onboard.connectWallet();
		console.log('connection', connection);
	};
</script>

{#if isLarge}
	<Button
		onclick={connect}
		styleClass={cn('flex gap-[10.3px] w-full h-14 text-base font-semibold', styleClass)}
	>
		<Icon data={lock} size={20} iconColorClass="icon-white" />
		Connect Wallet
	</Button>
{:else}
	<div data-testid="connect-wallet-button" class={cn('flex items-center gap-2', styleClass)}>
		<ChainSwitcher />
		<Button
			onclick={connect}
			size="small"
			variant="filled"
			styleClass="flex gap-[10.3px] w-fit text-sm h-12 flex items-center cnt-btn"
		>
			{connectButtonText}
		</Button>
	</div>
{/if}
