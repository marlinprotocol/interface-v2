<script lang="ts">
	import SearchBar from '$lib/components/search/SearchBar.svelte';

	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { OYSTER_OPERATOR_HISTORY_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import {
		getSearchedInventoryData,
		sortOysterOperatorHistory
	} from '$lib/utils/helpers/oysterHelpers';
	import OysterTableCommon from '$lib/page-components/oyster/inventory/OysterTableCommon.svelte';
	import OysterOperatorHistoryTableRow from '$lib/page-components/oyster/operator/OysterOperatorHistoryTableRow.svelte';
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
			id as keyof OysterInventoryDataModel,
			sortingMap[id]
		);
	};

	$: operatorHistoryData = $oysterStore.jobsData?.filter((data) => !data.live);
	// get searched data based on searchInput
	$: searchedData = getSearchedInventoryData(searchInput, operatorHistoryData);
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
		tableHeading={OYSTER_OPERATOR_HISTORY_TABLE_HEADER}
		noDataFound={paginatedData?.length ? false : true}
	>
		{#if paginatedData?.length}
			{#each paginatedData as rowData, rowIndex}
				<OysterOperatorHistoryTableRow {rowData} {rowIndex} />
			{/each}
			<tr>
				<td colspan="12">
					<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
				</td>
			</tr>
		{/if}
	</OysterTableCommon>
</div>
