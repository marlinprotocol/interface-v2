<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { bigNumberToString, epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';
	import CreateOrderModal from '$lib/page-components/oyster/v2/inventory/modals/CreateOrderModal.svelte';
	import PastJobDetailsModal from '$lib/page-components/oyster/v2/inventory/modals/PastJobDetailsModal.svelte';
	import { getColorHexByVariant } from '$lib/utils/helpers/componentHelper';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { tableClasses } from '$lib/atoms/v2/componentClasses';

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
		endEpochTime,
		isCreditJob
	} = rowData);
	$: statusColor = getColorHexByVariant(getInventoryStatusVariant(status) as CommonVariant);
</script>

<tr class="main-row hover:bg-base-200">
	<td class={tableClasses.cell}>
		<NameWithAddress {name} {address} {rowIndex} {isCreditJob}>
			<svelte:fragment slot="copyIcon">
				<div class="hidden cursor-pointer group-hover:flex">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant="grey" />
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</td>
	<td class={tableClasses.cell}>
		{instance ?? 'N/A'}
	</td>
	<td class={tableClasses.cell}>
		{region ?? 'N/A'}
	</td>
	<td class={tableClasses.cell}>
		{$oysterTokenMetadataStore.symbol}{bigNumberToString(
			totalDeposit,
			$oysterTokenMetadataStore.decimal
		)}
	</td>
	<td class={tableClasses.cell}>
		{$oysterTokenMetadataStore.symbol}{bigNumberToString(
			amountUsed,
			$oysterTokenMetadataStore.decimal
		)}
	</td>
	<td class={tableClasses.cell}>
		{$oysterTokenMetadataStore.symbol}{bigNumberToString(refund, $oysterTokenMetadataStore.decimal)}
	</td>
	<td class={tableClasses.cell}>
		<Tooltip tooltipText={epochToDurationString(endEpochTime - createdAt)}>
			{epochToDurationString(endEpochTime - createdAt, true)}
		</Tooltip>
	</td>
	<td class={tableClasses.cell}>
		<div
			class="mx-auto w-24 rounded py-1 text-sm capitalize text-white"
			style="background-color: {statusColor}"
		>
			{status}
		</div>
	</td>
	<td class={tableClasses.cell}>
		<ModalButton
			variant="tableConvertButton"
			styleClass="w-fit ml-4 mr-6"
			modalFor="job-history-details-{rowIndex}">DETAILS</ModalButton
		>
	</td>
</tr>
<PastJobDetailsModal modalFor="job-history-details-{rowIndex}" jobData={rowData} {rowIndex} />
<CreateOrderModal modalFor="create-order-modal-{rowIndex}" preFilledData={rowData} />
