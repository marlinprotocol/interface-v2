<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { kHistoryData, kOysterHistoryTableHeader } from '$lib/utils/constants/oysterConstants';
	import OysterHistoryTable from './OysterHistoryTable.svelte';
	import OysterHistoryTableRow from './OysterHistoryTableRow.svelte';
	let input = '';
	let activePage = 1;
	const itemsPerPage = 5;

	const pageCount = Math.ceil(kHistoryData.length / itemsPerPage);

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	$: paginatedData = kHistoryData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
</script>

<PageTitle title={'My Past Orders'} backHref={'/oyster/inventory'} />
<div class="flex gap-4 items-center mb-6">
	<SearchBar bind:input placeholder={'Search for Operator'} styleClass={'w-full'} />
</div>
<OysterHistoryTable handleSortData={() => {}} tableHeading={kOysterHistoryTableHeader}>
	{#if paginatedData?.length}
		{#each paginatedData as rowData, rowIndex}
			<OysterHistoryTableRow {rowData} {rowIndex} />
		{/each}
	{/if}
	<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
</OysterHistoryTable>
