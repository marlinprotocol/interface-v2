<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import {
		bigNumberToString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/helpers/conversionHelper';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;

	$: ({
		provider: { name, address },
		instance,
		region,
		createdAt,
		durationRun,
		totalDeposit,
		endEpochTime
	} = rowData);
</script>

<tr class="main-row hover:bg-base-200">
	<td class={tableCellClasses.row}>
		<NameWithAddress {name} {address} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="copy-icon cursor-pointer">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant="grey" />
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
		{epochSecToString(endEpochTime)}
	</td>
	<td class={tableCellClasses.rowNormal}>
		<Tooltip tooltipText={epochToDurationString(durationRun)}>
			{epochToDurationString(durationRun, true)}
		</Tooltip>
	</td>
	<td class={tableCellClasses.rowNormal}>
		{$oysterTokenMetadataStore.symbol}{bigNumberToString(
			totalDeposit,
			$oysterTokenMetadataStore.decimal
		)}
	</td>
</tr>

<style>
	/* show icon only on hover on table-row */
	/* TODO: migrate these classes to tailwind and then refactor the copy to clipboard functionality */
	.main-row:hover .copy-icon {
		display: flex;
	}
	.main-row .copy-icon {
		display: none;
	}
</style>
