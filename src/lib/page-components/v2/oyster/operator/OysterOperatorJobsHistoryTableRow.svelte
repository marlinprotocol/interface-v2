<script lang="ts">
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
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
		owner: { name, address },
		instance,
		region,
		createdAt,
		durationRun,
		totalDeposit,
		endEpochTime
	} = rowData);
</script>

<td class={tableClasses.cell}>
	<NameWithAddress {address} {name} {rowIndex}>
		<svelte:fragment slot="copyIcon">
			<div class="hidden cursor-pointer group-hover:flex">
				<ImageColored src={staticImages.CopyGrey} alt="Copy" variant="grey" />
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
	{epochSecToString(endEpochTime)}
</td>
<td class={tableClasses.cell}>
	<Tooltip tooltipText={epochToDurationString(durationRun)}>
		{epochToDurationString(durationRun, true)}
	</Tooltip>
</td>
<td class={tableClasses.cell}>
	{$oysterTokenMetadataStore.symbol}{bigNumberToString(
		totalDeposit,
		$oysterTokenMetadataStore.decimal
	)}
</td>
