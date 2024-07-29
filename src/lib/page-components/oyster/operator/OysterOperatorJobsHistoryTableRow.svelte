<script lang="ts">
	import { tableClasses } from '$lib/atoms/componentClasses';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import {
		bigNumberToString,
		epochSecToString,
		epochToDurationString,
		epochToDurationStringLong
	} from '$lib/utils/helpers/conversionHelper';

	export let rowData: OysterInventoryDataModel;

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
	<NameWithAddress {address} {name}>
		<svelte:fragment slot="copyIcon">
			<div
				class="invisible cursor-pointer opacity-0 group-hover/row:visible group-hover/row:opacity-100"
			>
				<img src={staticImages.copyIcon} alt="Copy" />
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
	{epochSecToString(endEpochTime)}
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	<Tooltip>
		<span slot="tooltipContent">{epochToDurationStringLong(durationRun)}</span>
		<span slot="tooltipIcon">{epochToDurationString(durationRun, true)}</span>
	</Tooltip>
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	{$oysterTokenMetadataStore.symbol}{bigNumberToString(
		totalDeposit,
		$oysterTokenMetadataStore.decimal
	)}
</td>
