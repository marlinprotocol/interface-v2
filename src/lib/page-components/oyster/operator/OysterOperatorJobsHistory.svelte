<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type {
		OysterInventoryDataModel,
		OysterOperatorInventorySortKeys
	} from '$lib/types/oysterComponentType';
	import { OYSTER_OPERATOR_HISTORY_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import {
		getSearchedOysterJobsData,
		sortOysterOperatorHistory
	} from '$lib/utils/helpers/oysterHelpers';
	import OysterTableCommon from '$lib/page-components/oyster/inventory/OysterTableCommon.svelte';
	import OysterOperatorJobsHistoryTableRow from '$lib/page-components/oyster/operator/OysterOperatorJobsHistoryTableRow.svelte';
	import { TABLE_ITEMS_PER_PAGE } from '$lib/utils/constants/constants';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import { tableClasses } from '$lib/atoms/componentClasses';
	import EmptyCard from '$lib/components/empty-state/EmptyCard.svelte';
	import { staticImages } from '$lib/components/images/staticImages';

	let searchInput = '';
	let activePage = 1;
	let operatorHistoryData: OysterInventoryDataModel[] | undefined;
	let sortingMap: Record<string, 'asc' | 'desc'> = {};

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const handleSortData = (id: string) => {
		if (sortingMap[id]) {
			sortingMap[id] = sortingMap[id] === 'asc' ? 'desc' : 'asc';
		} else {
			sortingMap[id] = 'asc';
		}
		operatorHistoryData = sortOysterOperatorHistory(
			operatorHistoryData,
			id as OysterOperatorInventorySortKeys,
			sortingMap[id]
		);
	};

	$: operatorHistoryData = $oysterStore.merchantJobsData?.filter(
		(data) => data.status === 'stopped'
	);
	// get searched data based on searchInput
	$: searchedData = getSearchedOysterJobsData(searchInput, operatorHistoryData);
	// get page array based on inventory and itemsPerPage
	$: pageCount = Math.ceil((searchedData?.length ?? 0) / TABLE_ITEMS_PER_PAGE);
	// get paginated data based on activePage
	$: paginatedData = searchedData?.slice(
		(activePage - 1) * TABLE_ITEMS_PER_PAGE,
		activePage * TABLE_ITEMS_PER_PAGE
	);
</script>

<OysterTableCommon
	{handleSortData}
	flexibleHeight
	roundedBorders={false}
	loading={!$oysterStore.merchantJobsLoaded}
	tableHeading={OYSTER_OPERATOR_HISTORY_TABLE_HEADER}
	noDataFound={paginatedData?.length ? false : true}
>
	{#if paginatedData?.length}
		{#each paginatedData as rowData (rowData.id)}
			<tr class={cn(tableClasses.row, 'group/row h-16 hover:bg-base-200')}>
				<OysterOperatorJobsHistoryTableRow {rowData} />
			</tr>
		{/each}
	{/if}
	<EmptyCard
		slot="emptyState"
		description={$oysterStore.providerData.registered
			? 'There isn’t any history to be displayed.'
			: 'You aren’t providing infra on Oyster. Join the network.'}
		imageSrc={staticImages.fishingMan}
		imageAlt="Fishing Man"
	></EmptyCard>
</OysterTableCommon>
<Pagination {pageCount} {activePage} {handlePageChange} />
