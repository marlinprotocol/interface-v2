<script lang="ts">
	import { tableClasses } from '$lib/atoms/componentClasses';
	import type { PondToMPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { POND_TO_MPOND_TABLE_HEADER } from '$lib/utils/constants/bridgeConstants';
	import {
		DEFAULT_CURRENCY_DECIMALS,
		MPOND_PRECISIONS,
		POND_PRECISIONS,
		TABLE_ITEMS_PER_PAGE
	} from '$lib/utils/constants/constants';
	import { bigNumberToString, epochSecToString } from '$lib/utils/helpers/conversionHelper';

	import { ROUTES } from '$lib/utils/constants/urls';
	import HistoryTableCommon from './HistoryTableCommon.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import { cn, getTxnUrl } from '$lib/utils/helpers/commonHelper';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { staticImages } from '$lib/components/images/staticImages';

	export let historyData: PondToMPondHistoryDataModel[] | undefined;
	export let loading = true;
	let activePage = 1;
	// reverse the order of sortedData
	const handleSortData = (id: string) => {
		historyData = historyData?.reverse();
	};

	// get page array based on inventory and itemsPerPage
	$: pageCount = Math.ceil((historyData?.length ?? 0) / TABLE_ITEMS_PER_PAGE);
	// get paginated data based on activePage
	$: paginatedData = historyData?.slice(
		(activePage - 1) * TABLE_ITEMS_PER_PAGE,
		activePage * TABLE_ITEMS_PER_PAGE
	);
	const handlePageChange = (page: number) => {
		activePage = page;
	};
</script>

<div class="mx-[28px] flex flex-1 flex-col">
	<HistoryTableCommon
		tableTitle={{
			backButton: {
				firstText: 'MPond',
				secondText: 'Pond',
				href: ROUTES.BRIDGE_URL
			},
			title: 'POND to MPond conversion history'
		}}
		type="pond-to-mpond"
		{loading}
		{handleSortData}
		noDataFound={!paginatedData?.length}
		fullWidth={true}
		tableHeading={POND_TO_MPOND_TABLE_HEADER}
	>
		{#if paginatedData?.length}
			{#each paginatedData as row}
				<tr class={cn(tableClasses.row, 'group h-16 hover:bg-base-200')}>
					<td class={tableClasses.cell}
						><div class="flex items-center gap-2 pl-4">
							{epochSecToString(row.timestamp)}<a
								class="shrink-0 opacity-0 group-hover:opacity-100"
								href={getTxnUrl($chainConfigStore.block_explorer_url, row.transactionHash)}
								target="_blank"
								rel="noopener noreferrer"
							>
								<img src={staticImages.externalLinkIcon} alt="txn link" width="18px" />
							</a>
						</div></td
					>
					<td class={tableClasses.cell}
						>{bigNumberToString(row.pondConverted, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)}</td
					>
					<td class={tableClasses.cell}
						>{bigNumberToString(row.mpondReceived, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)}</td
					>
				</tr>
			{/each}
		{/if}
	</HistoryTableCommon>
	<Pagination {pageCount} {activePage} {handlePageChange} />
</div>
