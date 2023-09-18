<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import TableConvertButton from '$lib/components/buttons/TableConvertButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TableGridDataCell from '$lib/components/table-cells/TableGridDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { bigNumberToString, epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';
	import CreateOrderModal from '$lib/page-components/oyster/inventory/modals/CreateOrderModal.svelte';
	import PastJobDetailsModal from '$lib/page-components/oyster/inventory/modals/PastJobDetailsModal.svelte';
	import { getColorHexByVariant } from '$lib/utils/helpers/componentHelper';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;

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
	<TableGridDataCell styleClass="flex gap-2 items-center">
		<NameWithAddress {name} {address} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="copy-icon cursor-pointer">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant={'grey'} />
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</TableGridDataCell>
	<TableGridDataCell>
		{instance ?? 'N/A'}
	</TableGridDataCell>
	<TableGridDataCell>
		{region ?? 'N/A'}
	</TableGridDataCell>
	<TableGridDataCell>
		{$oysterTokenMetadataStore.symbol}{bigNumberToString(
			totalDeposit,
			$oysterTokenMetadataStore.decimal
		)}
	</TableGridDataCell>
	<TableGridDataCell>
		{$oysterTokenMetadataStore.symbol}{bigNumberToString(
			amountUsed,
			$oysterTokenMetadataStore.decimal
		)}
	</TableGridDataCell>
	<TableGridDataCell>
		{$oysterTokenMetadataStore.symbol}{bigNumberToString(refund, $oysterTokenMetadataStore.decimal)}
	</TableGridDataCell>
	<TableGridDataCell>
		<Tooltip tooltipText={epochToDurationString(endEpochTime - createdAt)}>
			{epochToDurationString(endEpochTime - createdAt, true)}
		</Tooltip>
	</TableGridDataCell>
	<TableGridDataCell>
		<div
			class="py-1 w-24 text-white rounded mx-auto text-sm capitalize"
			style={`background-color:${statusColor}`}
		>
			{status}
		</div>
	</TableGridDataCell>
	<TableGridDataCell>
		<TableConvertButton
			modalFor={`job-history-details-${rowIndex}`}
			text="DETAILS"
			styleClass="w-full"
		/>
	</TableGridDataCell>
</div>
<PastJobDetailsModal modalFor={`job-history-details-${rowIndex}`} jobData={rowData} {rowIndex} />
<CreateOrderModal modalFor={`create-order-modal-${rowIndex}`} preFilledData={rowData} />

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
