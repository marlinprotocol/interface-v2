<script lang="ts">
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import TableHeadingText from '$lib/components/texts/TableHeadingText.svelte';
	import TxnHashText from '$lib/components/texts/TxnHashText.svelte';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { kMPondConversionHistoryTableHeader } from '$lib/utils/constants/bridgeConstants';
	import { POND_PRECISIONS } from '$lib/utils/constants/constants';
	import { bigNumberToCommaString, epochSecToString, mPondToPond } from '$lib/utils/conversion';
	import { goerliArbiUrl } from '$lib/utils/helpers/commonHelper';

	export let conversions: MPondToPondHistoryDataModel['conversionHistory'];

	export let modalFor: string;
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{'Conversion History'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-row w-full mb-8">
			{#each kMPondConversionHistoryTableHeader as headingData, i}
				<div class="flex-1">
					<TableHeadingText
						heading={headingData}
						tooltipDirection={i === kMPondConversionHistoryTableHeader.length - 1
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
					{bigNumberToCommaString(mPondToPond(rowData?.mpondToConvert), POND_PRECISIONS)}
				</div>
				<div class="flex-1">
					<TxnHashText
						txnHash={rowData.transactionHash}
						txnHashUrl={goerliArbiUrl(rowData.transactionHash)}
					/>
				</div>
			</div>
		{/each}
	</svelte:fragment>
</Modal>
