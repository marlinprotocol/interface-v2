<script>
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ENVIRONMENT from '$lib/environments/environment';
	import { switchChain } from '$lib/utils/helpers/networkHelper';
	import { walletStore } from '$lib/data-stores/walletProviderStore';

	async function handleChainSwitch() {
		await switchChain($walletStore.provider, ENVIRONMENT.public_chain_id);
	}

	const styles = {
		subtitle: 'text-[15px] font-medium text-left mt-1 text-black/50 mt-4 px-2'
	};
</script>

<ContainerCard>
	<Text variant="h3" text="Unsupported Network" styleClass="text-center" />
	<span class={styles.subtitle}
		>Please switch to the Arbitrum network to use the Receiver Staking portal.</span
	>
	<Button styleClass="mt-8 w-full" variant="filled" size="large" onclick={() => handleChainSwitch()}
		>SWITCH NETWORK</Button
	>
</ContainerCard>
