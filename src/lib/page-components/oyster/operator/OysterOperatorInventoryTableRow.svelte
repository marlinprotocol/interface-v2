<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';

	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { getColorHexByVariant } from '$lib/utils/constants/componentConstants';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/conversion';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';
	import { handleClaimAmountFromOysterJob } from '$lib/utils/services/oysterServices';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;
	let submitLoading = false;

	const { symbol, decimal, precision } = kOysterRateMetaData;

	const handleClaimClick = async () => {
		submitLoading = true;
		await handleClaimAmountFromOysterJob(id);
		submitLoading = false;
	};

	$: ({ owner, id, instance, region, createdAt, status, durationRun, amountToBeSettled } = rowData);
	$: statusColor = getColorHexByVariant(getInventoryStatusVariant(status) as CommonVariant);
</script>

<tr class="main-row hover:bg-base-200">
	<td class={tableCellClasses.row}>
		<NameWithAddress address={owner} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="w-4">
					<div class="copy-icon cursor-pointer">
						<ImageColored src={staticImages.CopyGrey} alt="Copy" variant={'grey'} />
					</div>
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</td>
	<td class={tableCellClasses.rowNormal}>
		{instance ?? 'N/A'}
	</td>
	<td class={tableCellClasses.rowNormal}>
		{region ?? 'N/A'}
	</td>
	<td class={tableCellClasses.rowNormal}>
		{epochSecToString(createdAt)}
	</td>
	<td class={tableCellClasses.rowNormal}>
		<Tooltip tooltipText={epochToDurationString(durationRun)}>
			{epochToDurationString(durationRun, true)}
		</Tooltip>
	</td>
	<td class={tableCellClasses.rowNormal}>
		<Tooltip tooltipText={`${symbol}${bigNumberToString(amountToBeSettled, decimal, precision)}`}>
			{symbol}{bigNumberToString(amountToBeSettled, decimal)}
		</Tooltip>
	</td>
	<td class={tableCellClasses.rowNormal}>
		<div
			class="py-1 w-24 text-white rounded mx-auto text-sm capitalize"
			style={`background-color:${statusColor}`}
		>
			{status}
		</div>
	</td>
	<td class={tableCellClasses.rowNormal}>
		<Button
			variant="tableConvertButton"
			onclick={handleClaimClick}
			size="smaller"
			disabled={submitLoading}
			styleClass="w-fit px-8 rounded text-xs mr-6"
		>
			{'CLAIM'}
		</Button>
	</td>
</tr>

<style>
	/* show icon only on hover on table-row */
	.main-row:hover .copy-icon {
		display: flex;
	}
	.main-row .copy-icon {
		display: none;
	}
</style>
