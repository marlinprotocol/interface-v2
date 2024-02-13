<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type {
		OysterInventoryDataModel,
		OysterInventorySortKeys
	} from '$lib/types/oysterComponentType';
	import { OYSTER_HISTORY_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import { getSearchedInventoryData, sortOysterInventory } from '$lib/utils/helpers/oysterHelpers';
	import OysterTableCommon from '$lib/page-components/oyster/inventory/OysterTableCommon.svelte';
	import OysterHistoryTableRow from '$lib/page-components/oyster/history/OysterHistoryTableRow.svelte';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import { OYSTER_OWNER_INVENTORY_URL } from '$lib/utils/constants/urls';

	let searchInput = '';
	let activePage = 1;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};
	let inventoryData: OysterInventoryDataModel[] | undefined;

	const handleSortData = (id: string) => {
		if (sortingMap[id]) {
			sortingMap[id] = sortingMap[id] === 'asc' ? 'desc' : 'asc';
		} else {
			sortingMap[id] = 'asc';
		}
		inventoryData = sortOysterInventory(
			inventoryData,
			id as OysterInventorySortKeys,
			sortingMap[id]
		);
	};

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const onSearchClick = () => {
		activePage = 1;
	};

	// fiter inventory data based on job status
	$: inventoryData = $oysterStore.jobsData?.filter((data) => data.status === 'completed');
	// get searched data based on searchInput
	$: searchedData = getSearchedInventoryData(searchInput, inventoryData);
	// get page array based on inventory and itemsPerPage
	$: pageCount = Math.ceil((searchedData?.length ?? 0) / TABLE_ITEMS_PER_PAGE);
	// get paginated data based on activePage
	$: paginatedData = searchedData?.slice(
		(activePage - 1) * TABLE_ITEMS_PER_PAGE,
		activePage * TABLE_ITEMS_PER_PAGE
	);
</script>

<div class="mx-auto">
	<PageTitle title="My Past Orders" backHref={OYSTER_OWNER_INVENTORY_URL} />
	<div class="mb-6 flex items-center gap-4">
		<SearchBar
			disabled={!$connected}
			{onSearchClick}
			bind:input={searchInput}
			placeholder="Search for operator, instance or region"
			styleClass="w-full"
		/>
	</div>
	<OysterTableCommon
		{handleSortData}
		tableHeading={OYSTER_HISTORY_TABLE_HEADER}
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
