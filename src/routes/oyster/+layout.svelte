<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import PageWrapper from '$lib/components/wrapper/PageWrapper.svelte';
	import { getAllowance } from '$lib/controllers/contract/usdc';
	import {
		getAllProvidersDetailsFromSubgraph,
		getApprovedOysterAllowancesFromSubgraph
	} from '$lib/controllers/subgraphController';
	import {
		chainConfigStore,
		chainStore,
		allowedChainsStore,
		setAllowedChainsStore
	} from '$lib/data-stores/chainProviderStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { environment } from '$lib/data-stores/environment';
	import {
		initializeAllowanceInOysterStore,
		oysterTokenMetadataStore,
		oysterRateMetadataStore,
		setMarketplaceLoadedInOysterStore,
		updateMarketplaceDataInOysterStore
	} from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { getOysterProvidersModified } from '$lib/utils/data-modifiers/oysterModifiers';
	import { addRegionNameToMarketplaceData } from '$lib/utils/helpers/oysterHelpers';
	import type { BrowserProvider } from 'ethers';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.oyster);
	});

	let prevChainIdCdata: null | number = null;
	let prevChainIdMdata: null | number = null;
	let prevAddress = '';

	async function loadConnectedData() {
		console.log('Loading oyster allowances data');
		const allowance =
			$chainConfigStore.oyster_token === 'POND' && $chainConfigStore.subgraph_urls.POND !== ''
				? await getApprovedOysterAllowancesFromSubgraph($walletStore.address)
				: await getAllowance(
						$walletStore.address,
						$contractAddressStore.OYSTER,
						$oysterTokenMetadataStore,
						$walletStore.provider as BrowserProvider
					);
		initializeAllowanceInOysterStore(allowance);
		console.log('Oyster allowances data is loaded');
	}

	async function loadMarketplaceData() {
		console.log('Loading marketplace data');
		setMarketplaceLoadedInOysterStore(false);
		const providersDataFromSubgraph = await getAllProvidersDetailsFromSubgraph();
		const marketplaceData = await getOysterProvidersModified(
			providersDataFromSubgraph,
			$oysterRateMetadataStore.rateCPUrlUnitInSeconds
		);
		const marketplaceDataWithRegionName = addRegionNameToMarketplaceData(marketplaceData);
		// updating stores instead of returning data as we don't need to show this data explicitly
		updateMarketplaceDataInOysterStore(marketplaceDataWithRegionName);
		console.log('marketplace data is loaded');
	}

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;

	$: if ($chainStore.chainId !== prevChainIdMdata) {
		prevChainIdMdata = $chainStore.chainId;
		loadMarketplaceData();
	}

	$: if (
		$connected &&
		($walletStore.address !== prevAddress || $chainStore.chainId !== prevChainIdCdata)
	) {
		prevChainIdCdata = $chainStore.chainId;
		prevAddress = $walletStore.address;
		loadConnectedData();
	}

	onDestroy(() => {
		setAllowedChainsStore([]);
	});
</script>

<svelte:head>
	<title>Marlin Oyster</title>
</svelte:head>

{#if $chainStore.isValidChain && chainSupported}
	<PageWrapper>
		<slot />
	</PageWrapper>
{:else}
	<PageWrapper>
		<NetworkPrompt />
	</PageWrapper>
{/if}
