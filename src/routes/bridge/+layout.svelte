<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import {
		getPondAndMPondBridgeAllowancesFromSubgraph,
		getRequestedMPondForConversionFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { initializeBridgeStore } from '$lib/data-stores/bridgeStore';
	import {
		chainStore,
		setAllowedChainsStore,
		allowedChainsStore
	} from '$lib/data-stores/chainProviderStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { environment } from '$lib/data-stores/environment';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { modifyAllowancesData } from '$lib/utils/data-modifiers/subgraphModifier';
	import { onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.bridge);
	});

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

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;

	$: if ($connected && $chainStore.chainId && chainSupported) {
		init();
	}
</script>

<svelte:head>
	<title>Marlin Bridge</title>
</svelte:head>

{#if $chainStore.isValidChain && chainSupported}
	<slot />
{:else}
	<NetworkPrompt />
{/if}
