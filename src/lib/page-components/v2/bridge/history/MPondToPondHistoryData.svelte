<script lang="ts">
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { MPOND_TO_POND_TABLE_HEADER } from '$lib/utils/constants/bridgeConstants';
	import HistoryTableCommon from '$lib/page-components/bridge/history/HistoryTableCommon.svelte';
	import MPondTableRow from '$lib/page-components/bridge/history/MPondTableRow.svelte';
	import { POND_HISTORY_PAGE_URL } from '$lib/utils/constants/urls';

	export let historyData: MPondToPondHistoryDataModel[] | undefined;
	export let loading = true;

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
