<script lang="ts">
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
	import Table from '$lib/atoms/v2/table/Table.svelte';
	import TxnIcon from '$lib/components/icons/TxnIcon.svelte';
	import InputCardWithEndButton from '$lib/components/v2/inputs/InputCardWithEndButton.svelte';
	import type { OysterDepositHistoryDataModel } from '$lib/types/oysterComponentType';
	import { OYSTER_PAYMENT_HISTORY_TABLE_HEADER } from '$lib/utils/constants/v2/oysterConstants';
	import { bigNumberToString, epochSecToString } from '$lib/utils/helpers/conversionHelper';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { cn, getTxnUrl } from '$lib/utils/helpers/commonHelper';
	import { staticImages } from '$lib/components/images/staticImages';
	import Button from '$lib/atoms/v2/buttons/Button.svelte';

	export let tableData: OysterDepositHistoryDataModel[] = [];
</script>

<InputCardWithEndButton styleClass="bg-white" title="Transaction History">
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
	<svelte:fragment slot="titleEndButton">
		<Button variant="text" styleClass="text-primary">See more</Button>
	</svelte:fragment>
</InputCardWithEndButton>
