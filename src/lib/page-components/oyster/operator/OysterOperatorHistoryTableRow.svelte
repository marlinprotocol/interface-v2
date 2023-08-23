<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TableGridDataCell from '$lib/components/table-cells/TableGridDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { OYSTER_RATE_METADATA } from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/helpers/conversionHelper';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;

	const { symbol, decimal } = OYSTER_RATE_METADATA;

	$: ({
		provider: { name, address },
		instance,
		region,
		createdAt,
		durationRun,
		amountToBeSettled,
		endEpochTime
	} = rowData);
</script>

<div class="main-row flex gap-1 hover:bg-base-200 px-8 items-center h-16">
	<TableGridDataCell styleClass="flex gap-2 items-center">
		<NameWithAddress {name} {address} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="copy-icon cursor-pointer">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant={'grey'} />
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</TableGridDataCell>
	<TableGridDataCell>
		{instance ?? 'N/A'}
	</TableGridDataCell>
	<TableGridDataCell>
		{region ?? 'N/A'}
	</TableGridDataCell>
	<TableGridDataCell>
		{epochSecToString(createdAt)}
	</TableGridDataCell>
	<TableGridDataCell>
		{epochSecToString(endEpochTime)}
	</TableGridDataCell>
	<TableGridDataCell>
		<Tooltip tooltipText={epochToDurationString(durationRun)}>
			{epochToDurationString(durationRun, true)}
		</Tooltip>
	</TableGridDataCell>
	<TableGridDataCell>
		{symbol}{bigNumberToString(amountToBeSettled, decimal)}
	</TableGridDataCell>
	<TableGridDataCell>
		<!-- <Button onclick={async () => await settleOysterJob(id)} size="tiny" styleClass="w-full"
			>CLAIM</Button
		> -->mellow
		yellow
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
