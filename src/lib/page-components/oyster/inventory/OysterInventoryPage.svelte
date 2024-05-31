<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import OysterInventoryTableRow from '$lib/page-components/oyster/inventory/OysterInventoryTableRow.svelte';
	import OysterInventoryExpandedTableRow from '$lib/page-components/oyster/inventory/OysterInventoryExpandedTableRow.svelte';
	import type { OysterInventorySortKeys } from '$lib/types/oysterComponentType';
	import { OYSTER_INVENTORY_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import { getSearchedInventoryData, sortOysterInventory } from '$lib/utils/helpers/oysterHelpers';
	import OysterTableCommon from '$lib/page-components/oyster/inventory/OysterTableCommon.svelte';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import { ROUTES } from '$lib/utils/constants/urls';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { tableClasses } from '$lib/atoms/componentClasses';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import { connected } from '$lib/data-stores/walletProviderStore';

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
		(data) => data.status !== 'completed' && data.status !== 'stopped'
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
	$: isSearchInputDisabled = !$connected;
</script>

<PageTitle title="My Active Orders" />
<div class="mb-6 flex items-stretch gap-4 rounded-[24px] bg-white px-8 py-6">
	<SearchWithSelect
		dataList={inventoryData?.map((id) => id.id.toString())}
		searchValue={searchInput}
		setSearchValue={(value, exactMatch) => {
			searchInput = value.toString();
		}}
		title="Job Name"
		disabled={isSearchInputDisabled}
		showTitle={false}
		placeholder="Search"
		label="Job name or ID"
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
	flexibleHeight
	tableHeading={OYSTER_INVENTORY_TABLE_HEADER}
	loading={!$oysterStore.oysterStoreLoaded}
	noDataFound={paginatedData?.length ? false : true}
	emptyTableMessage="You do not have any active orders."
>
	{#if paginatedData?.length}
		{#each paginatedData as rowData, rowIndex (rowData.id)}
			<tr class="group/row peer h-[64px] hover:bg-base-200">
				<OysterInventoryTableRow {rowData} {rowIndex} bind:expandedRows />
			</tr>
			<tr class={cn(tableClasses.row, 'peer-hover:bg-base-200')}>
				<OysterInventoryExpandedTableRow {rowData} {expandedRows} />
			</tr>
		{/each}
	{/if}
</OysterTableCommon>
<Pagination {pageCount} {activePage} {handlePageChange} />
