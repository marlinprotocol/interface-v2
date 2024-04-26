<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/v2/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';

	import NameWithAddress from '$lib/components/v2/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import {
		bigNumberToString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/helpers/conversionHelper';
	import {
		getColorHexByVariant,
		getColorHexByVariantForTag
	} from '$lib/utils/v2/helpers/componentHelper';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';
	import { handleClaimAmountFromOysterJob } from '$lib/utils/services/oysterServices';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';

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

<td class={tableClasses.cell}>
	<NameWithAddress {name} {address} {rowIndex}>
		<svelte:fragment slot="copyIcon">
			<div class="w-4">
				<div class="hidden cursor-pointer group-hover/row:flex">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant="grey" />
				</div>
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
	{epochSecToString(createdAt)}
</td>
<td class={tableClasses.cell}>
	<Tooltip>
		<p slot="tooltipIcon">
			{epochToDurationString(durationRun, true)}
		</p>
		<span slot="tooltipContent">{epochToDurationString(durationRun)}</span>
	</Tooltip>
</td>
<td class={tableClasses.cell}>
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
<td class={tableClasses.cell}>
	<div
		class="mx-auto rounded-full px-[31.5px] py-[10.5px] text-center text-sm capitalize text-[#030115]"
		style="background-color: {statusColor}"
	>
		{status}
	</div>
</td>

<td class={tableClasses.cell}>
	<Button onclick={handleClaimClick} variant="text" styleClass="w-fit ml-4 mr-6">
		<Tooltip>
			<div slot="tooltipIcon" class="rounded-full border border-[#D9DADE] p-3">
				<img src={staticImages.Verified} alt="Claim" />
			</div>
			<span class="font-normal" slot="tooltipContent">Claim</span>
		</Tooltip>
	</Button>
</td>
