<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import TxnIcon from '$lib/components/icons/TxnIcon.svelte';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import type { OysterDepositHistoryDataModel } from '$lib/types/oysterComponentType';
	import { OYSTER_PAYMENT_HISTORY_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToString, epochSecToString } from '$lib/utils/helpers/conversionHelper';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { getTxnUrl } from '$lib/utils/helpers/commonHelper';

	export let tableData: OysterDepositHistoryDataModel[] = [];
</script>

<InputCardWithEndButton title="Transaction History">
	<div class="max-h-40 w-full overflow-y-auto overflow-x-hidden">
		<Table
			tableHeading={OYSTER_PAYMENT_HISTORY_TABLE_HEADER}
			headingStyleClass="text-xs"
			iconWidth="13px"
			tablePadding="pt-2 px-0"
		>
			<tbody slot="tableBody">
				{#each tableData as rowData}
					<tr>
						<td class={tableCellClasses.rowNormal}>{epochSecToString(rowData.timestamp)}</td>
						<td class={tableCellClasses.rowNormal}
							>{$oysterTokenMetadataStore.symbol}{bigNumberToString(
								rowData.amount,
								$oysterTokenMetadataStore.decimal
							)}</td
						>
						<td class={tableCellClasses.rowNormal}>
							<div class="flex items-center justify-center gap-2 capitalize">
								{rowData.transactionStatus}
								<TxnIcon
									txnHashUrl={getTxnUrl($chainConfigStore.block_explorer_url, rowData.txHash)}
								/>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</div>
</InputCardWithEndButton>
