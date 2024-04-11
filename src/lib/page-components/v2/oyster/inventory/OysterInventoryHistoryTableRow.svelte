<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/v2/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { bigNumberToString, epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import { getInventoryStatusVariant } from '$lib/utils/v2/helpers/oysterHelpers';
	import { getColorHexByVariant } from '$lib/utils/v2/helpers/componentHelper';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { tableCellClasses } from '$lib/atoms/v2/componentClasses';
	import PastJobDetailsModal from './modals/PastJobDetailsModal.svelte';
	import CreateOrderModal from './modals/CreateOrderModal.svelte';

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

<tr class="main-row h-[64px] hover:bg-base-200">
	<td class={tableCellClasses.rowNormal}>
		<NameWithAddress {address} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="copy-icon cursor-pointer">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant="grey" />
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</td>

	<td class={tableCellClasses.rowNormal}>
		{$oysterTokenMetadataStore.symbol}{bigNumberToString(
			amountUsed,
			$oysterTokenMetadataStore.decimal
		)}
	</td>
	<td class={tableCellClasses.rowNormal}>
		{$oysterTokenMetadataStore.symbol}{bigNumberToString(refund, $oysterTokenMetadataStore.decimal)}
	</td>
	<td class={tableCellClasses.rowNormal}>
		<Tooltip tooltipText={epochToDurationString(endEpochTime - createdAt)}>
			{epochToDurationString(endEpochTime - createdAt, true)}
		</Tooltip>
	</td>
	<td class={tableCellClasses.rowNormal}>
		<div
			class="mx-auto w-24 rounded py-1 text-sm capitalize text-white"
			style="background-color: {statusColor}"
		>
			{status}
		</div>
	</td>
	<td class={tableCellClasses.rowNormal}>
		<ModalButton
			variant="text"
			styleClass="w-fit ml-4 mr-6"
			modalFor="job-history-details-{rowIndex}"
		>
			<div class="rounded-full border border-[#D9DADE] p-3">
				<img src={staticImages.infoV2Icon} alt="Info Icon" />
			</div>
		</ModalButton>
	</td>
</tr>
<PastJobDetailsModal modalFor="job-history-details-{rowIndex}" jobData={rowData} {rowIndex} />
<CreateOrderModal modalFor="create-order-modal-{rowIndex}" preFilledData={rowData} />

<style>
	/* TODO: migrate these classes to tailwind and then refactor the copy to clipboard functionality */
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
