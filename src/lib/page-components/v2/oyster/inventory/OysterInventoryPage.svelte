<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import OysterInventoryTableRow from '$lib/page-components/v2/oyster/inventory/OysterInventoryTableRow.svelte';
	import type { OysterInventorySortKeys } from '$lib/types/oysterComponentType';
	import { OYSTER_INVENTORY_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import { getSearchedInventoryData, sortOysterInventory } from '$lib/utils/helpers/oysterHelpers';
	import OysterTableCommon from '$lib/page-components/oyster/inventory/OysterTableCommon.svelte';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import { OYSTER_OWNER_HISTORY_URL } from '$lib/utils/constants/urls';
	import { buttonClasses } from '$lib/atoms/componentClasses';

	let searchInput = '';
	let activePage = 1;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};

	// Defining a Set to store the indices of the expanded rows
	let expandedRows = new Set<string>();

	const handleSortData = (id: string) => {
		if (sortingMap[id]) {
			sortingMap[id] = sortingMap[id] === 'asc' ? 'desc' : 'asc';
		} else {
			sortingMap[id] = 'asc';
		}
		searchedData = sortOysterInventory(searchedData, id as OysterInventorySortKeys, sortingMap[id]);
	};

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const onSearchClick = () => {
		activePage = 1;
	};

	// fiter inventory data based on job status
	$: inventoryData = $oysterStore.jobsData?.filter(
		(data) => data.status !== 'completed' && data.status !== 'closed'
	);
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
	<PageTitle title="My Active Orders" />
	<div class="mb-6 flex items-center gap-4">
		<SearchBar
			{onSearchClick}
			bind:input={searchInput}
			placeholder="Search for operator, instance or region"
			styleClass="w-full"
			disabled={!$connected}
		/>
		<a href={OYSTER_OWNER_HISTORY_URL}>
			<div class="{buttonClasses.outlined} h-12 whitespace-nowrap">ORDER HISTORY</div>
		</a>
	</div>
	<OysterTableCommon
		{handleSortData}
		tableHeading={OYSTER_INVENTORY_TABLE_HEADER}
		loading={!$oysterStore.oysterStoreLoaded}
		noDataFound={paginatedData?.length ? false : true}
		emptyTableMessage="You do not have any active orders."
	>
		{#if paginatedData?.length}
			{#each paginatedData as rowData, rowIndex (rowData.id)}
				<OysterInventoryTableRow {rowData} {rowIndex} bind:expandedRows />
			{/each}
		{/if}
		<Pagination slot="pagination" {pageCount} {activePage} {handlePageChange} />
	</OysterTableCommon>
</div>
