<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import TableConvertButton from '$lib/components/buttons/TableConvertButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TableGridDataCell from '$lib/components/table-cells/TableGridDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { getColorHexByVariant } from '$lib/utils/constants/componentConstants';
	import { oysterAmountPrecision } from '$lib/utils/constants/constants';
	import {
		kHistoryTableColumnsWidth,
		kOysterRateMetaData
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString, epochToDurationString } from '$lib/utils/conversion';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';
	import PastJobDetailsModal from '../inventory/modals/PastJobDetailsModal.svelte';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;

	const { symbol } = kOysterRateMetaData;
	$: ({
		provider: { name, address },
		instance,
		region,
		status,
		totalDeposit,
		amountUsed,
		refund,
		createdAt,
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
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('totalDeposit')}`}>
		{symbol}{bigNumberToCommaString(totalDeposit, oysterAmountPrecision)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('amountUsed')}`}>
		{symbol}{bigNumberToCommaString(amountUsed, oysterAmountPrecision)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('refund')}`}>
		{symbol}{bigNumberToCommaString(refund, oysterAmountPrecision)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('duration')}`}>
		<Tooltip tooltipText={epochToDurationString(endEpochTime - createdAt)}>
			{epochToDurationString(endEpochTime - createdAt, true)}
		</Tooltip>
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('status')}`}>
		<div
			class="py-1 w-24 text-white rounded mx-auto text-sm capitalize"
			style={`background-color:${statusColor}`}
		>
			{status}
		</div>
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('action')}`}>
		<TableConvertButton modalFor={`job-history-details-${rowIndex}`} text="DETAILS" />
	</TableGridDataCell>
</div>
<PastJobDetailsModal modalFor={`job-history-details-${rowIndex}`} jobData={rowData} />

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
