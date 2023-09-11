<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import {
		handleCancelRateRevise,
		handleConfirmJobStop,
		handleInitiateRateRevise,
		handleJobStatusOnStopTimerEnd
	} from '$lib/utils/services/oysterServices';
	import StopModalContent from '$lib/page-components/oyster/sub-components/StopModalContent.svelte';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	$: ({ reviseRate: { stopStatus = '', updatesAt = 0 } = {} } = jobData);

	let submitLoading = false;
	let cancelLoading = false;

	const handleInitiateClick = async () => {
		submitLoading = true;
		await handleInitiateRateRevise(jobData, 0n);
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleConfirmClick = async () => {
		submitLoading = true;
		await handleConfirmJobStop(jobData);
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleCancelInitiate = async () => {
		cancelLoading = true;
		await handleCancelRateRevise(jobData);
		cancelLoading = false;
		closeModal(modalFor);
	};

	const handleOnTimerEnd = async () => {
		submitButtonDisabled = false;
		handleJobStatusOnStopTimerEnd(jobData);
	};

	$: modalTitle =
		stopStatus === '' || stopStatus === 'disabled'
			? 'INITIATE STOP'
			: stopStatus === 'completed'
			? 'CONFIRM STOP'
			: 'INITIATED STOP';

	$: submitButtonText =
		stopStatus === '' || stopStatus === 'disabled' ? 'INITIATE STOP' : 'CONFIRM';
	$: submitButtonAction =
		stopStatus === '' || stopStatus === 'disabled' ? handleInitiateClick : handleConfirmClick;
	$: submitButtonDisabled = stopStatus === 'pending' || stopStatus === 'disabled';
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{modalTitle}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">{'You can stop your job here'}</svelte:fragment>
	<svelte:fragment slot="content">
		<StopModalContent {jobData} />
		{#if stopStatus === 'pending'}
			<div class="w-full">
				<Timer
					timerId={`timer-for-${modalFor}`}
					endEpochTime={updatesAt}
					onTimerEnd={() => handleOnTimerEnd()}
				>
					<div slot="active" let:timer class="w-full">
						<InputCard variant="warning" styleClass="mt-4">
							<Text
								styleClass={'py-2'}
								text={`Time left to confirm: ${epochToDurationString(timer)}`}
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
					styleClass={'py-2'}
					text={'A non zero rate revision has been initiated. Please wait for it to complete and confirmed or cancel it using CANCEL RATE AMEND button.'}
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
						styleClass={'btn-block w-full my-0'}
					>
						{'CANCEL'}
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
					styleClass={'btn-block w-full my-0'}
				>
					{submitButtonText}
				</Button>
			</div>
		</div>
	</svelte:fragment>
</Modal>
