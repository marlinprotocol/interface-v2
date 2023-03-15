<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import LoadingCircular from '$lib/atoms/loading/LoadingCircular.svelte';
	import Table from '$lib/atoms/table/Table.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import HeaderConnectWallet from '$lib/components/header/sub-components/HeaderConnectWallet.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import { getPondToMPondConversionHistory } from '$lib/controllers/subgraphController';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import type { PondToMPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import type { Address, WalletStore } from '$lib/types/storeTypes';
	import { pondToMpondTableHeader } from '$lib/utils/constants/bridgeConstants';
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/conversion';
	import { bridgeTxnUrls } from '$lib/utils/helpers/bridgeHelpers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import HistoryBackButton from '../sub-components/HistoryBackButton.svelte';

	let address: Address;
	let historyData: PondToMPondHistoryDataModel[] | undefined;
	let loading = true;
	const unsubscribeWalletStore: Unsubscriber = walletStore.subscribe(async (value: WalletStore) => {
		address = value.address;
		loading = true;
		historyData = await getPondToMPondConversionHistory(address);
		historyData = historyData?.sort((a, b) => b.timestamp - a.timestamp);
		loading = false;
	});
	onDestroy(unsubscribeWalletStore);

	// reverse the order of sortedData
	const handleSortData = () => {
		historyData = historyData?.reverse();
	};
</script>

<HistoryBackButton firstText="MPond" secondText="POND" href="/bridge/mPondtoPondHistory" />
<Text variant="h2" text="POND to MPond conversion history" styleClass="mt-3 mb-8" />

<div class={`card sm:max-w-full md:max-w-[66.66%] bg-base-100 rounded-lg px-6 py-4`}>
	{#if !!!$connected}
		<div class={`text-center flex justify-center my-4`}>
			<HeaderConnectWallet />
		</div>
	{:else if loading}
		<div class={'text-center flex justify-center my-4'}>
			<LoadingCircular />
		</div>
	{:else}
		<Table tableHeading={pondToMpondTableHeader} {handleSortData}>
			<tbody slot="tableBody">
				{#if !!!historyData?.length}
					<div class={tableCellClasses.empty}>
						{'No data found!'}
					</div>
				{:else}
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
			</tbody>
		</Table>
	{/if}
</div>
