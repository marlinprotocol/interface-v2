<script lang="ts">
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import TableHeadingText from '$lib/components/texts/TableHeadingText.svelte';
	import TxnHashText from '$lib/components/texts/TxnHashText.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { MPOND_CONVERSION_HISTORY_TABLE_HEADER } from '$lib/utils/constants/bridgeConstants';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import { getTxnUrl } from '$lib/utils/helpers/commonHelper';
	import {
		bigNumberToString,
		epochSecToString,
		mPondToPond
	} from '$lib/utils/helpers/conversionHelper';

	export let modalFor: string;
	export let conversions: MPondToPondHistoryDataModel['conversionHistory'];
</script>

<Modal {modalFor} isScrollable>
	<svelte:fragment slot="title">
		{'Conversion History'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-row w-full mb-8">
			{#each MPOND_CONVERSION_HISTORY_TABLE_HEADER as headingData, i}
				<div class="flex-1">
					<TableHeadingText
						heading={headingData}
						tooltipDirection={i === MPOND_CONVERSION_HISTORY_TABLE_HEADER.length - 1
							? 'tooltip-left'
							: i === 0
							? 'tooltip-right'
							: 'tooltip-bottom'}
					/>
				</div>
			{/each}
		</div>
		{#each conversions as rowData}
			<div class="flex flex-row gap-4 items-center justify-center mb-6 font-semibold">
				<div class="flex-1">
					{epochSecToString(rowData?.timestamp)}
				</div>
				<div class="flex-1">
					{bigNumberToString(
						mPondToPond(rowData?.mpondToConvert),
						DEFAULT_CURRENCY_DECIMALS,
						POND_PRECISIONS
					)}
				</div>
				<div class="flex-1">
					<TxnHashText
						txnHash={rowData.transactionHash}
						txnHashUrl={getTxnUrl($chainConfigStore.block_explorer_url, rowData.transactionHash)}
					/>
				</div>
			</div>
		{/each}
	</svelte:fragment>
</Modal>
