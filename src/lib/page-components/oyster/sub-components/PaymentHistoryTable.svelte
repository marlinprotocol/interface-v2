<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import TxnIcon from '$lib/components/icons/TxnIcon.svelte';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import type { OysterDepositHistoryDataModel } from '$lib/types/oysterComponentType';
	import {
		OYSTER_PAYMENT_HISTORY_TABLE_HEADER,
		OYSTER_RATE_METADATA
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToString, epochSecToString } from '$lib/utils/helpers/conversionHelper';
	import { goerliArbiUrl } from '$lib/utils/helpers/commonHelper';

	export let tableData: OysterDepositHistoryDataModel[] = [];

	const { symbol, decimal } = OYSTER_RATE_METADATA;
	const styles = {
		docButton: 'text-primary font-medium',
		tableCell: tableCellClasses.rowNormal
	};
</script>

<InputCardWithEndButton title={'Transaction History'}>
	<div class="w-full max-h-40 overflow-y-auto overflow-x-hidden">
		<Table
			tableHeading={OYSTER_PAYMENT_HISTORY_TABLE_HEADER}
			headingStyleClass={'text-xs'}
			iconWidth={'13px'}
			tablePadding={'pt-2 px-0'}
		>
			<tbody slot="tableBody">
				{#each tableData as rowData}
					<tr>
						<td class={styles.tableCell}>{epochSecToString(rowData.timestamp)}</td>
						<td class={styles.tableCell}>{symbol}{bigNumberToString(rowData.amount, decimal)}</td>
						<td class={styles.tableCell}>
							<div class="flex justify-center items-center gap-2 capitalize">
								{rowData.transactionStatus}
								<TxnIcon txnHashUrl={goerliArbiUrl(rowData.txHash)} />
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</div>
</InputCardWithEndButton>
