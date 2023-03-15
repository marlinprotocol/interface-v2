<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import LoadingCircular from '$lib/atoms/loading/LoadingCircular.svelte';
	import Table from '$lib/atoms/table/Table.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { getMPondToPondConversionHistory } from '$lib/controllers/subgraphController';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import type { Address, WalletStore } from '$lib/types/storeTypes';
	import { mpondToPondTableHeader } from '$lib/utils/constants/bridgeConstants';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import HistoryBackButton from '../sub-components/HistoryBackButton.svelte';
	import MPondTableRow from './MPondTableRow.svelte';

	let address: Address;
	let historyData: MPondToPondHistoryDataModel[] | undefined;
	let loading = true;
	const unsubscribeWalletStore: Unsubscriber = walletStore.subscribe(async (value: WalletStore) => {
		address = value.address;
		historyData = await getMPondToPondConversionHistory(address);
		historyData = historyData?.sort((a, b) => b.timestamp - a.timestamp);
		loading = false;
	});
	onDestroy(unsubscribeWalletStore);

	// reverse the order of sortedData
	const handleSortData = () => {
		historyData = historyData?.reverse();
	};
</script>

<HistoryBackButton firstText="POND" secondText="MPond" href="/bridge/pondToMpondHistory" />
<Text variant="h2" text="MPond to POND conversion history" styleClass="mt-3 mb-8" />
<Table tableHeading={mpondToPondTableHeader} {handleSortData}>
	<tbody slot="tableBody">
		{#if loading}
			<div class={'w-full text-center flex justify-center'}>
				<LoadingCircular />
			</div>
		{:else if !!!historyData?.length}
			<div class={tableCellClasses.empty}>
				{'No conversion history yet. Convert MPond to POND to see your conversion history here.'}
			</div>
		{:else}
			{#each historyData as rowData, i}
				<MPondTableRow {rowData} index={i} />
			{/each}
		{/if}
	</tbody>
</Table>
