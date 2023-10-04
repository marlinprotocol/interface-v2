<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import {
		convertHourlyRateToSecondlyRate,
		convertRateToPerHourString,
		epochToDurationString,
		stringToBigNumber
	} from '$lib/utils/helpers/conversionHelper';
	import { bigIntAbs, closeModal, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		handleCancelRateRevise,
		handleFinaliseRateRevise,
		handleInitiateRateRevise
	} from '$lib/utils/services/oysterServices';
	import { oysterRateMetadataStore, oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	$: ({ rate, reviseRate: { newRate = 0n, updatesAt = 0, rateStatus = '' } = {} } = jobData);

	//initial states
	let inputRate = 0n;
	let inputAmountString = '';

	let submitLoading = false;
	let cancelLoading = false;
	let showPrecisionError = false;

	const handleInitiateClick = async () => {
		submitLoading = true;
		await handleInitiateRateRevise(
			jobData,
			inputRate,
			$oysterRateMetadataStore.rateReviseWaitingTime
		);
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleConfirmClick = async () => {
		submitLoading = true;
		await handleFinaliseRateRevise(jobData, newRate);
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleCancelInitiate = async () => {
		cancelLoading = true;
		await handleCancelRateRevise(jobData);
		cancelLoading = false;
		closeModal(modalFor);
	};

	const onFocusOut = () => {
		if (inputAmountString !== '' && difference < 3600n && inputRate >= rate) {
			showPrecisionError = true;
		} else {
			showPrecisionError = false;
		}
	};

	$: modalTitle =
		rateStatus === ''
			? 'INITIATE RATE REVISE'
			: rateStatus === 'completed'
			? 'CONFIRM RATE REVISE'
			: 'INITIATED RATE REVISE';
	$: inputRate = isInputAmountValid(inputAmountString)
		? convertHourlyRateToSecondlyRate(
				stringToBigNumber(inputAmountString, $oysterTokenMetadataStore.decimal) *
					$oysterRateMetadataStore.oysterRateScalingFactor
		  )
		: 0n;
	$: difference = bigIntAbs(rate - inputRate);
	$: submitButtonText = rateStatus === '' ? 'INITIATE RATE REVISE' : 'CONFIRM RATE REVISE';
	$: submitButtonAction = rateStatus === '' ? handleInitiateClick : handleConfirmClick;
	$: submitEnable =
		(inputRate > 0n || newRate > 0n) &&
		!showPrecisionError &&
		isInputAmountValid(inputAmountString) &&
		!(inputRate === rate) &&
		rateStatus !== 'pending';
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{modalTitle}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{"You're about to revise the hourly rate for this job."}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4">
			<div class="flex gap-4">
				<AmountInputWithTitle
					title={`Current Hourly Rate`}
					inputAmountString={convertRateToPerHourString(rate, $oysterTokenMetadataStore.decimal)}
					disabled
					prefix={$oysterTokenMetadataStore.symbol}
				/>
				{#if rateStatus === ''}
					<AmountInputWithTitle
						title="New Hourly Rate"
						bind:inputAmountString
						prefix={$oysterTokenMetadataStore.symbol}
						{onFocusOut}
					/>
				{:else}
					<AmountInputWithTitle
						title="New Hourly Rate"
						inputAmountString={convertRateToPerHourString(
							newRate +
								($oysterRateMetadataStore.oysterRateScalingFactor - BigInt(1)) /
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
						timerId={`timer-for-${modalFor}`}
						endEpochTime={updatesAt}
						onTimerEnd={() => (submitEnable = true)}
					>
						<div slot="active" let:timer class="w-full">
							<InputCard variant="warning">
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
		</div>
		<ErrorTextCard
			styleClass={'mt-4'}
			showError={showPrecisionError}
			errorMessage={'Please change the rate by a minimum of 0.001 USDC'}
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
						styleClass={'btn-block w-full my-0'}
					>
						{'CANCEL'}
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
					styleClass={'btn-block w-full my-0'}
				>
					{submitButtonText}
				</Button>
			</div>
		</div>
	</svelte:fragment>
</Modal>
