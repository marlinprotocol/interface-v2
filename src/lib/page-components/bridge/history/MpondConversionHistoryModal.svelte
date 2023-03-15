<script lang="ts">
	import LoadingCircular from '$lib/atoms/loading/LoadingCircular.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Table from '$lib/atoms/table/Table.svelte';
	import TableDataWithButton from '$lib/components/table-cells/TableDataWithButton.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { mpondConversionHistoryTableHeader } from '$lib/utils/constants/bridgeConstants';
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/conversion';
	import { bridgeTxnUrls } from '$lib/utils/helpers/bridgeHelpers';

	export let loading: boolean = false;
	export let conversions: MPondToPondHistoryDataModel['conversionHistory'];

	const modalFor = 'mpond-conversion-history-modal';
</script>

<Modal {modalFor}>
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
					{#each conversions as rowData}
						<tr>
							<TableDataWithButton>
								{epochSecToString(rowData?.timestamp)}
							</TableDataWithButton>
							<TableDataWithButton>
								{bigNumberToCommaString(rowData?.mpondToConvert)}
							</TableDataWithButton>
							<TableDataWithButton>
								<TxnHashText
									txnHash={rowData.transactionHash}
									txnHashUrl={bridgeTxnUrls(rowData.transactionHash)}
								/>
							</TableDataWithButton>
						</tr>
					{/each}
				{/if}
			</tbody>
		</Table>
	</svelte:fragment>
</Modal>
