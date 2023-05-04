<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import {
		kOysterHistoryTableHeader,
		oysterTableItemsPerPage
	} from '$lib/utils/constants/oysterConstants';
	import { getSearchedInventoryData, sortOysterInventory } from '$lib/utils/helpers/oysterHelpers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import OysterTableCommon from '../inventory/OysterTableCommon.svelte';
	import OysterHistoryTableRow from './OysterHistoryTableRow.svelte';

	let searchInput = '';
	let activePage = 1;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};

	const itemsPerPage = oysterTableItemsPerPage;

	let inventoryData: OysterInventoryDataModel[] | undefined;

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		inventoryData = value.jobsData;
		inventoryData = inventoryData?.filter((data) => !data.live);
	});
	onDestroy(unsubscribeOysterStore);

	const handleSortData = (id: string) => {
		if (sortingMap[id]) {
			sortingMap[id] = sortingMap[id] === 'asc' ? 'desc' : 'asc';
		} else {
			sortingMap[id] = 'asc';
		}
		inventoryData = sortOysterInventory(
			inventoryData,
			id as keyof OysterInventoryDataModel,
			sortingMap[id]
		);
	};

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const onSearchClick = () => {
		activePage = 1;
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
			disabled={!$connected}
			{onSearchClick}
			bind:input={searchInput}
			placeholder={'Search for operator, instance or region'}
			styleClass={'w-full'}
		/>
	</div>
	<OysterTableCommon
		{handleSortData}
		tableHeading={kOysterHistoryTableHeader}
		noDataFound={paginatedData?.length ? false : true}
	>
		{#if paginatedData?.length}
			{#each paginatedData as rowData, rowIndex}
				<OysterHistoryTableRow {rowData} {rowIndex} />
			{/each}
		{/if}
		<tr>
			<td colspan="12">
				<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
			</td>
		</tr>
	</OysterTableCommon>
</div>
