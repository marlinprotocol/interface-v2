<script lang="ts">
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { kHistoryData, kOysterHistoryTableHeader } from '$lib/utils/constants/oysterConstants';
	import OysterHistoryTable from './OysterHistoryTable.svelte';
	import OysterHistoryTableRow from './OysterHistoryTableRow.svelte';
	let input = '';
</script>

<PageTitle title={'My Past Orders'} backHref={'/oyster/inventory'} />
<div class="flex gap-4 items-center mb-6">
	<SearchBar bind:input placeholder={'Search for Operator'} styleClass={'max-w-2xl'} />
</div>
<OysterHistoryTable handleSortData={() => {}} tableHeading={kOysterHistoryTableHeader}>
	{#if kHistoryData?.length}
		{#each kHistoryData as rowData, rowIndex}
			<OysterHistoryTableRow {rowData} {rowIndex} />
		{/each}
	{/if}
	<!-- TODO: paginatipn -->
</OysterHistoryTable>
