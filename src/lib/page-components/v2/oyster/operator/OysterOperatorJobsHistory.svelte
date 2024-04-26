<script lang="ts">
	import Pagination from '$lib/components/v2/pagination/Pagination.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type {
		OysterInventoryDataModel,
		OysterOperatorInventorySortKeys
	} from '$lib/types/oysterComponentType';
	import { OYSTER_OPERATOR_HISTORY_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import {
		getSearchedOysterJobsData,
		sortOysterOperatorHistory
	} from '$lib/utils/helpers/oysterHelpers';
	import OysterTableCommon from '$lib/page-components/v2/oyster/inventory/OysterTableCommon.svelte';
	import OysterOperatorJobsHistoryTableRow from '$lib/page-components/v2/oyster/operator/OysterOperatorJobsHistoryTableRow.svelte';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import { tableClasses } from '$lib/atoms/v2/componentClasses';

	let searchInput = '';
	let activePage = 1;
	let operatorHistoryData: OysterInventoryDataModel[] | undefined;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const onSearchClick = () => {
		activePage = 1;
	};

	const handleSortData = (id: string) => {
		if (sortingMap[id]) {
			sortingMap[id] = sortingMap[id] === 'asc' ? 'desc' : 'asc';
		} else {
			sortingMap[id] = 'asc';
		}
		operatorHistoryData = sortOysterOperatorHistory(
			operatorHistoryData,
			id as OysterOperatorInventorySortKeys,
			sortingMap[id]
		);
	};

	$: operatorHistoryData = $oysterStore.merchantJobsData?.filter(
		(data) => data.status === 'closed'
	);
	// get searched data based on searchInput
	$: searchedData = getSearchedOysterJobsData(searchInput, operatorHistoryData);
	// get page array based on inventory and itemsPerPage
	$: pageCount = Math.ceil((searchedData?.length ?? 0) / TABLE_ITEMS_PER_PAGE);
	// get paginated data based on activePage
	$: paginatedData = searchedData?.slice(
		(activePage - 1) * TABLE_ITEMS_PER_PAGE,
		activePage * TABLE_ITEMS_PER_PAGE
	);
</script>

<OysterTableCommon
	{handleSortData}
	roundedBorders={false}
	loading={!$oysterStore.merchantJobsLoaded}
	tableHeading={OYSTER_OPERATOR_HISTORY_TABLE_HEADER}
	noDataFound={paginatedData?.length ? false : true}
>
	{#if paginatedData?.length}
		{#each paginatedData as rowData, rowIndex}
			<tr class={cn(tableClasses.row, 'group h-16 hover:bg-base-200')}>
				<OysterOperatorJobsHistoryTableRow {rowData} {rowIndex} />
			</tr>
		{/each}
	{/if}
</OysterTableCommon>
<Pagination {pageCount} {activePage} {handlePageChange} />
