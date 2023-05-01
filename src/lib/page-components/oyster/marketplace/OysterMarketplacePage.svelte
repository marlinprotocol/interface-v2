<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import OysterInventoryTable from '$lib/page-components/oyster/inventory/InventoryTable.svelte';
	import CreateOrderModal from '$lib/page-components/oyster/inventory/modals/CreateOrderModal.svelte';
	import type { OysterMarketplaceDataModel } from '$lib/types/oysterComponentType';
	import {
		kMarketplaceTableColumnsWidth,
		kOysterMarketplaceTableHeader,
		oysterTableItemsPerPage
	} from '$lib/utils/constants/oysterConstants';
	import { sortOysterMarketplace } from '$lib/utils/helpers/oysterHelpers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import OysterMarketplaceFilters from './OysterMarketplaceFilters.svelte';
	import OysterMarketplaceTableRow from './OysterMarketplaceTableRow.svelte';

	let activePage = 1;
	let loading = true;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};
	let filterMap: Record<string, string> = {};

	const itemsPerPage = oysterTableItemsPerPage;

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
	<div class="flex gap-4 items-center mb-6">
		<OysterMarketplaceFilters
			bind:filteredData
			bind:filterMap
			{allMarketplaceData}
			{onFilterClick}
		/>
	</div>
	<OysterInventoryTable
		walletConnectionRequired={false}
		{handleSortData}
		tableHeading={kOysterMarketplaceTableHeader}
		widthFunction={kMarketplaceTableColumnsWidth}
	>
		{#if loading}
			<div class={'text-center flex justify-center my-4'}>
				<LoadingAnimatedPing />
			</div>
		{:else if paginatedData?.length}
			{#each paginatedData as rowData, rowIndex (rowData.id)}
				<OysterMarketplaceTableRow {rowData} {rowIndex} />
			{/each}
		{:else}
			<div class={tableCellClasses.empty}>
				{'No data found!'}
			</div>
		{/if}
		<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
	</OysterInventoryTable>
</div>
<CreateOrderModal modalFor="create-new-order" />
