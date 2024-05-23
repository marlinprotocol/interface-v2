<script lang="ts">
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { MPOND_TO_POND_TABLE_HEADER } from '$lib/utils/constants/bridgeConstants';
	import HistoryTableCommon from '$lib/page-components/bridge/history/HistoryTableCommon.svelte';
	import MPondTableRow from '$lib/page-components/bridge/history/MPondTableRow.svelte';
	import { ROUTES } from '$lib/utils/constants/urls';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import { tableClasses } from '$lib/atoms/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';

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
			title: 'MPond to Pond conversion history'
		}}
		{loading}
		{handleSortData}
		noDataFound={!paginatedData?.length}
		tableHeading={MPOND_TO_POND_TABLE_HEADER}
	>
		{#if paginatedData?.length}
			{#each paginatedData as rowData, rowIndex}
				<tr class={cn(tableClasses.row, 'h-16 hover:bg-base-200')}>
					<MPondTableRow {rowData} {rowIndex} />
				</tr>
			{/each}
		{/if}
	</HistoryTableCommon>
	<Pagination {pageCount} {activePage} {handlePageChange} />
</div>
