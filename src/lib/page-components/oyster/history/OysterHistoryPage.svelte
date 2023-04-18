<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { getOysterJobs } from '$lib/controllers/subgraphController';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import type { Address, WalletStore } from '$lib/types/storeTypes';
	import { kOysterHistoryTableHeader } from '$lib/utils/constants/oysterConstants';
	import { getSearchedInventoryData } from '$lib/utils/helpers/oysterHelpers';
	import { onDestroy } from 'svelte';
	import plus from 'svelte-awesome/icons/plus';
	import type { Unsubscriber } from 'svelte/store';
	import OysterHistoryTable from './OysterHistoryTable.svelte';
	import OysterHistoryTableRow from './OysterHistoryTableRow.svelte';

	let searchInput = '';
	let activePage = 1;

	// TODO: move to utils and make it 10
	const itemsPerPage = 5;

	let address: Address;
	let inventoryData: OysterInventoryDataModel[] | undefined;
	let loading = true;

	const unsubscribeWalletStore: Unsubscriber = walletStore.subscribe(async (value: WalletStore) => {
		address = value.address;
		if (address) {
			loading = true;
			// TODO: change to address
			inventoryData = await getOysterJobs('0x7aa8e222deddd49a6bdb5bffd0ac5fe17e1e0176');
			// inventoryData = inventoryData?.filter((data) => !data.live);
			// TODO: remove this
			inventoryData = inventoryData?.filter((data) => data.live);
			loading = false;
		}
	});
	onDestroy(unsubscribeWalletStore);

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

<PageTitle title={'My Active Orders'}>
	<svelte:fragment slot="button">
		<Button variant="outlined" size="tiny" onclick={() => {}}>GUIDE</Button>
	</svelte:fragment>
</PageTitle>
<div class="flex gap-4 items-center mb-6">
	<SearchBar bind:input={searchInput} placeholder={'Search for Operator'} styleClass={'w-full'} />
	<a href={`/oyster/history`}>
		<div class={`h-12 ${buttonClasses.outlined}`}>HISTORY</div>
	</a>
	<ModalButton variant="filled" modalFor={'create-new-order'} icon={plus}>ADD ORDER</ModalButton>
</div>
<OysterHistoryTable handleSortData={() => {}} tableHeading={kOysterHistoryTableHeader}>
	{#if paginatedData?.length}
		{#each paginatedData as rowData, rowIndex}
			<OysterHistoryTableRow {rowData} {rowIndex} />
		{/each}
	{/if}
	<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
</OysterHistoryTable>
