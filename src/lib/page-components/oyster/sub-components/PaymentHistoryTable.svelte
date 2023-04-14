<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import type { OysterSettlementHistoryDataModel } from '$lib/types/oysterComponentType';
	import { kOysterPaymentHistoryTableHeader } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/conversion';
	import { goerliArbiUrl } from '$lib/utils/helpers/commonHelper';

	const styles = {
		docButton: 'text-primary font-medium',
		tableCell: tableCellClasses.rowNormal
	};

	export let tableData: OysterSettlementHistoryDataModel[] = [];
</script>

<InputCardWithEndButton title={'Payment History'}>
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
						<td class={styles.tableCell}>{epochSecToString(rowData.ts)}</td>
						<td class={styles.tableCell}>{bigNumberToCommaString(rowData.amount)}</td>
						<td class={styles.tableCell}>
							<TxnHashText txnHash={rowData.id} txnHashUrl={goerliArbiUrl(rowData.id)} />
						</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</div>
</InputCardWithEndButton>
