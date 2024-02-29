<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import TxnHashText from '$lib/components/texts/TxnHashText.svelte';
	import type { PondToMPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { POND_TO_MPOND_TABLE_HEADER } from '$lib/utils/constants/bridgeConstants';
	import {
		DEFAULT_CURRENCY_DECIMALS,
		MPOND_PRECISIONS,
		POND_PRECISIONS
	} from '$lib/utils/constants/constants';
	import { bigNumberToString, epochSecToString } from '$lib/utils/helpers/conversionHelper';
	import HistoryTableCommon from '$lib/page-components/bridge/history/HistoryTableCommon.svelte';
	import { MPOND_HISTORY_PAGE_URL } from '$lib/utils/constants/urls';
	import { getTxnUrl } from '$lib/utils/helpers/commonHelper';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';

	export let historyData: PondToMPondHistoryDataModel[] | undefined;
	export let loading = true;

	// reverse the order of sortedData
	const handleSortData = (id: string) => {
		historyData = historyData?.reverse();
	};
</script>

<HistoryTableCommon
	tableTitle={{
		backButton: {
			firstText: 'MPond',
			secondText: 'POND',
			href: MPOND_HISTORY_PAGE_URL
		},
		title: 'POND to MPond conversion history'
	}}
	{loading}
	{handleSortData}
	noDataFound={!historyData?.length}
	fullWidth={false}
	tableHeading={POND_TO_MPOND_TABLE_HEADER}
>
	{#if historyData?.length}
		{#each historyData as row}
			<tr>
				<td class={tableCellClasses.row}>{epochSecToString(row.timestamp)}</td>
				<td class={tableCellClasses.row}
					>{bigNumberToString(row.pondConverted, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)}</td
				>
				<td class={tableCellClasses.row}
					>{bigNumberToString(row.mpondReceived, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)}</td
				>
				<td class={tableCellClasses.row}>
					<TxnHashText
						txnHash={row.transactionHash}
						txnHashUrl={getTxnUrl($chainConfigStore.block_explorer_url, row.transactionHash)}
					/>
				</td>
			</tr>
		{/each}
	{/if}
</HistoryTableCommon>
