<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Modal from '$lib/atoms/v2/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import {
		handleCreditJobRateReviseCancel,
		handleCreditJobStopConfirm,
		handleInitiateCreditJobRateRevise,
		handleInitiateJobRateRevise,
		handleJobRateReviseCancel,
		handleJobStatusOnStopTimerEnd,
		handleJobStopConfirm
	} from '$lib/utils/services/oysterServices';
	import StopModalContent from '$lib/page-components/v2/oyster/sub-components/StopModalContent.svelte';
	import { oysterRateMetadataStore } from '$lib/data-stores/oysterStore';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	let submitLoading = false;
	let cancelLoading = false;

	const handleInitiateClick = async () => {
		submitLoading = true;
		if (isCreditJob) {
			await handleInitiateCreditJobRateRevise(
				jobData,
				0n,
				$oysterRateMetadataStore.rateReviseWaitingTime
			);
		} else {
			await handleInitiateJobRateRevise(
				jobData,
				0n,
				$oysterRateMetadataStore.rateReviseWaitingTime
			);
		}
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleConfirmClick = async () => {
		submitLoading = true;
		if (isCreditJob) {
			await handleCreditJobStopConfirm(jobData);
		} else {
			await handleJobStopConfirm(jobData);
		}
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleCancelInitiate = async () => {
		cancelLoading = true;

		if (isCreditJob) {
			await handleCreditJobRateReviseCancel(jobData);
		} else {
			await handleJobRateReviseCancel(jobData);
		}
		cancelLoading = false;
		closeModal(modalFor);
	};

	const handleOnTimerEnd = async () => {
		submitButtonDisabled = false;
		handleJobStatusOnStopTimerEnd(jobData);
	};

	$: ({ reviseRate: { stopStatus = '', updatesAt = 0 } = {}, isCreditJob } = jobData);
	$: modalTitle =
		stopStatus === '' || stopStatus === 'disabled'
			? 'Initiate Stop'
			: stopStatus === 'completed'
				? 'Confirm Stop'
				: 'Initiated Stop';
	$: submitButtonText =
		stopStatus === '' || stopStatus === 'disabled' ? 'INITIATE STOP' : 'CONFIRM';
	$: submitButtonAction =
		stopStatus === '' || stopStatus === 'disabled' ? handleInitiateClick : handleConfirmClick;
	$: submitButtonDisabled = stopStatus === 'pending' || stopStatus === 'disabled';
</script>

<Modal {modalFor} modalWidth="w-11/12 sm:max-w-[700px]">
	<svelte:fragment slot="title">
		{modalTitle}
	</svelte:fragment>
	<!-- <svelte:fragment slot="subtitle">You can stop your job here</svelte:fragment> -->
	<svelte:fragment slot="content">
		<StopModalContent {jobData} />
		{#if stopStatus === 'pending'}
			<div class="w-full">
				<Timer
					timerId="timer-for-{modalFor}"
					endEpochTime={updatesAt}
					onTimerEnd={() => handleOnTimerEnd()}
				>
					<div slot="active" let:timer class="w-full">
						<InputCard variant="warning" styleClass="mt-4">
							<Text
								styleClass="py-2"
								text="Time left to confirm: {epochToDurationString(timer)}"
								variant="small"
							/>
						</InputCard>
					</div>
				</Timer>
			</div>
		{/if}
		{#if stopStatus === 'disabled'}
			<InputCard variant="warning" styleClass="mt-4">
				<Text
					styleClass="py-2"
					text="A non zero rate revision has been initiated. Please wait for it to be confirmed or cancel it using CANCEL RATE AMEND button."
					variant="small"
				/>
			</InputCard>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="flex gap-4">
			{#if stopStatus === 'pending' || stopStatus === 'completed'}
				<div class="w-full">
					<Button
						variant="outlined"
						loading={cancelLoading}
						onclick={handleCancelInitiate}
						size="large"
						styleClass="btn-block w-full my-0"
					>
						CANCEL
					</Button>
				</div>
			{/if}
			<div class="w-full">
				<Button
					variant="filled"
					disabled={submitButtonDisabled}
					loading={submitLoading}
					onclick={submitButtonAction}
					size="large"
					styleClass="btn-block w-full my-0"
				>
					{submitButtonText}
				</Button>
			</div>
		</div>
	</svelte:fragment>
</Modal>
