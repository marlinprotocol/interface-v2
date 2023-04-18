<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import TableConvertButton from '$lib/components/buttons/TableConvertButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TableGridDataCell from '$lib/components/table-cells/TableGridDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { getColorHexByVariant } from '$lib/utils/constants/componentConstants';
	import { pondPrecisions } from '$lib/utils/constants/constants';
	import {
		kHistoryTableColumnsWidth,
		kOysterRateMetaData
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;

	const { symbol } = kOysterRateMetaData;
	$: ({
		provider: { name, address },
		instance,
		region,
		rate,
		live,
		amountPaid,
		amountUsed,
		durationLeft,
		balance,
		endEpochTime
	} = rowData);

	$: statusColor = getColorHexByVariant(getInventoryStatusVariant(status) as CommonVariant);
</script>

<div class="main-row flex gap-1 hover:bg-base-200 px-8 items-center h-16">
	<TableGridDataCell
		width={`${kHistoryTableColumnsWidth('merchant')}`}
		styleClass="flex gap-2 items-center"
	>
		<NameWithAddress {name} {address} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="copy-icon cursor-pointer">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant={'grey'} />
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('instance')}`}>
		{instance}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('region')}`}>
		{region}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('amountPaid')}`}>
		{symbol}{bigNumberToCommaString(amountPaid, pondPrecisions)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('amountUsed')}`}>
		{symbol}{bigNumberToCommaString(amountUsed, pondPrecisions)}
	</TableGridDataCell>
	<!-- <TableGridDataCell width={`${kHistoryTableColumnsWidth('refund')}`}>
		{refund.symbol}{bigNumberToCommaString(refund.amount, pondPrecisions)}
	</TableGridDataCell> -->
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('duration')}`}>
		{durationLeft}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('status')}`}>
		<div
			class="py-1 w-28 text-white rounded mx-auto text-sm"
			style={`background-color:${statusColor}`}
		>
			{status}
		</div>
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('action')}`}>
		<TableConvertButton modalFor={`redploy-${rowIndex}`} text="REDEPLOY" />
	</TableGridDataCell>
</div>

<style>
	.main-row {
		border-bottom: 1px solid #e5e5e5;
	}

	.main-row:last-child {
		border-bottom: none;
	}

	.main-row:hover .copy-icon {
		display: flex;
	}
	.main-row .copy-icon {
		display: none;
	}
</style>
