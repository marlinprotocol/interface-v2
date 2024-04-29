<script lang="ts">
	import Pagination from '$lib/components/v2/pagination/Pagination.svelte';
	import PageTitle from '$lib/components/v2/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type {
		OysterMarketplaceDataModel,
		OysterMarketplaceSortKeys
	} from '$lib/types/oysterComponentType';
	import { sortOysterMarketplace } from '$lib/utils/helpers/oysterHelpers';
	import OysterTableCommon from '$lib/page-components/v2/oyster/inventory/OysterTableCommon.svelte';
	import OysterMarketplaceFilters from '$lib/page-components/v2/oyster/marketplace/OysterMarketplaceFilters.svelte';
	import OysterMarketplaceTableRow from '$lib/page-components/v2/oyster/marketplace/OysterMarketplaceTableRow.svelte';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import { chainIdHasChanged, chainStore } from '$lib/data-stores/chainProviderStore';
	import { OYSTER_MARKETPLACE_TABLE_HEADER } from '$lib/utils/constants/v2/oysterConstants';
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';

	let activePage = 1;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};
	let filterMap: Record<string, string> = {};
	let filteredData: OysterMarketplaceDataModel[] | null;
	let previousChainId: number | null = null;

	const handleSortData = (id: string) => {
		if (sortingMap[id]) {
			sortingMap[id] = sortingMap[id] === 'asc' ? 'desc' : 'asc';
		} else {
			sortingMap[id] = 'asc';
		}
		filteredData = sortOysterMarketplace(
			filteredData || $oysterStore.allMarketplaceData,
			id as OysterMarketplaceSortKeys,
			sortingMap[id]
		);
	};

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const onFilterClick = () => {
		activePage = 1;
	};

	function getTableData(
		currentChainId: number | null,
		_filterMap: Record<string, string>,
		_filteredData: OysterMarketplaceDataModel[] | null,
		_allMarketplaceData: OysterMarketplaceDataModel[]
	) {
		if (chainIdHasChanged(currentChainId, previousChainId)) {
			previousChainId = currentChainId;
			filterMap = {};
			filteredData = null;
			return _allMarketplaceData;
		} else if (_filterMap && Object.keys(_filterMap).length > 0) {
			filteredData = _filteredData;
			return _filteredData;
		} else {
			filteredData = _allMarketplaceData;
			return _allMarketplaceData;
		}
	}

	$: tableData = getTableData(
		$chainStore.chainId,
		filterMap,
		filteredData,
		$oysterStore.allMarketplaceData
	);
	// get page array based on inventory and itemsPerPage
	$: pageCount = Math.ceil((tableData?.length ?? 0) / TABLE_ITEMS_PER_PAGE);
	// get paginated data based on activePage
	$: paginatedData = tableData?.slice(
		(activePage - 1) * TABLE_ITEMS_PER_PAGE,
		activePage * TABLE_ITEMS_PER_PAGE
	);
</script>

<div class="mx-auto">
	<PageTitle title="Infrastructure Providers" />
	{#if filteredData}
		<OysterMarketplaceFilters bind:filteredData bind:filterMap {onFilterClick} />
	{/if}
	<OysterTableCommon
		walletConnectionRequired={false}
		{handleSortData}
		tableHeading={OYSTER_MARKETPLACE_TABLE_HEADER}
		loading={!$oysterStore.marketplaceLoaded}
		noDataFound={!paginatedData?.length}
	>
		{#if paginatedData?.length}
			{#each paginatedData as rowData, rowIndex (rowData.id)}
				<tr class={cn(tableClasses.row, 'group/row h-[64px] hover:bg-base-200')}>
					<OysterMarketplaceTableRow {rowData} {rowIndex} />
				</tr>
			{/each}
		{/if}
	</OysterTableCommon>
	<Pagination {pageCount} {activePage} {handlePageChange} />
</div>
