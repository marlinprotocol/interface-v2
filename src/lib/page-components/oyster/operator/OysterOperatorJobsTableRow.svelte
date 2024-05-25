<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { tableClasses } from '$lib/atoms/componentClasses';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';

	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import {
		bigNumberToString,
		epochSecToString,
		epochToDurationString,
		epochToDurationStringLong
	} from '$lib/utils/helpers/conversionHelper';
	import { getColorHexByVariantForTag } from '$lib/utils/helpers/componentHelper';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';
	import { handleClaimAmountFromOysterJob } from '$lib/utils/services/oysterServices';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;

	let submitLoading = false;

	const handleClaimClick = async () => {
		submitLoading = true;
		await handleClaimAmountFromOysterJob(id);
		submitLoading = false;
	};

	$: ({
		owner: { address, name },
		id,
		instance,
		region,
		createdAt,
		status,
		durationRun,
		amountToBeSettled
	} = rowData);
	$: statusColor = getColorHexByVariantForTag(getInventoryStatusVariant(status) as CommonVariant);
</script>

<td class={cn(tableClasses.cell, 'text-center')}>
	<NameWithAddress {name} {address} {rowIndex}>
		<svelte:fragment slot="copyIcon">
			<div class="w-4">
				<div class="hidden cursor-pointer group-hover/row:flex">
					<img src={staticImages.copyIcon} alt="Copy" />
				</div>
			</div>
		</svelte:fragment>
	</NameWithAddress>
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	{instance ?? 'N/A'}
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	{region ?? 'N/A'}
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	{epochSecToString(createdAt)}
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	<Tooltip>
		<p slot="tooltipIcon">
			{epochToDurationString(durationRun, true)}
		</p>
		<span slot="tooltipContent">{epochToDurationStringLong(durationRun)}</span>
	</Tooltip>
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	<Tooltip>
		<p slot="tooltipIcon">
			{$oysterTokenMetadataStore.symbol}{bigNumberToString(
				amountToBeSettled,
				$oysterTokenMetadataStore.decimal
			)}
		</p>
		<span slot="tooltipContent"
			>{$oysterTokenMetadataStore.symbol}${bigNumberToString(
				amountToBeSettled,
				$oysterTokenMetadataStore.decimal,
				$oysterTokenMetadataStore.precision
			)}</span
		>
	</Tooltip>
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	<div
		class="mx-auto rounded-full px-[31.5px] py-[10.5px] text-center text-sm capitalize text-[#030115]"
		style="background-color: {statusColor}"
	>
		{status}
	</div>
</td>

<td class={cn(tableClasses.cell, 'text-center')}>
	<Button onclick={handleClaimClick} variant="text" styleClass="w-fit ml-4 mr-6">
		<Tooltip>
			<div
				slot="tooltipIcon"
				class="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-primary"
			>
				<img src={staticImages.RightArrowWhite} alt="Claim" />
			</div>
			<span class="font-normal" slot="tooltipContent">Claim</span>
		</Tooltip>
	</Button>
</td>
