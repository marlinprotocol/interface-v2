<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import CreateOrderModal from '$lib/page-components/oyster/inventory/modals/CreateOrderModal.svelte';
	import type { OysterMarketplaceDataModel } from '$lib/types/oysterComponentType';
	import { OYSTER_MARKETPLACE_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import { sortOysterMarketplace } from '$lib/utils/helpers/oysterHelpers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import OysterTableCommon from '$lib/page-components/oyster/inventory/OysterTableCommon.svelte';
	import OysterMarketplaceFilters from '$lib/page-components/oyster/marketplace/OysterMarketplaceFilters.svelte';
	import OysterMarketplaceTableRow from '$lib/page-components/oyster/marketplace/OysterMarketplaceTableRow.svelte';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';

	let activePage = 1;
	let loading = true;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};
	let filterMap: Record<string, string> = {};

	const itemsPerPage = TABLE_ITEMS_PER_PAGE;

	let allMarketplaceData: OysterMarketplaceDataModel[];
	let filteredData: OysterMarketplaceDataModel[];

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		allMarketplaceData = value.allMarketplaceData;
		filteredData = allMarketplaceData;
		loading = !value.marketplaceLoaded;
	});
	onDestroy(unsubscribeOysterStore);

	const handleSortData = (id: string) => {
		if (sortingMap[id]) {
			sortingMap[id] = sortingMap[id] === 'asc' ? 'desc' : 'asc';
		} else {
			sortingMap[id] = 'asc';
		}
		filteredData = sortOysterMarketplace(filteredData, id, sortingMap[id]);
	};

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const onFilterClick = () => {
		activePage = 1;
	};

	// get page array based on inventory and itemsPerPage
	$: pageCount = Math.ceil((filteredData?.length ?? 0) / itemsPerPage);

	// get paginated data based on activePage
	$: paginatedData = filteredData?.slice(
		(activePage - 1) * itemsPerPage,
		activePage * itemsPerPage
	);
</script>

<div class="mx-auto">
	<PageTitle title={'Infrastructure Providers'} />
	<OysterMarketplaceFilters bind:filteredData bind:filterMap {allMarketplaceData} {onFilterClick} />
	<OysterTableCommon
		walletConnectionRequired={false}
		{handleSortData}
		tableHeading={OYSTER_MARKETPLACE_TABLE_HEADER}
		{loading}
		noDataFound={paginatedData?.length ? false : true}
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
<CreateOrderModal modalFor="create-new-order" />
