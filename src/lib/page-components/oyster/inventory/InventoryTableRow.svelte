<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TableGridDataCell from '$lib/components/table-cells/TableGridDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { getColorHexByVariant } from '$lib/utils/constants/componentConstants';
	import { oysterAmountPrecision } from '$lib/utils/constants/constants';
	import {
		kInventoryTableColumnsWidth,
		kOysterRateMetaData
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString, epochToDurationString } from '$lib/utils/conversion';
	import { getInventoryDurationVariant } from '$lib/utils/helpers/oysterHelpers';
	import { handleStopJob } from '$lib/utils/services/oysterServices';
	import plus from 'svelte-awesome/icons/plus';
	import { slide } from 'svelte/transition';
	import AddFundsToJobModal from './modals/AddFundsToJobModal.svelte';
	import InventoryJobDetailsModal from './modals/JobDetailsModal.svelte';
	import StopJobModal from './modals/StopJobModal.svelte';
	import WithdrawFundsFromJobModal from './modals/WithdrawFundsFromJobModal.svelte';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;

	const { symbol } = kOysterRateMetaData;
	$: ({
		provider: { name, address },
		instance,
		region,
		rate,
		live,
		amountPaid,
		amountUsed,
		balance,
		endEpochTime // epoch time in seconds based on duration left
	} = rowData);

	const stopJob = async () => {
		rowData = await handleStopJob(rowData);
	};

	let openRow: number = -1;
</script>

{#if live}
	<div class="main-row flex gap-1 hover:bg-base-200 px-8 items-center h-16">
		<TableGridDataCell
			width={`${kInventoryTableColumnsWidth('merchant')}`}
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
		<TableGridDataCell width={`${kInventoryTableColumnsWidth('amountPaid')}`}>
			{symbol}{bigNumberToCommaString(amountPaid, oysterAmountPrecision)}
		</TableGridDataCell>
		<TableGridDataCell width={`${kInventoryTableColumnsWidth('amountUsed')}`}>
			{symbol}{bigNumberToCommaString(amountUsed, oysterAmountPrecision)}
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
	<div class="expanded-row">
		{#if openRow === rowIndex}
			<div transition:slide={{ duration: 400 }} class="flex gap-4 mt-4 mb-8 px-8">
				<ModalButton
					variant="filled"
					size="small"
					icon={plus}
					modalFor={`job-add-funds-modal-${rowIndex}`}
				>
					ADD FUNDS
				</ModalButton>
				<ModalButton variant="outlined" size="small" modalFor={`job-stop-modal-${rowIndex}`}>
					STOP
				</ModalButton>
				<ModalButton
					variant="outlined"
					size="small"
					modalFor={`job-withdraw-fund-modal-${rowIndex}`}
				>
					WITHDRAW
				</ModalButton>
				<ModalButton variant="outlined" size="small" modalFor={`job-stop-modal-${rowIndex}`}>
					AMEND RATE
				</ModalButton>
				<ModalButton variant="outlined" size="small" modalFor={`job-details-modal-${rowIndex}`}>
					DETAILS
				</ModalButton>
			</div>
		{/if}
	</div>
	<InventoryJobDetailsModal bind:jobData={rowData} modalFor={`job-details-modal-${rowIndex}`} />
	<AddFundsToJobModal bind:jobData={rowData} modalFor={`job-add-funds-modal-${rowIndex}`} />
	<WithdrawFundsFromJobModal
		bind:jobData={rowData}
		modalFor={`job-withdraw-fund-modal-${rowIndex}`}
	/>
	<StopJobModal bind:jobData={rowData} modalFor={`job-stop-modal-${rowIndex}`} />
{/if}

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
