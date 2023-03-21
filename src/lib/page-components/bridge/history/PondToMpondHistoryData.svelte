<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import { getPondToMPondConversionHistory } from '$lib/controllers/subgraphController';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { PondToMPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import type { Address, WalletStore } from '$lib/types/storeTypes';
	import { pondToMpondTableHeader } from '$lib/utils/constants/bridgeConstants';
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/conversion';
	import { bridgeTxnUrls } from '$lib/utils/helpers/bridgeHelpers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import HistoryTableCommon from './HistoryTableCommon.svelte';

	let address: Address;
	let historyData: PondToMPondHistoryDataModel[] | undefined;
	let loading = true;
	const unsubscribeWalletStore: Unsubscriber = walletStore.subscribe(async (value: WalletStore) => {
		address = value.address;
		if (address) {
			loading = true;
			historyData = await getPondToMPondConversionHistory(address);
			historyData = historyData?.sort((a, b) => b.timestamp - a.timestamp);
			loading = false;
		}
	});
	onDestroy(unsubscribeWalletStore);

	// reverse the order of sortedData
	const handleSortData = () => {
		historyData = historyData?.reverse();
	};
</script>

<HistoryTableCommon
	tableTitle={{
		firstText: 'MPond',
		secondText: 'POND',
		title: 'POND to MPond conversion history',
		href: '/bridge/mPondtoPondHistory'
	}}
	{loading}
	{handleSortData}
	noDataFound={!historyData?.length}
	fullWidth={false}
	tableHeading={pondToMpondTableHeader}
>
	{#if historyData?.length}
		{#each historyData as row}
			<tr>
				<td class={tableCellClasses.row}>{epochSecToString(row.timestamp)}</td>
				<td class={tableCellClasses.row}>{bigNumberToCommaString(row.pondConverted)}</td>
				<td class={tableCellClasses.row}>{bigNumberToCommaString(row.mpondReceived, 8)}</td>
				<td class={tableCellClasses.row}>
					<TxnHashText
						txnHash={row.transactionHash}
						txnHashUrl={bridgeTxnUrls(row.transactionHash)}
					/>
				</td>
			</tr>
		{/each}
	{/if}
</HistoryTableCommon>
