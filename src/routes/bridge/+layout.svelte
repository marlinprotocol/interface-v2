<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import PageWrapper from '$lib/components/wrapper/PageWrapper.svelte';
	import { getAllowance } from '$lib/controllers/contract/usdc';
	import {
		getPondAndMPondBridgeAllowancesFromSubgraph,
		getRequestedMPondForConversionFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { initializeBridgeStore } from '$lib/data-stores/bridgeStore';
	import {
		chainStore,
		setAllowedChainsStore,
		allowedChainsStore,
		chainIdHasChanged
	} from '$lib/data-stores/chainProviderStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { environment } from '$lib/data-stores/environment';
	import {
		walletAddressHasChanged,
		walletStore,
		connected
	} from '$lib/data-stores/walletProviderStore';
	import { modifyAllowancesData } from '$lib/utils/data-modifiers/subgraphModifier';
	import type { BrowserProvider } from 'ethers';
	import { onDestroy, onMount } from 'svelte';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';

	let previousChainId: number | null = null;
	let previousWalletAddress = '';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.bridge);
	});

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;

	// TODO @souvikmishra : update the allowance function to fetch from correct subgraph
	async function init() {
		const [allowancesData, requestedMPond] = await Promise.all([
			getAllowance(
				$walletStore.address,
				$contractAddressStore.BRIDGE,
				$oysterTokenMetadataStore,
				$walletStore.provider as BrowserProvider
			),
			getRequestedMPondForConversionFromSubgraph($walletStore.address)
		]);

		const allowances = modifyAllowancesData(allowancesData);
		initializeBridgeStore(allowances, requestedMPond);
	}

	$: if ($connected && chainSupported) {
		if (
			walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId)
		) {
			init();
			previousChainId = $chainStore.chainId;
			previousWalletAddress = $walletStore.address;
		}
	} else {
		previousChainId = null;
		previousWalletAddress = '';
	}

	onDestroy(() => {
		setAllowedChainsStore([]);
	});
</script>

{#if $chainStore.isValidChain && chainSupported}
	<PageWrapper>
		<slot />
	</PageWrapper>
{:else}
	<PageWrapper>
		<NetworkPrompt
			title="Unsupported Network"
			description="Please switch to one of the chains in the dropdown to continue"
		/>
	</PageWrapper>
{/if}
