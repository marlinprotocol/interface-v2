<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import TableConvertButton from '$lib/components/buttons/TableConvertButton.svelte';
	import TableDataCell from '$lib/components/table-cells/TableDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterHistoryDataModel } from '$lib/types/oysterComponentType';
	import { getColorHexByVariant } from '$lib/utils/constants/componentConstants';
	import { pondPrecisions } from '$lib/utils/constants/constants';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import { bridgeTxnUrls } from '$lib/utils/helpers/bridgeHelpers';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';
	import { slide } from 'svelte/transition';

	export let rowData: OysterHistoryDataModel;
	export let rowIndex: number;

	$: ({
		merchant: { name, address },
		instance,
		region,
		refund,
		amountPaid,
		amountUsed,
		status,
		txHash
	} = rowData);

	let openRow: number = -1;
	$: statusColor = getColorHexByVariant(getInventoryStatusVariant(status) as CommonVariant);
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
		{amountPaid.symbol}{bigNumberToCommaString(amountPaid.amount, pondPrecisions)}
	</TableDataCell>
	<TableDataCell>
		{amountUsed.symbol}{bigNumberToCommaString(amountUsed.amount, pondPrecisions)}
	</TableDataCell>
	<TableDataCell>
		{refund.symbol}{bigNumberToCommaString(refund.amount, pondPrecisions)}
	</TableDataCell>
	<TableDataCell>
		<div
			class="py-1 w-28 w-fit text-white rounded mx-auto text-sm"
			style={`background-color:${statusColor}`}
		>
			{status}
		</div>
	</TableDataCell>
	<TableDataCell>
		<!-- TODO: check this -->
		<TxnHashText txnHash={txHash} txnHashUrl={bridgeTxnUrls(txHash)} />
	</TableDataCell>
	<TableDataCell>
		<TableConvertButton modalFor={`redploy-${rowIndex}`} text="REDEPLOY" />
	</TableDataCell>
</tr>

<style>
	tr {
		border-bottom: 1px solid #e5e5e5;
	}

	tr:last-child {
		border-bottom: none;
	}
</style>
