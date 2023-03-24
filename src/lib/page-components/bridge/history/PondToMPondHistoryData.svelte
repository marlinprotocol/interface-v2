<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import { getPondToMPondConversionHistory } from '$lib/controllers/subgraphController';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { PondToMPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import type { Address, WalletStore } from '$lib/types/storeTypes';
	import { kMPondHistoryPage, kPondToMPondTableHeader } from '$lib/utils/constants/bridgeConstants';
	import { mPondPrecisions, pondPrecisions } from '$lib/utils/constants/constants';
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
		backButton: {
			firstText: 'MPond',
			secondText: 'POND',
			href: kMPondHistoryPage
		},
		title: 'POND to MPond conversion history'
	}}
	{loading}
	{handleSortData}
	noDataFound={!historyData?.length}
	fullWidth={false}
	tableHeading={kPondToMPondTableHeader}
>
	{#if historyData?.length}
		{#each historyData as row}
			<tr>
				<td class={tableCellClasses.row}>{epochSecToString(row.timestamp)}</td>
				<td class={tableCellClasses.row}
					>{bigNumberToCommaString(row.pondConverted, pondPrecisions)}</td
				>
				<td class={tableCellClasses.row}
					>{bigNumberToCommaString(row.mpondReceived, mPondPrecisions)}</td
				>
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
