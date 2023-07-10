<script lang="ts">
	import { getMPondToPondConversionHistoryFromSubgraph } from '$lib/controllers/subgraphController';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import type { Address, WalletStore } from '$lib/types/storeTypes';
	import { MPOND_TO_POND_TABLE_HEADER } from '$lib/utils/constants/bridgeConstants';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import HistoryTableCommon from '$lib/page-components/bridge/history/HistoryTableCommon.svelte';
	import MPondTableRow from '$lib/page-components/bridge/history/MPondTableRow.svelte';
	import { POND_HISTORY_PAGE_URL } from '$lib/utils/constants/urls';
	import { modifyMPondToPondConversionHistory } from '$lib/utils/data-modifiers/subgraphModifier';

	let address: Address;
	let historyData: MPondToPondHistoryDataModel[] | undefined;
	let loading = true;
	const unsubscribeWalletStore: Unsubscriber = walletStore.subscribe(async (value: WalletStore) => {
		address = value.address;
		if (address) {
			loading = true;
			const historyDataFromSubgraph = await getMPondToPondConversionHistoryFromSubgraph(address);
			historyData = modifyMPondToPondConversionHistory(historyDataFromSubgraph);
			loading = false;
		}
	});
	onDestroy(unsubscribeWalletStore);

	// reverse the order of sortedData
	const handleSortData = (id: string) => {
		historyData = historyData?.reverse();
	};
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
