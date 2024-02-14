<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
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
	import { getColorHexByVariant } from '$lib/utils/helpers/componentHelper';
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
	$: statusColor = getColorHexByVariant(getInventoryStatusVariant(status) as CommonVariant);
</script>

<tr class="main-row hover:bg-base-200">
	<td class={tableCellClasses.row}>
		<NameWithAddress {address} {name} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="w-4">
					<div class="copy-icon cursor-pointer">
						<ImageColored src={staticImages.CopyGrey} alt="Copy" variant="grey" />
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
		<Tooltip
			tooltipText="{$oysterTokenMetadataStore.symbol}${bigNumberToString(
				amountToBeSettled,
				$oysterTokenMetadataStore.decimal,
				$oysterTokenMetadataStore.precision
			)}"
		>
			{$oysterTokenMetadataStore.symbol}{bigNumberToString(
				amountToBeSettled,
				$oysterTokenMetadataStore.decimal
			)}
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
		<Button
			variant="tableConvertButton"
			onclick={handleClaimClick}
			size="smaller"
			disabled={submitLoading || status === 'closed'}
			styleClass="w-fit px-8 rounded text-xs mr-6"
		>
			CLAIM
		</Button>
	</td>
</tr>

<style>
	/* TODO: migrate these classes to tailwind and then refactor the copy to clipboard functionality */
	/* show icon only on hover on table-row */
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
