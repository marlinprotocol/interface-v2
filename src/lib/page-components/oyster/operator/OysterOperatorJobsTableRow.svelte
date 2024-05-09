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
		epochToDurationString
	} from '$lib/utils/helpers/conversionHelper';
	import { getColorHexByVariantForTag } from '$lib/utils/helpers/componentHelper';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';
	import { handleClaimAmountFromOysterJob } from '$lib/utils/services/oysterServices';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import { OYSTER_MERCHANT_JOB_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';

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

<td
	class={cn(tableClasses.cell, {
		'text-center': OYSTER_MERCHANT_JOB_TABLE_HEADER[0]?.centered
	})}
>
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
<td
	class={cn(tableClasses.cell, {
		'text-center': OYSTER_MERCHANT_JOB_TABLE_HEADER[1]?.centered
	})}
>
	{instance ?? 'N/A'}
</td>
<td
	class={cn(tableClasses.cell, {
		'text-center': OYSTER_MERCHANT_JOB_TABLE_HEADER[2]?.centered
	})}
>
	{region ?? 'N/A'}
</td>
<td
	class={cn(tableClasses.cell, {
		'text-center': OYSTER_MERCHANT_JOB_TABLE_HEADER[3]?.centered
	})}
>
	{epochSecToString(createdAt)}
</td>
<td
	class={cn(tableClasses.cell, {
		'text-center': OYSTER_MERCHANT_JOB_TABLE_HEADER[4]?.centered
	})}
>
	<Tooltip>
		<p slot="tooltipIcon">
			{epochToDurationString(durationRun, true)}
		</p>
		<span slot="tooltipContent">{epochToDurationString(durationRun)}</span>
	</Tooltip>
</td>
<td
	class={cn(tableClasses.cell, {
		'text-center': OYSTER_MERCHANT_JOB_TABLE_HEADER[5]?.centered
	})}
>
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
<td
	class={cn(tableClasses.cell, {
		'text-center': OYSTER_MERCHANT_JOB_TABLE_HEADER[6]?.centered
	})}
>
	<div
		class="mx-auto rounded-full px-[31.5px] py-[10.5px] text-center text-sm capitalize text-[#030115]"
		style="background-color: {statusColor}"
	>
		{status}
	</div>
</td>

<td
	class={cn(tableClasses.cell, {
		'text-center': OYSTER_MERCHANT_JOB_TABLE_HEADER[7]?.centered
	})}
>
	<Button onclick={handleClaimClick} variant="text" styleClass="w-fit ml-4 mr-6">
		<Tooltip>
			<div slot="tooltipIcon" class="rounded-full border border-[#D9DADE] p-3">
				<img src={staticImages.Verified} alt="Claim" />
			</div>
			<span class="font-normal" slot="tooltipContent">Claim</span>
		</Tooltip>
	</Button>
</td>
