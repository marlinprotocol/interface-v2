<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';

	export let connect: () => void;
	export let isLarge = false;
	const connectWalletStyles = 'flex gap-[10.3px] ';
</script>

{#if isLarge}
	<Button
		onclick={connect}
		styleClass={`${connectWalletStyles} w-full h-14 text-base font-semibold`}
	>
		<img src="/images/lockicon.svg" alt="Connect" />
		Connect Wallet
	</Button>
{:else}
	<Button
		onclick={connect}
		size="small"
		variant="outlined"
		styleClass={`${connectWalletStyles} w-fit text-sm h-11`}
	>
		Connect Wallet
	</Button>
{/if}
