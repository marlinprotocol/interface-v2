<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import OysterOperatorInventoryTableRow from '$lib/page-components/oyster/operator/OysterOperatorInventoryTableRow.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import {
		kOysterMerchantJobTableHeader,
		oysterTableItemsPerPage
	} from '$lib/utils/constants/oysterConstants';
	import {
		getSearchedOysterJobsData,
		sortOysterOperatorInventory
	} from '$lib/utils/helpers/oysterHelpers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import OysterTableCommon from '../inventory/OysterTableCommon.svelte';

	let searchInput = '';
	let loading = true;
	let activePage = 1;
	let merchantJobsData: OysterInventoryDataModel[] | undefined;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		merchantJobsData = value.merchantJobsData;
		merchantJobsData = merchantJobsData.filter((job) => job.live);
		loading = !value.merchantJobsLoaded;
	});

	const itemsPerPage = oysterTableItemsPerPage;

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

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const onSearchClick = () => {
		activePage = 1;
	};

	// get searched data based on searchInput
	$: searchedData = getSearchedOysterJobsData(searchInput, merchantJobsData);

	$: pageCount = Math.ceil((searchedData?.length ?? 0) / itemsPerPage);

	$: paginatedData = searchedData?.slice(
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
	<!-- commenting the operator history page -->
	<!-- <a href={kOperatorHistory}>
		<div class={`h-12 ${buttonClasses.outlined}`}>HISTORY</div>
	</a> -->
</div>
<OysterTableCommon
	{handleSortData}
	tableHeading={kOysterMerchantJobTableHeader}
	{loading}
	noDataFound={paginatedData?.length ? false : true}
>
	{#if paginatedData?.length}
		{#each paginatedData as rowData, rowIndex (rowData.id)}
			<OysterOperatorInventoryTableRow {rowData} {rowIndex} />
		{/each}
		<tr>
			<td colspan="12">
				<Pagination {pageCount} {activePage} {handlePageChange} styleClass="mt-6" />
			</td>
		</tr>
	{/if}
</OysterTableCommon>
