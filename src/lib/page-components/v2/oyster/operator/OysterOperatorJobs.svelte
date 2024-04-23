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
	import { ROUTES } from '$lib/utils/constants/v2/urls';
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
	const cmnBtnClass = 'w-48 h-14 text-base';
</script>

<PageTitle title="My Job List" backHref={ROUTES.OYSTER_OPERATOR_URL} />
<div class="mb-6 gap-4 rounded-3xl bg-white px-8 py-6">
	<p class="mb-3 text-base">Control Plane:</p>
	<SearchBar
		{onSearchClick}
		bind:input={searchInput}
		placeholder="Search"
		styleClass="w-full bg-[#F4F4F6]"
	>
		<svelte:fragment slot="buttons">
			<div
				class=" flex w-fit justify-between rounded-[100px] bg-white p-4 px-5 text-base font-normal"
			>
				<p class="border-r pr-3">Instances: 200</p>
				<p class="pl-3">Regions: 30</p>
			</div>
		</svelte:fragment>
	</SearchBar>
	<div class="mt-3 flex items-center gap-3">
		<a href={ROUTES.OYSTER_OPERATOR_HISTORY_URL}>
			<div class={cn(buttonClasses.filled, cmnBtnClass)}>Update</div>
		</a>
		<a href={ROUTES.OYSTER_OPERATOR_HISTORY_URL}>
			<div class={cn(buttonClasses.whiteFilled, cmnBtnClass)}>Unregister</div>
		</a>
	</div>
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
