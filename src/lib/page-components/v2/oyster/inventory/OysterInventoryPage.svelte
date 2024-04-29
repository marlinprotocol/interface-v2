<script lang="ts">
	import Pagination from '$lib/components/v2/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/v2/search/SearchBar.svelte';
	import PageTitle from '$lib/components/v2/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import OysterInventoryTableRow from '$lib/page-components/v2/oyster/inventory/OysterInventoryTableRow.svelte';
	import OysterInventoryExpandedTableRow from '$lib/page-components/v2/oyster/inventory/OysterInventoryExpandedTableRow.svelte';
	import type { OysterInventorySortKeys } from '$lib/types/oysterComponentType';
	import { OYSTER_INVENTORY_TABLE_HEADER } from '$lib/utils/constants/v2/oysterConstants';
	import { getSearchedInventoryData, sortOysterInventory } from '$lib/utils/helpers/oysterHelpers';
	import OysterTableCommon from '$lib/page-components/v2/oyster/inventory/OysterTableCommon.svelte';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import { ROUTES } from '$lib/utils/constants/v2/urls';
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
	import SearchWithSelect from '$lib/components/v2/search/SearchWithSelect.svelte';

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

<PageTitle title="My Active Orders" />
<div class="mb-6 flex items-stretch gap-4 rounded-[24px] bg-white px-8 py-6">
	<SearchWithSelect
		dataList={inventoryData?.map((id) => id.provider.address)}
		searchValue={searchInput}
		setSearchValue={(value, exactMatch) => {
			searchInput = value.toString();
		}}
		title="Operator"
		showTitle={false}
		placeholder="Search"
		label="Operator name or address"
		cardVariant="search"
		styleClass="w-full"
		{onSearchClick}
		isTableFilter={true}
	/>
	<a class="flex h-full" href={ROUTES.OYSTER_INVENTORY_HISTORY_URL}>
		<Button
			size="medium"
			variant="outlined"
			styleClass="font-normal h-full whitespace-nowrap px-[38px] py-[18px]">Order History</Button
		>
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
			<tr class="group h-[64px] hover:bg-base-200">
				<OysterInventoryTableRow {rowData} {rowIndex} bind:expandedRows />
			</tr>
			<tr class={tableClasses.row}>
				<OysterInventoryExpandedTableRow {rowData} {expandedRows} />
			</tr>
		{/each}
	{/if}
</OysterTableCommon>
<Pagination {pageCount} {activePage} {handlePageChange} />
