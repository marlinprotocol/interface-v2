<script lang="ts">
	import { buttonClasses, tableCellClasses } from '$lib/atoms/componentClasses';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import {
		kOperatorHistory,
		kOysterMerchantJobTableHeader,
		kOysterMerchantJobTableColumnsWidth,
		oysterTableItemsPerPage
	} from '$lib/utils/constants/oysterConstants';
	import OysterInventoryTable from '$lib/page-components/oyster/inventory/InventoryTable.svelte';
	import LoadingCircular from '$lib/atoms/loading/LoadingCircular.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import OysterOperatorInventoryTableRow from '$lib/page-components/oyster/operator/OysterOperatorInventoryTableRow.svelte';
	import { onDestroy } from 'svelte';
	import { sortOysterOperatorInventory } from '$lib/utils/helpers/oysterHelpers';

	let searchInput = '';
	let loading = true;
	let activePage = 1;
	let merchantJobsData: OysterInventoryDataModel[] | undefined;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		merchantJobsData = value.merchantJobsData;
		merchantJobsData = merchantJobsData.filter((job) => job.live);
		// TODO: check loading logic
		loading = false;
	});

	const itemsPerPage = oysterTableItemsPerPage;

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const onSearchClick = () => {
		activePage = 1;
	};

	const handleSortData = (id: string) => {
		if (sortingMap[id]) {
			sortingMap[id] = sortingMap[id] === 'asc' ? 'desc' : 'asc';
		} else {
			sortingMap[id] = 'asc';
		}
		merchantJobsData = sortOysterOperatorInventory(
			merchantJobsData,
			id as keyof OysterInventoryDataModel,
			sortingMap[id]
		);
	};
	$: pageCount = Math.ceil((merchantJobsData?.length ?? 0) / itemsPerPage);

	$: paginatedData = merchantJobsData?.slice(
		(activePage - 1) * itemsPerPage,
		activePage * itemsPerPage
	);
	onDestroy(() => {
		unsubscribeOysterStore();
	});
</script>

<PageTitle title={'My Job List'} backHref={'/oyster/operator'} />
<div class="flex gap-4 items-center mb-6">
	<SearchBar
		{onSearchClick}
		bind:input={searchInput}
		placeholder={'Search'}
		styleClass={'w-full'}
	/>
	<a href={kOperatorHistory}>
		<div class={`h-12 ${buttonClasses.outlined}`}>HISTORY</div>
	</a>
</div>
<OysterInventoryTable
	{handleSortData}
	tableHeading={kOysterMerchantJobTableHeader}
	widthFunction={kOysterMerchantJobTableColumnsWidth}
>
	{#if loading}
		<div class={'text-center flex justify-center my-4'}>
			<LoadingCircular />
		</div>
	{:else if paginatedData?.length}
		{#each paginatedData as rowData, rowIndex}
			<OysterOperatorInventoryTableRow {rowData} {rowIndex} />
		{/each}
	{:else}
		<div class={tableCellClasses.empty}>
			{'No data found!'}
		</div>
	{/if}
	<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
</OysterInventoryTable>
