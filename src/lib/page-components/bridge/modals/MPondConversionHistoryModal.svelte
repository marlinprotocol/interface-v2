<script lang="ts">
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import TxnHashText from '$lib/components/texts/TxnHashText.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { MPOND_CONVERSION_HISTORY_TABLE_HEADER } from '$lib/utils/constants/bridgeConstants';
	import {
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS,
		TABLE_ITEMS_PER_PAGE
	} from '$lib/utils/constants/constants';
	import { cn, doNothing, getTxnUrl } from '$lib/utils/helpers/commonHelper';
	import {
		bigNumberToString,
		epochSecToString,
		mPondToPond
	} from '$lib/utils/helpers/conversionHelper';
	import OysterTableCommon from '../../oyster/inventory/OysterTableCommon.svelte';
	import { tableClasses } from '$lib/atoms/componentClasses';
	import { staticImages } from '$lib/components/images/staticImages';

	export let modalFor: string;
	export let conversions: MPondToPondHistoryDataModel['conversionHistory'];

	let activePage = 1;

	const handlePageChange = (page: number) => {
		activePage = page;
	};

	const handleSortData = () => {
		doNothing();
	};

	// get page array based on inventory and itemsPerPage
	$: pageCount = Math.ceil((conversions?.length ?? 0) / TABLE_ITEMS_PER_PAGE);
	// get paginated data based on activePage
	$: paginatedData = conversions?.slice(
		(activePage - 1) * TABLE_ITEMS_PER_PAGE,
		activePage * TABLE_ITEMS_PER_PAGE
	);
</script>

<Modal {modalFor} isScrollable>
	<svelte:fragment slot="title">Conversion History</svelte:fragment>
	<svelte:fragment slot="content">
		<OysterTableCommon
			{handleSortData}
			tableHeading={MPOND_CONVERSION_HISTORY_TABLE_HEADER}
			noDataFound={paginatedData?.length ? false : true}
			emptyTableMessage="You do not have any conversions."
		>
			{#if paginatedData?.length}
				{#each paginatedData as rowData (rowData.id)}
					<tr class="group h-[64px] hover:bg-base-200">
						<td class={tableClasses.cell}
							><div class="flex items-center gap-2 pl-4">
								{epochSecToString(rowData?.timestamp)}
								<a
									class="shrink-0 cursor-pointer opacity-0 group-hover:opacity-100"
									href={getTxnUrl($chainConfigStore.block_explorer_url, rowData.transactionHash)}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={staticImages.externalLinkIcon} alt="txn link" width="18px" />
								</a>
							</div></td
						>
						<td class={tableClasses.cell}
							>{bigNumberToString(
								mPondToPond(rowData?.mpondToConvert),
								DEFAULT_CURRENCY_DECIMALS,
								POND_PRECISIONS
							)}</td
						>
					</tr>
				{/each}
			{/if}
		</OysterTableCommon>
		<Pagination {pageCount} {activePage} {handlePageChange} />
	</svelte:fragment>
</Modal>
