<script lang="ts">
	import Pagination from '$lib/components/v2/pagination/Pagination.svelte';
	import SearchBar from '$lib/components/v2/search/SearchBar.svelte';
	import PageTitle from '$lib/components/v2/texts/PageTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import OysterOperatorJobsTableRow from '$lib/page-components/v2/oyster/operator/OysterOperatorJobsTableRow.svelte';
	import type {
		OysterInventoryDataModel,
		OysterOperatorInventorySortKeys
	} from '$lib/types/oysterComponentType';
	import { OYSTER_MERCHANT_JOB_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import {
		getSearchedOysterJobsData,
		sortOysterOperatorInventory
	} from '$lib/utils/helpers/oysterHelpers';
	import OysterTableCommon from '$lib/page-components/v2/oyster/inventory/OysterTableCommon.svelte';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import { OYSTER_OPERATOR_HISTORY_URL, OYSTER_OPERATOR_URL } from '$lib/utils/constants/urls';
	import { buttonClasses, tableClasses } from '$lib/atoms/v2/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';

	let searchInput = '';
	let activePage = 1;
	let merchantJobsData: OysterInventoryDataModel[] | undefined;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};

	const handleSortData = (id: string) => {
		if (sortingMap[id]) {
			sortingMap[id] = sortingMap[id] === 'asc' ? 'desc' : 'asc';
		} else {
			sortingMap[id] = 'asc';
		}
		merchantJobsData = sortOysterOperatorInventory(
			merchantJobsData,
			id as OysterOperatorInventorySortKeys,
			sortingMap[id]
		);
	};

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const onSearchClick = () => {
		activePage = 1;
	};

	$: merchantJobsData = $oysterStore.merchantJobsData?.filter((job) => job.status !== 'closed');
	// get searched data based on searchInput
	$: searchedData = getSearchedOysterJobsData(searchInput, merchantJobsData);

	$: pageCount = Math.ceil((searchedData?.length ?? 0) / TABLE_ITEMS_PER_PAGE);

	$: paginatedData = searchedData?.slice(
		(activePage - 1) * TABLE_ITEMS_PER_PAGE,
		activePage * TABLE_ITEMS_PER_PAGE
	);
</script>

<PageTitle title="My Job List" backHref={OYSTER_OPERATOR_URL} />
<div class="mb-6 flex items-center gap-4">
	<SearchBar {onSearchClick} bind:input={searchInput} placeholder="Search" styleClass="w-full" />
	<a href={OYSTER_OPERATOR_HISTORY_URL}>
		<div class="{buttonClasses.outlined} h-12 whitespace-nowrap">ORDER HISTORY</div>
	</a>
</div>
<OysterTableCommon
	{handleSortData}
	tableHeading={OYSTER_MERCHANT_JOB_TABLE_HEADER}
	loading={!$oysterStore.merchantJobsLoaded}
	noDataFound={paginatedData?.length ? false : true}
	emptyTableMessage="No jobs found."
>
	{#if paginatedData?.length}
		{#each paginatedData as rowData, rowIndex (rowData.id)}
			<tr class={cn(tableClasses.row, 'group h-[64px] hover:bg-base-200')}>
				<OysterOperatorJobsTableRow {rowData} {rowIndex} />
			</tr>
		{/each}
	{/if}
</OysterTableCommon>
<Pagination {pageCount} {activePage} {handlePageChange} />
