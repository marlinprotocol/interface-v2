<script lang="ts">
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
	import Tooltip from '$lib/atoms/v2/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/v2/texts/NameWithAddress.svelte';
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
				<img src={staticImages.copyIcon} alt="Copy" />
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
	<Tooltip>
		<span slot="tooltipContent">{epochToDurationString(durationRun)}</span>
		{epochToDurationString(durationRun, true)}
	</Tooltip>
</td>
<td class={tableClasses.cell}>
	{$oysterTokenMetadataStore.symbol}{bigNumberToString(
		totalDeposit,
		$oysterTokenMetadataStore.decimal
	)}
</td>
