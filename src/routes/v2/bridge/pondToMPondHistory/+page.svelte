<script lang="ts">
	import { getPondToMPondConversionHistoryFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainIdHasChanged, chainStore } from '$lib/data-stores/chainProviderStore';
	import {
		connected,
		walletAddressHasChanged,
		walletStore
	} from '$lib/data-stores/walletProviderStore';
	import PondToMPondHistoryData from '$lib/page-components/v2/bridge/history/PondToMPondHistoryData.svelte';
	import type { Address } from '$lib/types/storeTypes';
	import { modifyPondToMpondConversionHistory } from '$lib/utils/data-modifiers/subgraphModifier';

	let previousChainId: number | null = null;
	let previousWalletAddress: Address = '';
	let loading = false;
	let historyData: any;

	async function getPondToMpondHistoryData(address: Address) {
		loading = true;
		const historyDataFromSubgraph = await getPondToMPondConversionHistoryFromSubgraph(address);

		historyData = historyDataFromSubgraph
			? modifyPondToMpondConversionHistory(historyDataFromSubgraph)
			: [];
		loading = false;
	}

	$: if ($connected) {
		if (
			walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId)
		) {
			getPondToMpondHistoryData($walletStore.address);
			previousChainId = $chainStore.chainId;
			previousWalletAddress = $walletStore.address;
		}
	} else {
		previousChainId = null;
		previousWalletAddress = '';
	}
</script>

<PondToMPondHistoryData bind:loading bind:historyData />
