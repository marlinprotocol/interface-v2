<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import TxnIcon from '$lib/components/icons/TxnIcon.svelte';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import type {
		OysterDepositHistoryDataModel,
		OysterSettlementHistoryDataModel
	} from '$lib/types/oysterComponentType';
	import { kOysterPaymentHistoryTableHeader } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/conversion';
	import { goerliArbiUrl } from '$lib/utils/helpers/commonHelper';

	const styles = {
		docButton: 'text-primary font-medium',
		tableCell: tableCellClasses.rowNormal
	};

	export let tableData: OysterDepositHistoryDataModel[] = [];
</script>

<InputCardWithEndButton title={'Transaction History'}>
	<div class="w-full max-h-40 overflow-y-auto overflow-x-hidden">
		<Table
			tableHeading={kOysterPaymentHistoryTableHeader}
			headingStyleClass={'text-xs'}
			iconWidth={13}
			styleClass={'py-0'}
		>
			<tbody slot="tableBody">
				{#each tableData as rowData}
					<tr>
						<td class={styles.tableCell}>{epochSecToString(rowData.timestamp)}</td>
						<td class={styles.tableCell}>{bigNumberToCommaString(rowData.amount)}</td>
						<td class={styles.tableCell}>
							<div class="flex justify-center items-center gap-2">
								{rowData.isWithdrawal ? 'Withdrawal' : 'Deposit'}
								<TxnIcon txnHashUrl={goerliArbiUrl(rowData.id)} />
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</div>
</InputCardWithEndButton>
