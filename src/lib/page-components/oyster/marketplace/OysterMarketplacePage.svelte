<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses, tableCellClasses } from '$lib/atoms/componentClasses';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type {
		OysterInventoryDataModel,
		OysterMarketplaceDataModel
	} from '$lib/types/oysterComponentType';
	import {
		kInventoryTableColumnsWidth,
		kOysterInventoryTableHeader,
		oysterTableItemsPerPage
	} from '$lib/utils/constants/oysterConstants';
	import { getSearchedInventoryData, sortOysterInventory } from '$lib/utils/helpers/oysterHelpers';
	import { onDestroy } from 'svelte';
	import plus from 'svelte-awesome/icons/plus';
	import type { Unsubscriber } from 'svelte/store';
	import OysterInventoryTable from '$lib/page-components/oyster/inventory/InventoryTable.svelte';
	import OysterInventoryTableRow from '$lib/page-components/oyster/inventory/OysterInventoryTableRow.svelte';
	import CreateOrderModal from '$lib/page-components/oyster/inventory/modals/CreateOrderModal.svelte';
	import LoadingCircular from '$lib/atoms/loading/LoadingCircular.svelte';

	let searchInput = '';
	let activePage = 1;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};

	const itemsPerPage = oysterTableItemsPerPage;

	let providerData: OysterMarketplaceDataModel[] | undefined;

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		providerData = value.providerData;
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
	<PageTitle title={'My Active Orders'}>
		<svelte:fragment slot="button">
			<Button variant="outlined" size="tiny" onclick={() => {}}>GUIDE</Button>
		</svelte:fragment>
	</PageTitle>
	<div class="flex gap-4 items-center mb-6">
		<SearchBar
			bind:input={searchInput}
			placeholder={'Search for operator, instance or region'}
			styleClass={'w-full'}
		/>
		<a href={`/oyster/history`}>
			<div class={`h-12 ${buttonClasses.outlined}`}>HISTORY</div>
		</a>
		<ModalButton variant="filled" modalFor={'create-new-order'} icon={plus}>ADD ORDER</ModalButton>
	</div>
	<OysterInventoryTable
		{handleSortData}
		tableHeading={kOysterInventoryTableHeader}
		widthFunction={kInventoryTableColumnsWidth}
	>
		{#if loading}
			<div class={'text-center flex justify-center my-4'}>
				<LoadingCircular />
			</div>
		{:else if paginatedData?.length}
			{#each paginatedData as rowData, rowIndex}
				<OysterInventoryTableRow {rowData} {rowIndex} />
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
