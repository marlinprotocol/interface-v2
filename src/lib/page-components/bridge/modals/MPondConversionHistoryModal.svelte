<script lang="ts">
	import Dialog from '$lib/atoms/modals/Dialog.svelte';
	import TableHeadingText from '$lib/components/texts/TableHeadingText.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { bigNumberToCommaString, epochSecToString, mPondToPond } from '$lib/utils/conversion';
	import { bridgeTxnUrls } from '$lib/utils/helpers/bridgeHelpers';

	export let conversions: MPondToPondHistoryDataModel['conversionHistory'];

	export let showConversionHistoryDialog: boolean = false;

	const heading = [
		{
			title: 'DATE'
		},
		{
			title: 'CONVERTED',
			tooltipText: 'The amount of POND converted.'
		},
		{
			title: 'TX HASH',
			tooltipText: 'The transaction hash of the conversion.'
		}
	];
</script>

<Dialog bind:showDialog={showConversionHistoryDialog}>
	<svelte:fragment slot="title">
		{'Conversion History'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-row w-full">
			{#each heading as headingData, i}
				<div class="flex-1">
					<TableHeadingText
						styleClass="mb-8"
						title={headingData.title}
						tooltipText={headingData.tooltipText}
						tooltipDirection={i === heading.length - 1
							? 'tooltip-left'
							: i === 0
							? 'tooltip-right'
							: 'tooltip-bottom'}
					/>
				</div>
			{/each}
		</div>
		{#each conversions as rowData}
			<div class="flex flex-row gap-4 items-center justify-center mb-6">
				<div class="flex-1">
					{epochSecToString(rowData?.timestamp)}
				</div>
				<div class="flex-1">
					{bigNumberToCommaString(mPondToPond(rowData?.mpondToConvert))}
				</div>
				<div class="flex-1">
					<TxnHashText
						txnHash={rowData.transactionHash}
						txnHashUrl={bridgeTxnUrls(rowData.transactionHash)}
					/>
				</div>
			</div>
		{/each}
	</svelte:fragment>
</Dialog>
