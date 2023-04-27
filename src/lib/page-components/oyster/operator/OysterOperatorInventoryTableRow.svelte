<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';

	import TableGridDataCell from '$lib/components/table-cells/TableGridDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import { settleOysterJob } from '$lib/controllers/contractController';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { getColorHexByVariant } from '$lib/utils/constants/componentConstants';
	import { oysterAmountPrecision } from '$lib/utils/constants/constants';
	import {
		kOysterMerchantJobTableColumnsWidth,
		kOysterRateMetaData
	} from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToCommaString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/conversion';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;

	const { symbol } = kOysterRateMetaData;

	$: ({
		provider: { name, address },
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

<div class="main-row flex gap-1 hover:bg-base-200 px-8 items-center h-16">
	<TableGridDataCell
		width={`${kOysterMerchantJobTableColumnsWidth('provider')}`}
		styleClass="flex gap-2 items-center"
	>
		<NameWithAddress {name} {address} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="copy-icon cursor-pointer">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant={'grey'} />
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</TableGridDataCell>
	<TableGridDataCell width={`${kOysterMerchantJobTableColumnsWidth('instance')}`}>
		{instance}
	</TableGridDataCell>
	<TableGridDataCell width={`${kOysterMerchantJobTableColumnsWidth('region')}`}>
		{region}
	</TableGridDataCell>
	<TableGridDataCell width={`${kOysterMerchantJobTableColumnsWidth('createdAt')}`}>
		{epochSecToString(createdAt)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kOysterMerchantJobTableColumnsWidth('durationRun')}`}>
		<Tooltip tooltipText={epochToDurationString(durationRun)}>
			{epochToDurationString(durationRun, true)}
		</Tooltip>
	</TableGridDataCell>
	<TableGridDataCell width={`${kOysterMerchantJobTableColumnsWidth('amountToBeSettled')}`}>
		{symbol}{bigNumberToCommaString(amountToBeSettled, oysterAmountPrecision)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kOysterMerchantJobTableColumnsWidth('status')}`}>
		<div
			class="py-1 w-24 text-white rounded mx-auto text-sm capitalize"
			style={`background-color:${statusColor}`}
		>
			{status}
		</div>
	</TableGridDataCell>
	<TableGridDataCell width={`${kOysterMerchantJobTableColumnsWidth('action')}`}>
		<Button
			variant="tableConvertButton"
			onclick={async () => await settleOysterJob(id)}
			size="smaller"
			styleClass="w-fit px-6 rounded text-xs">CLAIM</Button
		>
	</TableGridDataCell>
</div>

<style>
	/* show icon only on hover on table-row */
	.main-row:hover .copy-icon {
		display: flex;
	}
	.main-row .copy-icon {
		display: none;
	}
</style>
