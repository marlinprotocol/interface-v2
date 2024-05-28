<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { slide } from 'svelte/transition';
	import AddFundsToJobModal from './modals/AddFundsToJobModal.svelte';
	import AmendRateModal from './modals/AmendRateModal.svelte';
	import JobDetailsModal from './modals/JobDetailsModal.svelte';
	import StopJobModal from './modals/StopJobModal.svelte';
	import WithdrawFundsFromJobModal from './modals/WithdrawFundsFromJobModal.svelte';
	import ChangeBandwidthModal from './modals/ChangeBandwidthModal.svelte';

	export let rowData: OysterInventoryDataModel;
	export let expandedRows: Set<string>;

	$: ({
		id,
		endEpochTime, // epoch time in seconds based on duration left,
		// newRateScaled is being passed to the modal for the amend rate modal and is not used here
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		reviseRate: { newRateScaled = null, rateStatus = '', stopStatus = '' } = {}
	} = rowData);

	$: isJobFinished = !(Math.floor(endEpochTime - Date.now() / 1000) > 0);
	$: isOpen = expandedRows.has(id.toString());
	$: closeButtonText =
		stopStatus === '' || stopStatus === 'disabled'
			? 'Initiate stop'
			: stopStatus === 'pending'
				? 'Cancel stop'
				: 'Confirm stop';
</script>

{#if isOpen}
	<td colspan="12">
		<div transition:slide={{ duration: 400 }} class="mb-8 mt-4 flex gap-4 px-8">
			{#if !isJobFinished}
				<ModalButton
					variant="filled"
					size="small"
					modalFor="job-add-funds-modal-{id}"
					disabled={isJobFinished}
					styleClass="font-normal"
				>
					Add funds
				</ModalButton>
				<ModalButton
					variant="outlined"
					size="small"
					modalFor="job-stop-modal-{id}"
					disabled={isJobFinished}
				>
					{closeButtonText}
				</ModalButton>
				<ModalButton
					variant="outlined"
					size="small"
					modalFor="change-bandwidth-modal-{id}"
					disabled={isJobFinished}
				>
					Change Bandwidth
				</ModalButton>
				<ModalButton
					variant="outlined"
					size="small"
					modalFor="job-withdraw-fund-modal-{id}"
					disabled={isJobFinished}
				>
					Withdraw
				</ModalButton>
			{/if}
			<ModalButton variant="outlined" size="small" modalFor="job-details-modal-{id}">
				Details
			</ModalButton>
		</div>
	</td>
{/if}

<JobDetailsModal bind:jobData={rowData} modalFor="job-details-modal-{id}" />
<AddFundsToJobModal bind:jobData={rowData} modalFor="job-add-funds-modal-{id}" />
<WithdrawFundsFromJobModal bind:jobData={rowData} modalFor="job-withdraw-fund-modal-{id}" />
<StopJobModal bind:jobData={rowData} modalFor="job-stop-modal-{id}" />
<AmendRateModal bind:jobData={rowData} modalFor="job-amend-rate-modal-{id}" />
<ChangeBandwidthModal bind:jobData={rowData} modalFor="change-bandwidth-modal-{id}" />
