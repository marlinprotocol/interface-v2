<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TableGridDataCell from '$lib/components/table-cells/TableGridDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { getColorHexByVariant } from '$lib/utils/constants/componentConstants';
	import { BigNumberZero, oysterAmountPrecision } from '$lib/utils/constants/constants';
	import {
		kInventoryTableColumnsWidth,
		kOysterRateMetaData
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString, epochToDurationString } from '$lib/utils/conversion';
	import { openModal } from '$lib/utils/helpers/commonHelper';
	import { getInventoryDurationVariant } from '$lib/utils/helpers/oysterHelpers';
	import { handleGetReviseRateInititaeEndTimestamp } from '$lib/utils/services/oysterServices';
	import { BigNumber } from 'ethers';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;

	const { symbol } = kOysterRateMetaData;
	$: ({
		provider: { name, address },
		instance,
		region,
		vcpu,
		memory,
		rate,
		live,
		balance,
		endEpochTime // epoch time in seconds based on duration left
	} = rowData);

	let openRow: number = -1;

	let stopInitiateEndTimestamp: number = 0;
	let rateReviseInitiateEndTimestamp: number = 0;
	let revisedRate: BigNumber = BigNumberZero;
	let stopLoading: boolean = false;
	let amendLoading: boolean = false;

	const handleStopClick = async () => {
		stopLoading = true;
		const { updatesAt = 0, value } = await handleGetReviseRateInititaeEndTimestamp(rowData);
		rateReviseInitiateEndTimestamp = updatesAt;
		if (value === 0) {
			stopInitiateEndTimestamp = updatesAt;
		}
		openModal(`job-stop-modal-${rowIndex}`);
		stopLoading = false;
	};
	const handleAmendClick = async () => {
		amendLoading = true;
		const { updatesAt = 0, value } = await handleGetReviseRateInititaeEndTimestamp(rowData);
		rateReviseInitiateEndTimestamp = updatesAt;
		revisedRate = BigNumber.from(value ?? 0);
		openModal(`job-amend-rate-modal-${rowIndex}`);
		amendLoading = false;
	};
</script>

{#if live}
	<div class="main-row flex gap-1 hover:bg-base-200 px-8 items-center h-16">
		<TableGridDataCell
			width={`${kInventoryTableColumnsWidth('provider')}`}
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
		<TableGridDataCell width={`${kInventoryTableColumnsWidth('instance')}`}>
			{instance}
		</TableGridDataCell>
		<TableGridDataCell width={`${kInventoryTableColumnsWidth('region')}`}>
			{region}
		</TableGridDataCell>
		<TableGridDataCell width={`${kInventoryTableColumnsWidth('rate')}`}>
			{symbol}{bigNumberToCommaString(rate, oysterAmountPrecision)}
		</TableGridDataCell>
		<TableGridDataCell width={`${kInventoryTableColumnsWidth('vcpu')}`}>
			{vcpu}
		</TableGridDataCell>
		<TableGridDataCell width={`${kInventoryTableColumnsWidth('memory')}`}>
			{memory}
		</TableGridDataCell>
		<TableGridDataCell width={`${kInventoryTableColumnsWidth('balance')}`}>
			{symbol}{bigNumberToCommaString(balance, oysterAmountPrecision)}
		</TableGridDataCell>
		<TableGridDataCell width={`${kInventoryTableColumnsWidth('durationLeft')}`}>
			<Timer {endEpochTime}>
				<div slot="active" let:timer class="mx-auto">
					<Tooltip tooltipText={epochToDurationString(timer)}>
						<div
							class="py-1 w-24 text-white rounded mx-auto text-sm text-center"
							style={`background-color:${getColorHexByVariant(getInventoryDurationVariant(timer))}`}
						>
							{epochToDurationString(timer, true)}
						</div>
					</Tooltip>
				</div>
				<div slot="inactive" class="mx-auto">Ended</div>
			</Timer>
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
{/if}

<style>
	/* show icon only on hover on table-row */
	.main-row:hover .copy-icon {
		display: flex;
	}
	.main-row .copy-icon {
		display: none;
	}
</style>
