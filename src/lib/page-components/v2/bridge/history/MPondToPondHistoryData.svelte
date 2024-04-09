<script lang="ts">
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { MPOND_TO_POND_TABLE_HEADER } from '$lib/utils/constants/v2/bridgeConstants';
	import HistoryTableCommon from '$lib/page-components/v2/bridge/history/HistoryTableCommon.svelte';
	import MPondTableRow from '$lib/page-components/v2/bridge/history/MPondTableRow.svelte';
	import { POND_HISTORY_PAGE_URL } from '$lib/utils/constants/urls';
	import { ROUTES } from '$lib/utils/constants/v2/urls';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import Pagination from '$lib/components/v2/pagination/Pagination.svelte';

	export let historyData: MPondToPondHistoryDataModel[] | undefined;
	export let loading = true;
	let activePage = 1;

	// reverse the order of sortedData
	const handleSortData = (id: string) => {
		historyData = historyData?.reverse();
	};
	// get page array based on inventory and itemsPerPage
	$: pageCount = Math.ceil((historyData?.length ?? 0) / TABLE_ITEMS_PER_PAGE);
	// get paginated data based on activePage
	$: paginatedData = historyData?.slice(
		(activePage - 1) * TABLE_ITEMS_PER_PAGE,
		activePage * TABLE_ITEMS_PER_PAGE
	);
	const handlePageChange = (page: number) => {
		activePage = page;
	};
</script>

<div class="mx-[28px] flex flex-1 flex-col">
	<HistoryTableCommon
		tableTitle={{
			backButton: {
				firstText: 'POND',
				secondText: 'MPond',
				href: ROUTES.BRIDGE_URL
			},
			title: 'MPond to POND conversion history'
		}}
		{loading}
		{handleSortData}
		noDataFound={!paginatedData?.length}
		tableHeading={MPOND_TO_POND_TABLE_HEADER}
	>
		{#if paginatedData?.length}
			{#each paginatedData as rowData, rowIndex}
				<MPondTableRow {rowData} {rowIndex} />
			{/each}
		{/if}
	</HistoryTableCommon>
	<Pagination {pageCount} {activePage} {handlePageChange} />
</div>
