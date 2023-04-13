<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TableGridDataCell from '$lib/components/table-cells/TableGridDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { CommonVariant } from '$lib/types/componentTypes';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { getColorHexByVariant } from '$lib/utils/constants/componentConstants';
	import { pondPrecisions } from '$lib/utils/constants/constants';
	import { kInventoryTableColumnsWidth } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString, epochToDurationString } from '$lib/utils/conversion';
	import { getInventoryDurationVariant } from '$lib/utils/helpers/oysterHelpers';
	import plus from 'svelte-awesome/icons/plus';
	import { slide } from 'svelte/transition';

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
		durationLeft
	} = rowData);

	let openRow: number = -1;
	$: durationColor = getColorHexByVariant(
		getInventoryDurationVariant(durationLeft) as CommonVariant
	);
</script>

<div class="main-row flex gap-1 hover:bg-base-200 px-8 items-center h-16">
	<TableGridDataCell
		width={`${kInventoryTableColumnsWidth('merchant')}`}
		styleClass="flex gap-2 items-center"
	>
		<NameWithAddress {name} {address} index={rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="copy-icon cursor-pointer">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant={'grey'} />
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</TableGridDataCell>
	<TableGridDataCell width={`${kInventoryTableColumnsWidth('instance')}`}>
		{instance}
	</TableGridDataCell>
	<TableGridDataCell width={`${kInventoryTableColumnsWidth('region')}`}>
		{region}
	</TableGridDataCell>
	<TableGridDataCell width={`${kInventoryTableColumnsWidth('rate')}`}>
		{rate.symbol}{bigNumberToCommaString(rate.amount, pondPrecisions)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kInventoryTableColumnsWidth('amountPaid')}`}>
		{amountPaid.symbol}{bigNumberToCommaString(amountPaid.amount, pondPrecisions)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kInventoryTableColumnsWidth('amountUsed')}`}>
		{amountUsed.symbol}{bigNumberToCommaString(amountUsed.amount, pondPrecisions)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kInventoryTableColumnsWidth('balance')}`}>
		{balance.symbol}{bigNumberToCommaString(balance.amount, pondPrecisions)}
	</TableGridDataCell>
	<!-- TODO: check if these are timer? -->
	<TableGridDataCell width={`${kInventoryTableColumnsWidth('durationLeft')}`}>
		<Tooltip tooltipText={epochToDurationString(durationLeft)}>
			<div
				class="py-1 w-24 text-white rounded mx-auto text-sm text-center"
				style={`background-color:${durationColor}`}
			>
				{epochToDurationString(durationLeft, true)}
			</div>
		</Tooltip>
	</TableGridDataCell>
	<TableGridDataCell width={`${kInventoryTableColumnsWidth('action')}`}>
		<CollapseButton
			isOpen={openRow === rowIndex}
			onclick={() => {
				openRow = openRow === rowIndex ? -1 : rowIndex;
			}}
		/>
	</TableGridDataCell>
</div>

<div class="expanded-row">
	{#if openRow === rowIndex}
		<div transition:slide={{ duration: 400 }} class="flex gap-4 mt-4 mb-8 px-8">
			<Button variant="filled" size="small" icon={plus} onclick={() => {}}>ADD FUNDS</Button>
			<Button variant="outlined" size="small" onclick={() => {}}>STOP</Button>
			<Button variant="outlined" size="small" onclick={() => {}}>WITHDRAW</Button>
			<Button variant="outlined" size="small" onclick={() => {}}>DETAILS</Button>
		</div>
	{/if}
</div>

<style>
	.expanded-row {
		border-bottom: 1px solid #e5e5e5;
	}

	.expanded-row:last-child {
		border-bottom: none;
	}

	/* show icon only on hover on table-row */
	.main-row:hover .copy-icon {
		display: flex;
	}
	.main-row .copy-icon {
		display: none;
	}
</style>
