<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import {
		kInventoryData,
		kOysterInventoryTableHeader
	} from '$lib/utils/constants/oysterConstants';
	import plus from 'svelte-awesome/icons/plus';
	import CreateOrderModal from './CreateOrderModal.svelte';
	import OysterInventoryTable from './InventoryTable.svelte';
	import OysterInventoryTableRow from './InventoryTableRow.svelte';

	let input = '';
	let activePage = 1;

	// TODO: move to utils and make it 10
	const itemsPerPage = 5;

	// get page array based on kInventoryData and itemsPerPage
	const pageCount = Math.ceil(kInventoryData.length / itemsPerPage);

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	$: paginatedData = kInventoryData.slice(
		(activePage - 1) * itemsPerPage,
		activePage * itemsPerPage
	);
</script>

<PageTitle title={'My Active Orders'}>
	<svelte:fragment slot="button">
		<Button variant="outlined" size="tiny" onclick={() => {}}>GUIDE</Button>
	</svelte:fragment>
</PageTitle>
<div class="flex gap-4 items-center mb-6">
	<SearchBar bind:input placeholder={'Search for Operator'} styleClass={'w-full'} />
	<a href={`/oyster/history`}>
		<div class={`h-12 ${buttonClasses.outlined}`}>HISTORY</div>
	</a>
	<ModalButton variant="filled" modalFor={'create-new-order'} icon={plus}>ADD ORDER</ModalButton>
</div>
<OysterInventoryTable handleSortData={() => {}} tableHeading={kOysterInventoryTableHeader}>
	{#if paginatedData?.length}
		{#each paginatedData as rowData, rowIndex}
			<OysterInventoryTableRow {rowData} {rowIndex} />
		{/each}
	{/if}
	<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
</OysterInventoryTable>
<CreateOrderModal modalFor="create-new-order" />
