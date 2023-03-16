<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import LoadingCircular from '$lib/atoms/loading/LoadingCircular.svelte';
	import Table from '$lib/atoms/table/Table.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import HeaderConnectWallet from '$lib/components/header/sub-components/HeaderConnectWallet.svelte';
	import { getMPondToPondConversionHistory } from '$lib/controllers/subgraphController';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
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
		loading = true;
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

<div class={`card max-w-full bg-base-100 rounded-lg px-6 py-4`}>
	{#if !!!$connected}
		<div class={`text-center flex justify-center my-4`}>
			<HeaderConnectWallet />
		</div>
	{:else if loading}
		<div class={'text-center flex justify-center my-4'}>
			<LoadingCircular />
		</div>
	{:else}
		<Table tableHeading={mpondToPondTableHeader} {handleSortData}>
			<tbody slot="tableBody">
				{#if !!!historyData?.length}
					<div class={tableCellClasses.empty}>
						{'No conversion history yet. Convert MPond to POND to see your conversion history here.'}
					</div>
				{:else}
					{#each historyData as rowData, index (rowData)}
						<MPondTableRow
							{rowData}
							{index}
							handleUpdateData={(updatedRow) => {
								historyData = [
									...(historyData ?? []).slice(0, index),
									updatedRow,
									...(historyData ?? []).slice(index + 1)
								];
							}}
						/>
					{/each}
				{/if}
			</tbody>
		</Table>
	{/if}
</div>
