<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import PageWrapper from '$lib/components/wrapper/PageWrapper.svelte';
	import { getAllowance } from '$lib/controllers/contract/usdc';
	import { getApprovedOysterAllowancesFromSubgraph } from '$lib/controllers/subgraphController';
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
		oysterTokenMetadataStore
	} from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import type { BrowserProvider } from 'ethers';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.oyster);
	});

	let prevChainId: null | number = null;
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

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;

	$: if (
		$connected &&
		$walletStore.address !== prevAddress &&
		$chainStore.chainId !== prevChainId &&
		chainSupported
	) {
		loadConnectedData();
		prevChainId = $chainStore.chainId;
		prevAddress = $walletStore.address;
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
