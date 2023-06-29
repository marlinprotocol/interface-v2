<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import TxnHashText from '$lib/components/texts/TxnHashText.svelte';
	import { getPondToMPondConversionHistoryFromSubgraph } from '$lib/controllers/subgraphController';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { PondToMPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import type { Address, WalletStore } from '$lib/types/storeTypes';
	import { POND_TO_MPOND_TABLE_HEADER } from '$lib/utils/constants/bridgeConstants';
	import { MPOND_PRECISIONS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/helpers/conversionHelper';
	import { goerliArbiUrl } from '$lib/utils/helpers/commonHelper';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import HistoryTableCommon from '$lib/page-components/bridge/history/HistoryTableCommon.svelte';
	import { MPOND_HISTORY_PAGE_URL } from '$lib/utils/constants/urls';
	import { modifyPondToMpondConversionHistory } from '$lib/utils/data-modifiers/subgraphModifier';

	let address: Address;
	let historyData: PondToMPondHistoryDataModel[] | undefined;
	let loading = true;
	const unsubscribeWalletStore: Unsubscriber = walletStore.subscribe(async (value: WalletStore) => {
		address = value.address;
		if (address) {
			loading = true;
			const historyDataFromSubgraph = await getPondToMPondConversionHistoryFromSubgraph(address);
			historyData = modifyPondToMpondConversionHistory(historyDataFromSubgraph);
			loading = false;
		}
	});
	onDestroy(unsubscribeWalletStore);

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
					>{bigNumberToCommaString(row.pondConverted, POND_PRECISIONS)}</td
				>
				<td class={tableCellClasses.row}
					>{bigNumberToCommaString(row.mpondReceived, MPOND_PRECISIONS)}</td
				>
				<td class={tableCellClasses.row}>
					<TxnHashText
						txnHash={row.transactionHash}
						txnHashUrl={goerliArbiUrl(row.transactionHash)}
					/>
				</td>
			</tr>
		{/each}
	{/if}
</HistoryTableCommon>
