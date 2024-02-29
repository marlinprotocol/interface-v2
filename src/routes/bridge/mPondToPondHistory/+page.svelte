<script lang="ts">
	import { getMPondToPondConversionHistoryFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainIdHasChanged, chainStore } from '$lib/data-stores/chainProviderStore';
	import {
		walletAddressHasChanged,
		walletStore,
		connected
	} from '$lib/data-stores/walletProviderStore';
	import MPondToPondHistoryData from '$lib/page-components/bridge/history/MPondToPondHistoryData.svelte';
	import { modifyMPondToPondConversionHistory } from '$lib/utils/data-modifiers/subgraphModifier';
	import type { Address } from '@web3-onboard/core/dist/types';

	let previousChainId: number | null = null;
	let previousWalletAddress: Address = '';
	let loading = false;
	let historyData: any;

	async function getMpondToPondHistoryData(address: Address) {
		loading = true;
		const historyDataFromSubgraph = await getMPondToPondConversionHistoryFromSubgraph(address);
		historyData = modifyMPondToPondConversionHistory(historyDataFromSubgraph);
		loading = false;
	}

	$: if ($connected) {
		if (
			walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId)
		) {
			getMpondToPondHistoryData($walletStore.address);
			previousChainId = $chainStore.chainId;
			previousWalletAddress = $walletStore.address;
		}
	} else {
		// resetting chain id since everything depends on the wallet address in inventory
		previousChainId = null;
		previousWalletAddress = '';
	}
</script>

<MPondToPondHistoryData bind:loading bind:historyData />
