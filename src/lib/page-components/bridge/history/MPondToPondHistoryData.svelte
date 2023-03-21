<script lang="ts">
	import { getMPondToPondConversionHistory } from '$lib/controllers/subgraphController';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import type { Address, WalletStore } from '$lib/types/storeTypes';
	import { mPondToPondTableHeader } from '$lib/utils/constants/bridgeConstants';
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
		backButton: {
			firstText: 'POND',
			secondText: 'MPond',
			href: '/bridge/pondToMPondHistory'
		},
		title: 'MPond to POND conversion history'
	}}
	{loading}
	{handleSortData}
	noDataFound={!historyData?.length}
	tableHeading={mPondToPondTableHeader}
>
	{#if historyData?.length}
		{#each historyData as rowData, index (rowData)}
			<MPondTableRow
				{rowData}
				handleUpdateData={(updatedRow) => {
					// TODO: check why not working
					historyData = [
						...(historyData ?? []).slice(0, index),
						updatedRow,
						...(historyData ?? []).slice(index + 1)
					];
				}}
			/>
		{/each}
	{/if}
</HistoryTableCommon>
