<script lang="ts">
	import { getMPondToPondConversionHistoryFromSubgraph } from '$lib/controllers/subgraphController';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import type { Address } from '$lib/types/storeTypes';
	import { MPOND_TO_POND_TABLE_HEADER } from '$lib/utils/constants/bridgeConstants';
	import HistoryTableCommon from '$lib/page-components/bridge/history/HistoryTableCommon.svelte';
	import MPondTableRow from '$lib/page-components/bridge/history/MPondTableRow.svelte';
	import { POND_HISTORY_PAGE_URL } from '$lib/utils/constants/urls';
	import { modifyMPondToPondConversionHistory } from '$lib/utils/data-modifiers/subgraphModifier';

	let historyData: MPondToPondHistoryDataModel[] | undefined;
	let loading = true;

	// reverse the order of sortedData
	const handleSortData = (id: string) => {
		historyData = historyData?.reverse();
	};

	async function getHistoryData(address: Address) {
		loading = true;
		const historyDataFromSubgraph = await getMPondToPondConversionHistoryFromSubgraph(address);
		historyData = modifyMPondToPondConversionHistory(historyDataFromSubgraph);
		loading = false;
	}

	$: if ($walletStore.address) {
		getHistoryData($walletStore.address);
	}
</script>

<HistoryTableCommon
	tableTitle={{
		backButton: {
			firstText: 'POND',
			secondText: 'MPond',
			href: POND_HISTORY_PAGE_URL
		},
		title: 'MPond to POND conversion history'
	}}
	{loading}
	{handleSortData}
	noDataFound={!historyData?.length}
	tableHeading={MPOND_TO_POND_TABLE_HEADER}
>
	{#if historyData?.length}
		{#each historyData as rowData, rowIndex}
			<MPondTableRow {rowData} {rowIndex} />
		{/each}
	{/if}
</HistoryTableCommon>
