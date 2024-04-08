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
	const pondToMPondHistoryData = [
		{
			timestamp: 1712489945165,
			pondConverted: BigInt('1000000000000000000'),
			mpondReceived: BigInt('1000000000000000'),
			transactionHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t'
		},
		{
			timestamp: 1712489945165,
			pondConverted: BigInt('500000000000000000'),
			mpondReceived: BigInt('500000000000000'),
			transactionHash: '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0ta'
		},
		{
			timestamp: 1712489945165,
			pondConverted: BigInt('300000000000000000'),
			mpondReceived: BigInt('300000000000000'),
			transactionHash: '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0tab'
		},
		{
			timestamp: 1712489945165,
			pondConverted: BigInt('200000000000000000'),
			mpondReceived: BigInt('200000000000000'),
			transactionHash: '0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0tabc'
		},
		{
			timestamp: 1712489945165,
			pondConverted: BigInt('1500000000000000000'),
			mpondReceived: BigInt('1500000000000000'),
			transactionHash: '0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0tabcd'
		},
		{
			timestamp: 1712489945165,
			pondConverted: BigInt('250000000000000000'),
			mpondReceived: BigInt('250000000000000'),
			transactionHash: '0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0tabcde'
		},
		{
			timestamp: 1712489945165,
			pondConverted: BigInt('750000000000000000'),
			mpondReceived: BigInt('750000000000000'),
			transactionHash: '0x7g8h9i0j1k2l3m4n5o6p7q8r9s0tabcdef'
		},
		{
			timestamp: 1712489945165,
			pondConverted: BigInt('1200000000000000000'),
			mpondReceived: BigInt('1200000000000000'),
			transactionHash: '0x8h9i0j1k2l3m4n5o6p7q8r9s0tabcdefg'
		},
		{
			timestamp: 1712489945165,
			pondConverted: BigInt('600000000000000000'),
			mpondReceived: BigInt('600000000000000'),
			transactionHash: '0x9i0j1k2l3m4n5o6p7q8r9s0tabcdefgh'
		},
		{
			timestamp: 1712489945165,
			pondConverted: BigInt('800000000000000000'),
			mpondReceived: BigInt('800000000000000'),
			transactionHash: '0x0j1k2l3m4n5o6p7q8r9s0tabcdefghi'
		}
	];
	console.log({ historyData });
</script>

<PondToMPondHistoryData
	bind:loading
	historyData={[
		...pondToMPondHistoryData,
		...pondToMPondHistoryData.reverse(),
		...pondToMPondHistoryData
	]}
/>
<!-- historyData={[
	...pondToMPondHistoryData,
	...pondToMPondHistoryData.reverse(),
	...pondToMPondHistoryData
]} -->
