<script lang="ts">
	import LoadingCircular from '$lib/atoms/loading/LoadingCircular.svelte';
	import Dialog from '$lib/atoms/modals/Dialog.svelte';
	import Table from '$lib/atoms/table/Table.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { mpondConversionHistoryTableHeader } from '$lib/utils/constants/bridgeConstants';
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/conversion';
	import { bridgeTxnUrls } from '$lib/utils/helpers/bridgeHelpers';

	export let loading: boolean = false;
	export let conversions: MPondToPondHistoryDataModel['conversionHistory'];

	export let showModal: boolean = false;
</script>

<Dialog bind:showModal>
	<svelte:fragment slot="title">
		{'Conversion History'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<Table tableHeading={mpondConversionHistoryTableHeader}>
			<tbody slot="tableBody">
				{#if loading}
					<div class={'w-full text-center flex justify-center'}>
						<LoadingCircular />
					</div>
				{:else}
					{#each conversions as rowData, i}
						{epochSecToString(rowData?.timestamp)}
						{bigNumberToCommaString(rowData?.mpondToConvert)}
						<TxnHashText
							txnHash={rowData.transactionHash}
							txnHashUrl={bridgeTxnUrls(rowData.transactionHash)}
						/>
					{/each}
				{/if}
			</tbody>
		</Table>
	</svelte:fragment>
</Dialog>
