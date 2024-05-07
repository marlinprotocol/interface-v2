<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/v2/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { bigNumberToString, epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import { getInventoryStatusVariant } from '$lib/utils/v2/helpers/oysterHelpers';
	import { getColorHexByVariantForTag } from '$lib/utils/v2/helpers/componentHelper';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import PastJobDetailsModal from './modals/PastJobDetailsModal.svelte';
	import CreateOrderModal from './modals/CreateOrderModal.svelte';
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
	$: statusColor = getColorHexByVariantForTag(getInventoryStatusVariant(status) as CommonVariant);
</script>

<td class={tableClasses.cell}>
	<NameWithAddress {name} {address}>
		<svelte:fragment slot="copyIcon">
			<div class="hidden cursor-pointer group-hover:flex">
				<img src={staticImages.copyIcon} alt="Copy" />
			</div>
		</svelte:fragment>
	</NameWithAddress>
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
		class="mx-auto rounded-full px-[31.5px] py-[10.5px] text-center text-sm capitalize text-[#030115]"
		style="background-color: {statusColor}"
	>
		{status}
	</div>
</td>
<td class={tableClasses.cell}>
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
<PastJobDetailsModal modalFor="job-history-details-{rowIndex}" jobData={rowData} {rowIndex} />
<CreateOrderModal modalFor="create-order-modal-{rowIndex}" preFilledData={rowData} />
