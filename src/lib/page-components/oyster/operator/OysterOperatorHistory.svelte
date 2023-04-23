<script lang="ts">
	import SearchBar from '$lib/components/search/SearchBar.svelte';

	import OysterInventoryTable from '$lib/page-components/oyster/inventory/InventoryTable.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import {
		kOperatorHistoryTableColumnsWidth,
		kOysterOperatorHistoryTableHeader,
		oysterTableItemsPerPage
	} from '$lib/utils/constants/oysterConstants';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import type { Unsubscriber } from 'svelte/store';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { onDestroy } from 'svelte';
	import {
		getSearchedInventoryData,
		sortOysterOperatorHistory
	} from '$lib/utils/helpers/oysterHelpers';
	import OysterOperatorHistoryTableRow from './OysterOperatorHistoryTableRow.svelte';

	let searchInput = '';
	let activePage = 1;
	let operatorHistoryData: OysterInventoryDataModel[] | undefined;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};

	const itemsPerPage = oysterTableItemsPerPage;

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		operatorHistoryData = value.jobsData;
		operatorHistoryData = operatorHistoryData?.filter((data) => !data.live);
	});
	onDestroy(unsubscribeOysterStore);

	const handleSortData = (id: string) => {
		if (sortingMap[id]) {
			sortingMap[id] = sortingMap[id] === 'asc' ? 'desc' : 'asc';
		} else {
			sortingMap[id] = 'asc';
		}
		operatorHistoryData = sortOysterOperatorHistory(
			operatorHistoryData,
			id as keyof OysterInventoryDataModel,
			sortingMap[id]
		);
	};

	// get searched data based on searchInput
	$: searchedData = getSearchedInventoryData(searchInput, operatorHistoryData);

	// get page array based on inventory and itemsPerPage
	$: pageCount = Math.ceil((searchedData?.length ?? 0) / itemsPerPage);

	// get paginated data based on activePage
	$: paginatedData = searchedData?.slice(
		(activePage - 1) * itemsPerPage,
		activePage * itemsPerPage
	);
</script>

<div class="mx-auto">
	<PageTitle title={'History of Claims'} backHref={'/oyster/operator/jobs'} />
	<div class="flex gap-4 items-center mb-6">
		<SearchBar
			bind:input={searchInput}
			placeholder={'Search for user, instance or region'}
			styleClass={'w-full'}
		/>
	</div>
	<OysterInventoryTable
		{handleSortData}
		tableHeading={kOysterOperatorHistoryTableHeader}
		widthFunction={kOperatorHistoryTableColumnsWidth}
	>
		{#if paginatedData?.length}
			{#each paginatedData as rowData, rowIndex}
				<OysterOperatorHistoryTableRow {rowData} {rowIndex} />
			{/each}
		{:else}
			<div class={tableCellClasses.empty}>
				{'No data found!'}
			</div>
		{/if}
		<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
	</OysterInventoryTable>
</div>
