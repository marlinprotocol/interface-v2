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
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import OysterTableCommon from '$lib/page-components/oyster/inventory/OysterTableCommon.svelte';
	import OysterOperatorHistoryTableRow from '$lib/page-components/oyster/operator/OysterOperatorHistoryTableRow.svelte';
	import { OYSTER_OPERATOR_JOBS_URL } from '$lib/utils/constants/urls';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';

	let searchInput = '';
	let activePage = 1;
	let operatorHistoryData: OysterInventoryDataModel[] | undefined;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};

	const itemsPerPage = TABLE_ITEMS_PER_PAGE;

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const onSearchClick = () => {
		activePage = 1;
	};

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		operatorHistoryData = value.jobsData;
		operatorHistoryData = operatorHistoryData?.filter((data) => !data.live);
	});
	onDestroy(unsubscribeOysterStore);

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

	// get searched data based on searchInput
	$: searchedData = getSearchedInventoryData(searchInput, operatorHistoryData);

	// get page array based on inventory and itemsPerPage
	$: pageCount = Math.ceil((searchedData?.length ?? 0) / itemsPerPage);

	// get paginated data based on activePage
	$: paginatedData = searchedData?.slice(
		(activePage - 1) * itemsPerPage,
		activePage * itemsPerPage
	);
</script>

<div class="mx-auto">
	<PageTitle title={'History of Claims'} backHref={OYSTER_OPERATOR_JOBS_URL} />
	<div class="flex gap-4 items-center mb-6">
		<SearchBar
			{onSearchClick}
			bind:input={searchInput}
			placeholder={'Search for user, instance or region'}
			styleClass={'w-full'}
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
