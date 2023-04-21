<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import OysterInventoryTable from '$lib/page-components/oyster/inventory/InventoryTable.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import {
		kHistoryTableColumnsWidth,
		kOysterHistoryTableHeader,
		oysterTableItemsPerPage
	} from '$lib/utils/constants/oysterConstants';
	import { getSearchedInventoryData } from '$lib/utils/helpers/oysterHelpers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import OysterHistoryTableRow from './OysterHistoryTableRow.svelte';

	let searchInput = '';
	let activePage = 1;

	const itemsPerPage = oysterTableItemsPerPage;

	let inventoryData: OysterInventoryDataModel[] | undefined;

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		inventoryData = value.jobsData;
		inventoryData = inventoryData?.filter((data) => !data.live);
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

<div class="mx-auto">
	<PageTitle title={'My Past Orders'} backHref={'/oyster/inventory'} />
	<div class="flex gap-4 items-center mb-6">
		<SearchBar
			bind:input={searchInput}
			placeholder={'Search for operator, instance or region'}
			styleClass={'w-full'}
		/>
	</div>
	<OysterInventoryTable
		handleSortData={() => {}}
		tableHeading={kOysterHistoryTableHeader}
		widthFunction={kHistoryTableColumnsWidth}
	>
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
	</OysterInventoryTable>
</div>
