<script>
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { environment } from '$lib/data-stores/environment';
	import { switchChain } from '$lib/utils/helpers/networkHelper';
	import { walletStore } from '$lib/data-stores/walletProviderStore';

	async function handleChainSwitch() {
		await switchChain(
			$walletStore.provider,
			environment.valid_chains[environment.default_chain_id].chain_id
		);
	}

	const styles = {
		subtitle: 'text-[15px] font-medium text-left mt-1 text-black/50 mt-4 px-2'
	};

	const defaultSupportedChainName =
		environment.valid_chains[environment.default_chain_id].chain_name;
</script>

<ContainerCard>
	<Text variant="h3" text="Unsupported Network" styleClass="text-center" />
	<span class={styles.subtitle}
		>Please switch to the {defaultSupportedChainName} network to continue.</span
	>
	<Button styleClass="mt-8 w-full" variant="filled" size="large" onclick={() => handleChainSwitch()}
		>SWITCH NETWORK</Button
	>
</ContainerCard>
