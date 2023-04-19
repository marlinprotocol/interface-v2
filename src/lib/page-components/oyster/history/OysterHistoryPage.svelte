<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import {
		kOysterHistoryTableHeader,
		oysterTableItemsPerPage
	} from '$lib/utils/constants/oysterConstants';
	import { getSearchedInventoryData } from '$lib/utils/helpers/oysterHelpers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import OysterHistoryTable from './OysterHistoryTable.svelte';
	import OysterHistoryTableRow from './OysterHistoryTableRow.svelte';
	import { tableCellClasses } from '$lib/atoms/componentClasses';

	let searchInput = '';
	let activePage = 1;

	const itemsPerPage = oysterTableItemsPerPage;

	let inventoryData: OysterInventoryDataModel[] | undefined;

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		inventoryData = value.jobsData;
		// TODO: add !live
		inventoryData = inventoryData?.filter((data) => data.live);
	});
	onDestroy(unsubscribeOysterStore);

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	// get searched data based on searchInput
	$: searchedData = getSearchedInventoryData(searchInput, inventoryData);

	// get page array based on inventory and itemsPerPage
	$: pageCount = Math.ceil((searchedData?.length ?? 0) / itemsPerPage);

	// get paginated data based on activePage
	$: paginatedData = searchedData?.slice(
		(activePage - 1) * itemsPerPage,
		activePage * itemsPerPage
	);
</script>

<PageTitle title={'My Past Orders'} backHref={'/oyster/inventory'} />
<div class="flex gap-4 items-center mb-6">
	<SearchBar bind:input={searchInput} placeholder={'Search for Operator'} styleClass={'w-full'} />
</div>
<OysterHistoryTable handleSortData={() => {}} tableHeading={kOysterHistoryTableHeader}>
	{#if paginatedData?.length}
		{#each paginatedData as rowData, rowIndex}
			<OysterHistoryTableRow {rowData} {rowIndex} />
		{/each}
	{:else}
		<div class={tableCellClasses.empty}>
			{'No data found!'}
		</div>
	{/if}
	<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
</OysterHistoryTable>
