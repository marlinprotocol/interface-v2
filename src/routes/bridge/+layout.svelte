<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import {
		getPondAndMPondBridgeAllowancesFromSubgraph,
		getRequestedMPondForConversionFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { initializeBridgeStore } from '$lib/data-stores/bridgeStore';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { environment } from '$lib/data-stores/environment';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { modifyAllowancesData } from '$lib/utils/data-modifiers/subgraphModifier';

	async function init() {
		const [allowancesData, requestedMPond] = await Promise.all([
			getPondAndMPondBridgeAllowancesFromSubgraph(
				$walletStore.address,
				$contractAddressStore.BRIDGE
			),
			getRequestedMPondForConversionFromSubgraph($walletStore.address)
		]);

		const allowances = modifyAllowancesData(allowancesData);
		initializeBridgeStore(allowances, requestedMPond);
	}

	$: chainSupportedInBridge = $chainStore.chainId
		? environment.supported_chains.bridge.includes($chainStore.chainId)
		: true;

	$: if ($connected && $chainStore.chainId && chainSupportedInBridge) {
		init();
	}
</script>

<svelte:head>
	<title>Marlin Bridge</title>
</svelte:head>

{#if $chainStore.isValidChain && chainSupportedInBridge}
	<slot />
{:else}
	<NetworkPrompt routeSupportedChains={environment.supported_chains.bridge} />
{/if}
