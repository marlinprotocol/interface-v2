<script>
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { environmentStore } from '$lib/data-stores/environment';
	import { switchChain } from '$lib/utils/helpers/networkHelper';
	import { web3WalletStore } from '$lib/controllers/walletController';

	$: connectedWallet = $web3WalletStore?.[0];
	async function handleChainSwitch() {
		await switchChain(connectedWallet.provider, $environmentStore.valid_chain_ids_with_0x[0]);
	}

	const styles = {
		subtitle: 'text-[15px] font-medium text-left mt-1 text-black/50 mt-4 px-2'
	};
</script>

<ContainerCard>
	<Text variant="h3" text="Unsupported Network" styleClass="text-center" />
	<span class={styles.subtitle}>Please switch to the Arbitrum One network to continue.</span>
	<Button styleClass="mt-8 w-full" variant="filled" size="large" onclick={() => handleChainSwitch()}
		>SWITCH NETWORK</Button
	>
</ContainerCard>
