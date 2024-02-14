<script lang="ts">
	import SearchBar from '$lib/components/search/SearchBar.svelte';

	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
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
	import OysterTableCommon from '$lib/page-components/oyster/inventory/OysterTableCommon.svelte';
	import OysterOperatorJobsHistoryTableRow from '$lib/page-components/oyster/operator/OysterOperatorJobsHistoryTableRow.svelte';
	import { OYSTER_OPERATOR_JOBS_URL } from '$lib/utils/constants/urls';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';

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

<div class="mx-auto">
	<PageTitle title="History of Claims" backHref={OYSTER_OPERATOR_JOBS_URL} />
	<div class="mb-6 flex items-center gap-4">
		<SearchBar
			{onSearchClick}
			bind:input={searchInput}
			placeholder="Search for user, instance or region"
			styleClass="w-full"
		/>
	</div>
	<OysterTableCommon
		{handleSortData}
		loading={!$oysterStore.merchantJobsLoaded}
		tableHeading={OYSTER_OPERATOR_HISTORY_TABLE_HEADER}
		noDataFound={paginatedData?.length ? false : true}
	>
		{#if paginatedData?.length}
			{#each paginatedData as rowData, rowIndex}
				<OysterOperatorJobsHistoryTableRow {rowData} {rowIndex} />
			{/each}
			<tr>
				<td colspan="12">
					<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
				</td>
			</tr>
		{/if}
	</OysterTableCommon>
</div>
