<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { OYSTER_RATE_METADATA } from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToString,
		convertRateToPerHourString,
		epochToDurationString
	} from '$lib/utils/helpers/conversionHelper';
	import { getInventoryDurationVariant } from '$lib/utils/helpers/oysterHelpers';
	import plus from 'svelte-awesome/icons/plus';
	import { slide } from 'svelte/transition';
	import AddFundsToJobModal from '$lib/page-components/oyster/inventory/modals/AddFundsToJobModal.svelte';
	import AmendRateModal from '$lib/page-components/oyster/inventory/modals/AmendRateModal.svelte';
	import InventoryJobDetailsModal from '$lib/page-components/oyster/inventory/modals/JobDetailsModal.svelte';
	import StopJobModal from '$lib/page-components/oyster/inventory/modals/StopJobModal.svelte';
	import WithdrawFundsFromJobModal from '$lib/page-components/oyster/inventory/modals/WithdrawFundsFromJobModal.svelte';
	import type { Bytes } from 'ethers';
	import { refreshJobStatusForJobId } from '$lib/controllers/httpController';
	import { updateJobStatusByIdInOysterStore } from '$lib/data-stores/oysterStore';
	import refresh from 'svelte-awesome/icons/refresh';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import { getColorHexByVariant } from '$lib/utils/helpers/componentHelper';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;
	export let expandedRows: Set<string>;

	const { symbol, decimal, precision } = OYSTER_RATE_METADATA;
	let refreshLoading = false;
	$: ({
		provider: { name, address },
		instance,
		region,
		downScaledRate,
		id,
		ip,
		balance,
		endEpochTime, // epoch time in seconds based on duration left,
		reviseRate: { newRate = null, rateStatus = '', stopStatus = '' } = {}
	} = rowData);

	// Handler function for toggling the expansion of a row
	function toggleRowExpansion(rowId: string) {
		if (expandedRows.size > 0 && expandedRows.has(rowId)) {
			expandedRows.clear();
		} else if (expandedRows.size > 0) {
			expandedRows.clear();
			expandedRows.add(rowId);
		} else {
			expandedRows.add(rowId);
		}
		// assignment to self for reactivity purposes check out svelte docs updating arrays and object for more info
		expandedRows = expandedRows;
	}

	async function refreshJobStatus(jobId: Bytes) {
		refreshLoading = true;
		const updatedStatus = await refreshJobStatusForJobId(jobId);
		updateJobStatusByIdInOysterStore(updatedStatus);
		refreshLoading = false;
	}

	$: isJobFinished = !(Math.floor(endEpochTime - Date.now() / 1000) > 0);
	$: isOpen = expandedRows.has(id.toString());
	$: closeButtonText =
		stopStatus === '' || stopStatus === 'disabled'
			? 'INITIATE STOP'
			: stopStatus === 'pending'
			? 'CANCEL STOP'
			: 'CONFIRM STOP';

	$: amendRateButtonText =
		rateStatus === ''
			? 'INITIATE RATE AMEND'
			: rateStatus === 'pending'
			? 'CANCEL RATE AMEND'
			: 'CONFIRM RATE AMEND';
</script>

<tr class="main-row hover:bg-base-200">
	<td class={tableCellClasses.row}>
		<NameWithAddress {name} {address} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="w-4">
					<div class="copy-icon cursor-pointer">
						<ImageColored src={staticImages.CopyGrey} alt="Copy" variant={'grey'} />
					</div>
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</td>
	<td class={tableCellClasses.rowNormal}>
		<div class="flex items-center gap-2 justify-center">
			<button
				class={`${refreshLoading ? 'animate-spin' : ''} flex items-center`}
				on:click={() => refreshJobStatus(id)}
			>
				<Icon data={refresh} size={12} />
			</button>
			{ip ?? 'N/A'}
		</div>
	</td>
	<td class={tableCellClasses.rowNormal}>
		{instance ?? 'N/A'}
	</td>
	<td class={tableCellClasses.rowNormal}>
		{region ?? 'N/A'}
	</td>
	<td class={tableCellClasses.rowNormal}>
		<Tooltip
			tooltipText={`${symbol}${convertRateToPerHourString(downScaledRate, decimal, precision)}`}
		>
			{symbol}{convertRateToPerHourString(downScaledRate, decimal)}
		</Tooltip>
	</td>
	<td class={tableCellClasses.rowNormal}>
		<Tooltip tooltipText={`${symbol}${bigNumberToString(balance, decimal, precision)}`}>
			{symbol}{bigNumberToString(balance, decimal)}
		</Tooltip>
	</td>
	<td class={tableCellClasses.rowNormal}>
		<Timer timerId={`timer-for-inventory-table-row-${id}`} {endEpochTime}>
			<div slot="active" let:timer class="mx-auto">
				<Tooltip tooltipText={epochToDurationString(timer)} tooltipDirection="tooltip-left">
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
	</td>
	<td class={tableCellClasses.rowNormal}>
		<CollapseButton
			styleClass="mr-6"
			{isOpen}
			onclick={() => {
				toggleRowExpansion(id.toString());
			}}
		/>
	</td>
</tr>
<tr class="expanded-row">
	{#if isOpen}
		<td colspan="12">
			<div transition:slide={{ duration: 400 }} class="flex gap-4 mt-4 mb-8 px-8">
				{#if !isJobFinished}
					<ModalButton
						variant="filled"
						size="small"
						icon={plus}
						modalFor={`job-add-funds-modal-${id}`}
						disabled={isJobFinished}
					>
						ADD FUNDS
					</ModalButton>
					<ModalButton
						variant="outlined"
						size="small"
						modalFor={`job-stop-modal-${id}`}
						disabled={isJobFinished}
					>
						{closeButtonText}
					</ModalButton>
					<ModalButton
						variant="outlined"
						size="small"
						modalFor={`job-withdraw-fund-modal-${id}`}
						disabled={isJobFinished}
					>
						WITHDRAW
					</ModalButton>
					<ModalButton
						variant="outlined"
						size="small"
						modalFor={`job-amend-rate-modal-${id}`}
						disabled={isJobFinished}
					>
						{amendRateButtonText}
					</ModalButton>
				{/if}
				<ModalButton variant="outlined" size="small" modalFor={`job-details-modal-${id}`}>
					DETAILS
				</ModalButton>
			</div>
		</td>
	{/if}
</tr>

<InventoryJobDetailsModal bind:jobData={rowData} modalFor={`job-details-modal-${id}`} />
<AddFundsToJobModal bind:jobData={rowData} modalFor={`job-add-funds-modal-${id}`} />
<WithdrawFundsFromJobModal bind:jobData={rowData} modalFor={`job-withdraw-fund-modal-${id}`} />
<StopJobModal bind:jobData={rowData} modalFor={`job-stop-modal-${id}`} />
<AmendRateModal bind:jobData={rowData} modalFor={`job-amend-rate-modal-${id}`} />

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
