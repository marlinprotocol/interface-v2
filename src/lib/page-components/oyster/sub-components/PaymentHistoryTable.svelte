<script lang="ts">
	import { tableClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import type { OysterDepositHistoryDataModel } from '$lib/types/oysterComponentType';
	import { OYSTER_PAYMENT_HISTORY_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToString, epochSecToString } from '$lib/utils/helpers/conversionHelper';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { cn, getTxnUrl } from '$lib/utils/helpers/commonHelper';
	import { staticImages } from '$lib/components/images/staticImages';
	import Button from '$lib/atoms/buttons/Button.svelte';

	export let tableData: OysterDepositHistoryDataModel[] = [];
</script>

<div>
	<div class="flex items-center justify-between">
		<span class="text-base">Transaction History</span>
		<Button variant="text" styleClass="text-primary text-base font-medium h-fit">See more</Button>
	</div>
	<div class="max-h-40 w-full overflow-y-auto overflow-x-hidden">
		<Table
			tableHeading={OYSTER_PAYMENT_HISTORY_TABLE_HEADER}
			headingStyleClass="text-xs"
			iconWidth="13px"
		>
			<tbody slot="tableBody">
				{#each tableData as rowData}
					<tr class={cn(tableClasses.row, 'h-16 hover:bg-base-200')}>
						<td class={cn(tableClasses.cell, 'pl-4')}>
							<div class="flex items-center gap-2">
								{epochSecToString(rowData.timestamp)}
								<a
									class="shrink-0"
									href={getTxnUrl($chainConfigStore.block_explorer_url, rowData.txHash)}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={staticImages.externalLinkIcon} alt="txn link" width="18px" />
								</a>
							</div>
						</td>
						<td class={tableClasses.cell}
							>{$oysterTokenMetadataStore.symbol}{bigNumberToString(
								rowData.amount,
								$oysterTokenMetadataStore.decimal
							)}
						</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</div>
</div>
