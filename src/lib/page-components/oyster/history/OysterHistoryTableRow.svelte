<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import TableConvertButton from '$lib/components/buttons/TableConvertButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TableGridDataCell from '$lib/components/table-cells/TableGridDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterHistoryDataModel } from '$lib/types/oysterComponentType';
	import { getColorHexByVariant } from '$lib/utils/constants/componentConstants';
	import { pondPrecisions } from '$lib/utils/constants/constants';
	import { kHistoryTableColumnsWidth } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import { bridgeTxnUrls } from '$lib/utils/helpers/bridgeHelpers';
	import { getInventoryStatusVariant } from '$lib/utils/helpers/oysterHelpers';

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

<div class="main-row flex gap-1 hover:bg-base-200 px-8 items-center h-16">
	<TableGridDataCell
		width={`${kHistoryTableColumnsWidth('merchant')}`}
		styleClass="flex gap-2 items-center"
	>
		<NameWithAddress {name} {address}>
			<svelte:fragment slot="copyIcon">
				<div class="copy-icon cursor-pointer">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant={'grey'} />
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('instance')}`}>
		{instance}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('region')}`}>
		{region}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('amountPaid')}`}>
		{amountPaid.symbol}{bigNumberToCommaString(amountPaid.amount, pondPrecisions)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('amountUsed')}`}>
		{amountUsed.symbol}{bigNumberToCommaString(amountUsed.amount, pondPrecisions)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('refund')}`}>
		{refund.symbol}{bigNumberToCommaString(refund.amount, pondPrecisions)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('status')}`}>
		<div
			class="py-1 w-28 text-white rounded mx-auto text-sm"
			style={`background-color:${statusColor}`}
		>
			{status}
		</div>
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('txHash')}`}>
		<TxnHashText txnHash={txHash} txnHashUrl={bridgeTxnUrls(txHash)} startInt={2} endInt={2} />
	</TableGridDataCell>
	<TableGridDataCell width={`${kHistoryTableColumnsWidth('action')}`}>
		<TableConvertButton modalFor={`redploy-${rowIndex}`} text="REDEPLOY" />
	</TableGridDataCell>
</div>

<style>
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
