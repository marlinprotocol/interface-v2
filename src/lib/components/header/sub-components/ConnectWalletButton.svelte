<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import lock from 'svelte-awesome/icons/lock';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import onboard from '$lib/controllers/web3OnboardController';

	export let isLarge = false;

	const connect = async () => {
		console.log('connecting to the wallet...');
		const connection = await onboard.connectWallet();
		console.log('connection', connection);
	};
	const connectWalletStyles = 'flex gap-[10.3px] ';
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
	<Button
		onclick={connect}
		size="small"
		variant="outlined"
		styleClass={`${connectWalletStyles} w-fit text-sm h-11`}
	>
		<img src="/images/lockicon.svg" alt="Connect" />
		Connect Wallet
	</Button>
{/if}
