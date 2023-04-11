<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import StatusCircle from '$lib/components/status/StatusCircle.svelte';
	import TableDataCell from '$lib/components/table-cells/TableDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { getColorHexByVariant } from '$lib/utils/constants/componentConstants';
	import { pondPrecisions } from '$lib/utils/constants/constants';
	import { bigNumberToCommaString, epochToDurationString } from '$lib/utils/conversion';
	import { slide } from 'svelte/transition';
	import {
		getInventoryDurationVariant,
		getInventoryStatusVariant
	} from '$lib/utils/helpers/oysterHelpers';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;

	$: ({
		merchant: { name, address },
		instance,
		region,
		rate,
		amountPaid,
		amountUsed,
		balance,
		durationLeft,
		status
	} = rowData);

	let openRow: number = -1;
	$: statusVariant = getInventoryStatusVariant(status) as CommonVariant;
	$: durationColor = getColorHexByVariant(
		getInventoryDurationVariant(durationLeft) as CommonVariant
	);
</script>

<tr>
	<TableDataCell>
		<NameWithAddress {name} {address} />
	</TableDataCell>
	<TableDataCell>
		{instance}
	</TableDataCell>
	<TableDataCell>
		{region}
	</TableDataCell>
	<TableDataCell>
		{rate.symbol}{bigNumberToCommaString(rate.amount, pondPrecisions)}
	</TableDataCell>
	<TableDataCell>
		{amountPaid.symbol}{bigNumberToCommaString(amountPaid.amount, pondPrecisions)}
	</TableDataCell>
	<TableDataCell>
		{amountUsed.symbol}{bigNumberToCommaString(amountUsed.amount, pondPrecisions)}
	</TableDataCell>
	<TableDataCell>
		{balance.symbol}{bigNumberToCommaString(balance.amount, pondPrecisions)}
	</TableDataCell>
	<TableDataCell>
		<div
			class="py-1 px-4 w-fit text-white rounded mx-auto text-sm"
			style={`background-color:${durationColor}`}
		>
			{epochToDurationString(durationLeft, true)}
		</div>
	</TableDataCell>
	<TableDataCell>
		<StatusCircle variant={statusVariant} />
	</TableDataCell>
	<TableDataCell>
		<CollapseButton
			onclick={() => {
				openRow = openRow === rowIndex ? -1 : rowIndex;
			}}
		/>
	</TableDataCell>
</tr>
<tr class="row">
	{#if openRow === rowIndex}
		<div transition:slide={{ duration: 400 }}>
			<Button variant="outlined" size="tiny" onclick={() => {}}>Add Funds</Button>
		</div>
	{/if}
	{#if openRow === rowIndex}
		<div transition:slide={{ duration: 400 }}>
			<Button variant="outlined" size="tiny" onclick={() => {}}>Stop</Button>
		</div>
	{/if}
	{#if openRow === rowIndex}
		<div transition:slide={{ duration: 400 }}>
			<Button variant="outlined" size="tiny" onclick={() => {}}>Details</Button>
		</div>
	{/if}
</tr>

<style>
	.row {
		border-bottom: 1px solid #e5e5e5;
	}

	.row:last-child {
		border-bottom: none;
	}
</style>
