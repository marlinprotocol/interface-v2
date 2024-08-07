<script lang="ts">
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import {
		bigNumberToString,
		epochToDurationString,
		epochToDurationStringLong
	} from '$lib/utils/helpers/conversionHelper';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';
	import { getColorHexByVariantForTag } from '$lib/utils/helpers/componentHelper';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import PastJobDetailsModal from './modals/PastJobDetailsModal.svelte';
	import CreateOrderModal from './modals/CreateOrderModal.svelte';
	import { tableClasses } from '$lib/atoms/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;

	$: ({ id, status, amountUsed, refund, createdAt, endEpochTime, isCreditJob, jobName } = rowData);

	$: statusColor = getColorHexByVariantForTag(getInventoryStatusVariant(status) as CommonVariant);
</script>

<td class={tableClasses.cell}>
	<NameWithAddress
		table="inventory-history"
		name={jobName === 'N/A' ? '' : jobName}
		address={String(id)}
		long
	>
		<svelte:fragment slot="copyIcon">
			<div class="w-4">
				<div
					class="invisible cursor-pointer opacity-0 group-hover/row:visible group-hover/row:opacity-100"
				>
					<img src={staticImages.copyIcon} alt="Copy" />
				</div>
			</div>
		</svelte:fragment>
	</NameWithAddress>
</td>

<td class={cn(tableClasses.cell, 'text-center')}>
	{#if isCreditJob}
		<Tooltip>
			<span slot="tooltipContent">This instance was using credits</span>
			<span
				class="mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-300 text-white"
				slot="tooltipIcon">C</span
			>
		</Tooltip>
		<Tooltip>
			<span slot="tooltipContent"
				>{bigNumberToString(
					amountUsed,
					$oysterTokenMetadataStore.decimal,
					$oysterTokenMetadataStore.precision
				)}</span
			>
			<span class="flex items-center" slot="tooltipIcon">
				{bigNumberToString(amountUsed, $oysterTokenMetadataStore.decimal)}
			</span>
		</Tooltip>
	{:else}
		<Tooltip>
			<span class="font-normal" slot="tooltipContent"
				>{$oysterTokenMetadataStore.symbol}{bigNumberToString(
					amountUsed,
					$oysterTokenMetadataStore.decimal,
					$oysterTokenMetadataStore.precision
				)}</span
			>
			<span slot="tooltipIcon"
				>{$oysterTokenMetadataStore.symbol}{bigNumberToString(
					amountUsed,
					$oysterTokenMetadataStore.decimal
				)}</span
			>
		</Tooltip>
	{/if}
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	{$oysterTokenMetadataStore.symbol}{bigNumberToString(refund, $oysterTokenMetadataStore.decimal)}
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	<Tooltip>
		<div slot="tooltipIcon">
			{epochToDurationString(endEpochTime - createdAt, true)}
		</div>
		<span class="font-normal" slot="tooltipContent">
			{epochToDurationStringLong(endEpochTime - createdAt)}
		</span>
	</Tooltip>
</td>
<td class={cn(tableClasses.cell, 'flex h-[64px] items-center justify-center')}>
	<div
		class="w-[142px] rounded-full px-[31.5px] py-[10.5px] text-center text-sm capitalize text-[#030115]"
		style="background-color: {statusColor}"
	>
		{status}
	</div>
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	<ModalButton
		variant="text"
		styleClass="w-fit ml-4 mr-6"
		modalFor="job-history-details-{rowIndex}"
	>
		<Tooltip>
			<div slot="tooltipIcon" class="rounded-full border border-grey-100 p-3">
				<img src={staticImages.infoV2Icon} class="icon-invert" alt="Info Icon" />
			</div>
			<span class="font-normal" slot="tooltipContent">Order Details</span>
		</Tooltip>
	</ModalButton>
</td>
<PastJobDetailsModal modalFor="job-history-details-{rowIndex}" jobData={rowData} {rowIndex} />
<CreateOrderModal
	modalFor="create-order-modal-{rowIndex}"
	bind:preFilledData={rowData}
	isRedeploy
/>
