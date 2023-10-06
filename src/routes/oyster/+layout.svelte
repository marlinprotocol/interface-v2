<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import PageWrapper from '$lib/components/wrapper/PageWrapper.svelte';
	import { getAllowance } from '$lib/controllers/contract/usdc';
	import { getJobStatuses } from '$lib/controllers/httpController';
	import {
		getAllProvidersDetailsFromSubgraph,
		getApprovedOysterAllowancesFromSubgraph,
		getOysterJobsFromSubgraph,
		getProviderDetailsFromSubgraph
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
		initializeOysterStore,
		oysterRateMetadataStore,
		oysterTokenMetadataStore,
		setMarketplaceLoadedInOysterStore,
		updateMarketplaceDataInOysterStore
	} from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { REGION_NAME_CONSTANTS } from '$lib/utils/constants/regionNameConstants';
	import {
		getOysterProvidersModified,
		modifyOysterJobData
	} from '$lib/utils/data-modifiers/oysterModifiers';
	import { addRegionNameToMarketplaceData } from '$lib/utils/helpers/oysterHelpers';
	import type { BrowserProvider } from 'ethers';
	import { onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.oyster);
	});

	async function loadConnectedData() {
		const [allowance, oysterJobsFromSubgraph, providerDetail, jobStatuses] = await Promise.all([
			$chainConfigStore.oyster_token === 'POND' && $chainConfigStore.subgraph_urls.POND !== ''
				? getApprovedOysterAllowancesFromSubgraph($walletStore.address)
				: getAllowance(
						$walletStore.address,
						$contractAddressStore.OYSTER,
						$oysterTokenMetadataStore,
						$walletStore.provider as BrowserProvider
				  ),
			getOysterJobsFromSubgraph($walletStore.address),
			getProviderDetailsFromSubgraph($walletStore.address),
			getJobStatuses($walletStore.address)
		]);
		// Create a lookup object based on jobStatuses
		let jobStatusLookup: Record<string, string> = {};
		jobStatuses.forEach((status: any) => {
			jobStatusLookup[status.jobId] = status.ip;
		});
		// Assign IP addresses from jobStatus to jobData
		oysterJobsFromSubgraph.forEach((data: any) => {
			if (Object.prototype.hasOwnProperty.call(jobStatusLookup, data.id.toString())) {
				data.ip = jobStatusLookup[data.id.toString()];
			}
		});
		const oysterJobs = await modifyOysterJobData(
			oysterJobsFromSubgraph,
			$oysterRateMetadataStore.oysterRateScalingFactor
		);

		initializeOysterStore(providerDetail, allowance, oysterJobs);
	}

	async function loadMarketplaceData() {
		setMarketplaceLoadedInOysterStore(false);
		const providersDataFromSubgraph = await getAllProvidersDetailsFromSubgraph();
		const marketplaceData = await getOysterProvidersModified(
			providersDataFromSubgraph,
			$oysterRateMetadataStore.rateCPUrlUnitInSeconds
		);
		const marketplaceDataWithRegionName = addRegionNameToMarketplaceData(
			marketplaceData,
			REGION_NAME_CONSTANTS
		);
		// updating stores instead of returning data as we don't need to show this data explicitly
		updateMarketplaceDataInOysterStore(marketplaceDataWithRegionName);
	}

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;

	$: if ($chainConfigStore && chainSupported) {
		loadMarketplaceData();
	}

	$: if ($connected && $chainStore.chainId && chainSupported) {
		loadConnectedData();
	}
</script>

<svelte:head>
	<title>Marlin Oyster</title>
</svelte:head>

{#if $chainStore.isValidChain && chainSupported}
	<PageWrapper>
		<slot />
	</PageWrapper>
{:else}
	<NetworkPrompt />
{/if}
