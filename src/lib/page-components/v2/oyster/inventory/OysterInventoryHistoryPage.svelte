<script lang="ts">
	import Pagination from '$lib/components/v2/pagination/Pagination.svelte';
	import PageTitle from '$lib/components/v2/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type {
		OysterInventoryDataModel,
		OysterInventorySortKeys
	} from '$lib/types/oysterComponentType';
	import { OYSTER_HISTORY_TABLE_HEADER } from '$lib/utils/constants/v2/oysterConstants';
	import { getSearchedInventoryData, sortOysterInventory } from '$lib/utils/helpers/oysterHelpers';
	import OysterTableCommon from '$lib/page-components/v2/oyster/inventory/OysterTableCommon.svelte';
	import OysterInventoryHistoryTableRow from '$lib/page-components/v2/oyster/inventory/OysterInventoryHistoryTableRow.svelte';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import { staticImages } from '$lib/components/images/staticImages';
	import { ROUTES } from '$lib/utils/constants/v2/urls';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
	import SearchWithSelect from '$lib/components/v2/search/SearchWithSelect.svelte';

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
	$: inventoryData = $oysterStore.jobsData?.filter(
		(data) => data.status === 'completed' || data.status === 'closed'
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

<div class="flex gap-[14px]">
	<a
		class="mb-8 flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[#D9DADE] bg-white"
		href={ROUTES.OYSTER_INVENTORY_URL}
	>
		<img src={staticImages.backIcon} alt="Back Icon" />
	</a>
	<PageTitle title="My Past Orders" />
</div>
<div class="mb-6 flex items-center gap-4 rounded-[24px] bg-white px-8 py-6">
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
</div>
<OysterTableCommon
	{handleSortData}
	loading={!$oysterStore.oysterStoreLoaded}
	tableHeading={OYSTER_HISTORY_TABLE_HEADER}
	noDataFound={paginatedData?.length ? false : true}
>
	{#if paginatedData?.length}
		{#each paginatedData as rowData, rowIndex}
			<tr class={cn(tableClasses.row, 'group/row h-16 hover:bg-base-200')}>
				<OysterInventoryHistoryTableRow {rowData} {rowIndex} />
			</tr>
		{/each}
	{/if}
</OysterTableCommon>
<Pagination {pageCount} {activePage} {handlePageChange} />
