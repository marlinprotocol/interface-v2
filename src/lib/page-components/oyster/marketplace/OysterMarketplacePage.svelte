<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type {
		OysterMarketplaceDataModel,
		OysterMarketplaceSortKeys
	} from '$lib/types/oysterComponentType';
	import { OYSTER_MARKETPLACE_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import { sortOysterMarketplace } from '$lib/utils/helpers/oysterHelpers';
	import OysterTableCommon from '$lib/page-components/oyster/inventory/OysterTableCommon.svelte';
	import OysterMarketplaceFilters from '$lib/page-components/oyster/marketplace/OysterMarketplaceFilters.svelte';
	import OysterMarketplaceTableRow from '$lib/page-components/oyster/marketplace/OysterMarketplaceTableRow.svelte';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import { chainIdHasChanged, chainStore } from '$lib/data-stores/chainProviderStore';

	let activePage = 1;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};
	let filterMap: Record<string, string> = {};
	let filteredData: OysterMarketplaceDataModel[];
	let previousChainId: number | null = null;

	const handleSortData = (id: string) => {
		if (sortingMap[id]) {
			sortingMap[id] = sortingMap[id] === 'asc' ? 'desc' : 'asc';
		} else {
			sortingMap[id] = 'asc';
		}
		filteredData = sortOysterMarketplace(
			filteredData,
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
		_filteredData: OysterMarketplaceDataModel[],
		_allMarketplaceData: OysterMarketplaceDataModel[]
	) {
		if (chainIdHasChanged(currentChainId, previousChainId)) {
			previousChainId = currentChainId;
			filterMap = {};
			return _allMarketplaceData;
		} else if (_filterMap && Object.keys(_filterMap).length > 0) {
			return _filteredData;
		} else {
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
	<OysterMarketplaceFilters bind:filteredData bind:filterMap {onFilterClick} />
	<OysterTableCommon
		walletConnectionRequired={false}
		{handleSortData}
		tableHeading={OYSTER_MARKETPLACE_TABLE_HEADER}
		loading={!$oysterStore.marketplaceLoaded}
		noDataFound={!paginatedData?.length}
	>
		{#if paginatedData?.length}
			{#each paginatedData as rowData, rowIndex (rowData.id)}
				<OysterMarketplaceTableRow {rowData} {rowIndex} />
			{/each}
			<tr>
				<td colspan="12">
					<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
				</td>
			</tr>
		{/if}
	</OysterTableCommon>
</div>
