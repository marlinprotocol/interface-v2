<script lang="ts">
	import { getMPondToPondConversionHistory } from '$lib/controllers/subgraphController';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import type { Address, WalletStore } from '$lib/types/storeTypes';
	import { kPondHistoryPage, kMPondToPondTableHeader } from '$lib/utils/constants/bridgeConstants';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import HistoryTableCommon from './HistoryTableCommon.svelte';
	import MPondTableRow from './MPondTableRow.svelte';

	let address: Address;
	let historyData: MPondToPondHistoryDataModel[] | undefined;
	let loading = true;
	const unsubscribeWalletStore: Unsubscriber = walletStore.subscribe(async (value: WalletStore) => {
		address = value.address;
		if (address) {
			loading = true;
			historyData = await getMPondToPondConversionHistory(address);
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
			firstText: 'POND',
			secondText: 'MPond',
			href: kPondHistoryPage
		},
		title: 'MPond to POND conversion history'
	}}
	{loading}
	{handleSortData}
	noDataFound={!historyData?.length}
	tableHeading={kMPondToPondTableHeader}
>
	{#if historyData?.length}
		{#each historyData as rowData, rowIndex}
			<MPondTableRow {rowData} {rowIndex} />
		{/each}
	{/if}
</HistoryTableCommon>
