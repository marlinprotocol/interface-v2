<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import InputCard from '$lib/atoms/v2/cards/InputCard.svelte';
	import Modal from '$lib/atoms/v2/modals/Modal.svelte';
	import Text from '$lib/atoms/v2/texts/Text.svelte';
	import Timer from '$lib/atoms/v2/timer/Timer.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/v2/inputs/AmountInputWithTitle.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import {
		convertHourlyRateToSecondlyRate,
		convertRateToPerHourString,
		epochToDurationString,
		stringToBigNumber
	} from '$lib/utils/helpers/conversionHelper';
	import { closeModal, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		handleCreditJobRateReviseCancel,
		handleFinaliseCreditJobRateRevise,
		handleFinaliseJobRateRevise,
		handleInitiateCreditJobRateRevise,
		handleInitiateJobRateRevise,
		handleJobRateReviseCancel
	} from '$lib/utils/services/oysterServices';
	import { oysterRateMetadataStore, oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	// initial states
	let inputRate = 0n;
	let inputAmountString = '';
	// loading states
	let submitLoading = false;
	let cancelLoading = false;
	// error state
	let showPrecisionError = false;

	const handleInitiateClick = async () => {
		submitLoading = true;
		if (isCreditJob) {
			await handleInitiateCreditJobRateRevise(
				jobData,
				inputRate,
				$oysterRateMetadataStore.rateReviseWaitingTime
			);
		} else {
			await handleInitiateJobRateRevise(
				jobData,
				inputRate,
				$oysterRateMetadataStore.rateReviseWaitingTime
			);
		}
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleConfirmClick = async () => {
		submitLoading = true;
		if (isCreditJob) {
			await handleFinaliseCreditJobRateRevise(jobData, newRate);
		} else {
			await handleFinaliseJobRateRevise(jobData, newRate);
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

	const onClose = () => {
		inputAmountString = '';
	};

	$: ({
		rate,
		reviseRate: { newRate = 0n, updatesAt = 0, rateStatus = '' } = {},
		isCreditJob
	} = jobData);
	$: modalTitle =
		rateStatus === ''
			? 'Initiate Rate Revise'
			: rateStatus === 'completed'
				? 'Confirm Rate Revise'
				: 'Initiate Rate Revise';
	$: inputRate = isInputAmountValid(inputAmountString)
		? convertHourlyRateToSecondlyRate(
				stringToBigNumber(inputAmountString, $oysterTokenMetadataStore.decimal) *
					$oysterRateMetadataStore.oysterRateScalingFactor
			)
		: 0n;
	$: submitButtonText = rateStatus === '' ? 'Initiate rate revise' : 'Confirm rate revise';
	$: submitButtonAction = rateStatus === '' ? handleInitiateClick : handleConfirmClick;
	$: currentHourlyRate = convertRateToPerHourString(rate, $oysterTokenMetadataStore.decimal);
	$: newHRlessThancurrentHR = inputAmountString !== '' && currentHourlyRate > inputAmountString;
	$: submitEnable =
		(inputRate > 0n || newRate > 0n) &&
		!showPrecisionError &&
		isInputAmountValid(inputAmountString) &&
		!(inputRate === rate) &&
		rateStatus !== 'pending';
</script>

<Modal {modalFor} {onClose}>
	<svelte:fragment slot="title">
		{modalTitle}
	</svelte:fragment>

	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4">
			<div class="flex gap-4">
				<AmountInputWithTitle
					title="Current hourly rate"
					inputAmountString={currentHourlyRate}
					disabled
					prefix={$oysterTokenMetadataStore.symbol}
				/>
				{#if rateStatus === ''}
					<AmountInputWithTitle
						title="New hourly rate"
						bind:inputAmountString
						prefix={$oysterTokenMetadataStore.symbol}
					/>
				{:else}
					<AmountInputWithTitle
						title="New hourly rate"
						inputAmountString={convertRateToPerHourString(
							(newRate + ($oysterRateMetadataStore.oysterRateScalingFactor - BigInt(1))) /
								$oysterRateMetadataStore.oysterRateScalingFactor,
							$oysterTokenMetadataStore.decimal
						)}
						prefix={$oysterTokenMetadataStore.symbol}
						disabled
					/>
				{/if}
			</div>
			{#if rateStatus === 'pending'}
				<div class="w-full">
					<Timer
						timerId="timer-for-{modalFor}"
						endEpochTime={updatesAt}
						onTimerEnd={() => (submitEnable = true)}
					>
						<div slot="active" let:timer class="w-full">
							<InputCard variant="warning">
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
		</div>

		<ErrorTextCard
			styleClass="mt-4"
			showError={newHRlessThancurrentHR || showPrecisionError}
			errorMessage={newHRlessThancurrentHR
				? 'Rate revision is less than the current hourly rate'
				: 'Please change the rate by a minimum of 0.001 USDC'}
		/>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="flex gap-4">
			{#if rateStatus !== ''}
				<div class="w-full">
					<Button
						variant="outlined"
						loading={cancelLoading}
						onclick={handleCancelInitiate}
						size="large"
						styleClass="btn-block w-full my-0"
					>
						Cancel
					</Button>
				</div>
			{/if}
			<div class="w-full">
				<Button
					variant="filled"
					disabled={!submitEnable}
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
