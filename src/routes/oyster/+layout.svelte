<script lang="ts">
	import {
		chainConfigStore,
		chainStore,
		allowedChainsStore,
		setAllowedChainsStore,
		chainIdHasChanged
	} from '$lib/data-stores/chainProviderStore';
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import PageWrapper from '$lib/components/wrapper/PageWrapper.svelte';
	import { getAllowance } from '$lib/controllers/contract/usdc';
	import {
		getAllProvidersDetailsFromSubgraph,
		getOysterCreditFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { environment } from '$lib/data-stores/environment';
	import {
		initializeAllowanceInOysterStore,
		oysterTokenMetadataStore,
		oysterRateMetadataStore,
		setMarketplaceLoadedInOysterStore,
		updateMarketplaceDataInOysterStore,
		initializeMarlinCreditsInOysterStore,
		oysterStore
	} from '$lib/data-stores/oysterStore';
	import {
		connected,
		walletAddressHasChanged,
		walletStore
	} from '$lib/data-stores/walletProviderStore';
	import type { Address } from '$lib/types/storeTypes';
	import { getOysterProvidersModified } from '$lib/utils/data-modifiers/oysterModifiers';
	import { addRegionNameToMarketplaceData } from '$lib/utils/helpers/oysterHelpers';
	import type { BrowserProvider } from 'ethers';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.oyster);
	});

	let previousChainId: number | null = null;
	let previousWalletAddress: Address = '';
	let isOysterDashboard: boolean;
	let isValidChain: boolean;

	async function loadConnectedData() {
		console.log('Loading oyster allowances data');
		const allowance = await getAllowance(
			$walletStore.address,
			$contractAddressStore.OYSTER,
			$oysterTokenMetadataStore,
			$walletStore.provider as BrowserProvider
		);
		initializeAllowanceInOysterStore(allowance);
		console.log('Oyster allowances data is loaded', $oysterStore.allowance);

		if ($chainConfigStore.subgraph_urls.OYSTER_CREDIT !== '') {
			const marlinCredits = await getOysterCreditFromSubgraph($walletStore.address);
			initializeMarlinCreditsInOysterStore(marlinCredits);
			console.log(
				'Marlin credits data is loaded',
				$oysterStore.credits.balance,
				$oysterStore.credits.isWhitelisted
			);
		}
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
		console.log('Marketplace data is loaded');
	}

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;

	// load marketplace data based on chain change, and connected data based on wallet address+chain change
	$: if ($connected && chainSupported) {
		if (chainIdHasChanged($chainStore.chainId, previousChainId)) {
			loadMarketplaceData();
			loadConnectedData();
			previousChainId = $chainStore.chainId;
		} else if (walletAddressHasChanged($walletStore.address, previousWalletAddress)) {
			loadConnectedData();
			previousWalletAddress = $walletStore.address;
		}
	} else {
		if (chainIdHasChanged($chainStore.chainId, previousChainId)) {
			loadMarketplaceData();
			previousChainId = $chainStore.chainId;
		}
		// reset previousWalletAddress if not connected, since no wallet is connected
		previousWalletAddress = '';
	}

	onDestroy(() => {
		setAllowedChainsStore([]);
	});
	$: isOysterDashboard = $page.url.pathname === '/oyster/';
	$: isValidChain = $chainStore.isValidChain && chainSupported;
</script>

{#if isOysterDashboard || isValidChain}
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
