<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import {
		oysterRateMetadataStore,
		oysterStore,
		oysterTokenMetadataStore
	} from '$lib/data-stores/oysterStore';
	import {
		handleFinaliseCreditJobRateRevise,
		handleFinaliseJobRateRevise,
		handleInitiateCreditJobRateRevise,
		handleInitiateJobRateRevise
	} from '$lib/utils/services/oysterServices';
	import Select from '$lib/components/select/Select.svelte';
	import {
		DEFAULT_BANDWIDTH_UNIT,
		OYSTER_BANDWIDTH_UNITS_LIST
	} from '$lib/utils/constants/oysterConstants';
	import {
		convertRateToPerHourString,
		epochToDurationString
	} from '$lib/utils/helpers/conversionHelper';
	import {
		calculatBandwidthRate,
		getBandwidthFromRateAndRegion,
		getRateForProviderAndFilters
	} from '$lib/utils/helpers/oysterHelpers';
	import { closeModal, cn } from '$lib/utils/helpers/commonHelper';

	import Timer from '$lib/atoms/timer/Timer.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	let checkboxAcknowledge = false;
	let currentBandwidthUnit = DEFAULT_BANDWIDTH_UNIT;
	let newBandwidthUnit = DEFAULT_BANDWIDTH_UNIT;
	let submitLoading = false;

	const onClose = () => {};
	const BANDWIDTH_UNIT_LIST = OYSTER_BANDWIDTH_UNITS_LIST.map((unit) => unit.label);
	const TEXT = `Increasing the bandwidth reduces the total duration of the instance. Add more funds to increase the duration whereas reducing the bandwidth increases the total duration of the instance.`;
	const nowTime = new Date().getTime() / 1000;

	let onConfirm = async () => {
		submitLoading = true;

		if (isCreditJob) {
			await handleFinaliseCreditJobRateRevise(jobData, newHourlyRateScaled);
		} else {
			await handleFinaliseJobRateRevise(jobData, newHourlyRateScaled);
		}
		closeModal(modalFor);
		submitLoading = false;
	};

	let onInit = async () => {
		submitLoading = true;
		if (isCreditJob) {
			await handleInitiateCreditJobRateRevise(
				jobData,
				newHourlyRateScaled,
				$oysterRateMetadataStore.rateReviseWaitingTime
			);
		} else {
			await handleInitiateJobRateRevise(
				jobData,
				newHourlyRateScaled,
				$oysterRateMetadataStore.rateReviseWaitingTime
			);
		}
		btnText = 'Confirm';
		closeModal(modalFor);
		submitLoading = false;
	};

	let onSubmit = () => {
		if (btnText === 'Initiate') {
			onInit();
		} else {
			onConfirm();
		}
	};

	$: ({
		provider: { address },
		reviseRate: { newRateScaled = 0n, updatesAt = 0, rateStatus = '' } = {},
		instance,
		region,
		rateScaled,
		totalDeposit,
		amountUsed,
		endEpochTime,
		rate,
		isCreditJob
	} = jobData);

	$: isRateRevisionInitiated = rateStatus === 'completed' || rateStatus === 'pending';

	$: instanceRateScaled = getRateForProviderAndFilters(
		address,
		instance,
		region,
		$oysterStore.allMarketplaceData
	);

	$: bandwidthRateScaled = instanceRateScaled !== undefined ? rateScaled - instanceRateScaled : 0n;
	$: bandwidth = getBandwidthFromRateAndRegion(bandwidthRateScaled, region).toString();

	$: newBandwidthRateAfterInit =
		rateStatus !== '' && instanceRateScaled !== undefined ? newRateScaled - instanceRateScaled : 0n;

	$: newBandwidthAfterInit = getBandwidthFromRateAndRegion(
		newBandwidthRateAfterInit,
		region
	).toString();

	$: newBandwidth = isRateRevisionInitiated ? newBandwidthAfterInit : '';
	$: newBandwidthRate = calculatBandwidthRate(newBandwidth, region, newBandwidthUnit);
	// new and current hourly rate
	$: currentHourlyRate = convertRateToPerHourString(rate, $oysterTokenMetadataStore.decimal);

	$: newHourlyRateScaled = newBandwidthRate + (instanceRateScaled || 0n);
	$: newHourlyRateString = newBandwidth
		? convertRateToPerHourString(
				newHourlyRateScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
				$oysterTokenMetadataStore.decimal
			)
		: '';

	$: balanceLeft = totalDeposit - amountUsed;

	$: currentDuration = Number(
		(balanceLeft * $oysterRateMetadataStore.oysterRateScalingFactor) / rateScaled
	);
	$: currentDurationString = epochToDurationString(currentDuration);
	$: newDuration =
		newBandwidthRate + (instanceRateScaled || 0n) !== 0n
			? Number(
					(balanceLeft * $oysterRateMetadataStore.oysterRateScalingFactor) / newHourlyRateScaled
				)
			: 0;
	$: newDurationString = newBandwidth ? epochToDurationString(newDuration) : '';
	// UI
	$: btnText = rateStatus === '' ? 'Initiate' : 'Confirm';
</script>

<Modal {modalFor} {onClose}>
	<svelte:fragment slot="title">Change Bandwidth</svelte:fragment>

	<svelte:fragment slot="content">
		<div class="flex flex-row justify-between gap-4">
			<div class="flex flex-1 flex-col gap-4">
				<AmountInputWithTitle
					disabled
					title="Bandwidth"
					bind:inputAmountString={bandwidth}
					onlyInteger
				>
					<div slot="endButton">
						<Select
							title="Bandwidth"
							dataList={BANDWIDTH_UNIT_LIST}
							bind:value={currentBandwidthUnit}
							showLabel
							disabled
						/>
					</div>
				</AmountInputWithTitle>
				<AmountInputWithTitle
					title="Current Total Rate"
					bind:inputAmountString={currentHourlyRate}
					suffix={isCreditJob ? 'CREDIT' : $oysterTokenMetadataStore.currency}
					disabled={true}
				/>
				<AmountInputWithTitle
					title="Duration Left"
					inputAmountString={nowTime > endEpochTime ? 'Ended' : currentDurationString}
					disabled={true}
				/>
			</div>
			<div class="flex flex-1 flex-col gap-4">
				<AmountInputWithTitle
					title="New Bandwidth"
					bind:inputAmountString={newBandwidth}
					onlyInteger
					disabled={btnText === 'Confirm'}
				>
					<div slot="endButton">
						<Select
							title="Bandwidth"
							dataList={BANDWIDTH_UNIT_LIST}
							bind:value={newBandwidthUnit}
							showLabel
							disabled={btnText === 'Confirm'}
						/>
					</div>
				</AmountInputWithTitle>

				<AmountInputWithTitle
					title="New Total Rate"
					bind:inputAmountString={newHourlyRateString}
					suffix={isCreditJob ? 'CREDIT' : $oysterTokenMetadataStore.currency}
					disabled
				/>

				<AmountInputWithTitle
					title="Duration Left"
					bind:inputAmountString={newDurationString}
					disabled
				/>
			</div>
		</div>
		<div class={cn('mt-2', 'visible opacity-100')}>
			<div class="form-control">
				<label class="label flex cursor-pointer items-start gap-3">
					<input
						bind:checked={checkboxAcknowledge}
						type="checkbox"
						class="checkbox-primary checkbox checkbox-md"
					/>
					<span class="label-text whitespace-normal text-left">
						{TEXT}
					</span>
				</label>
			</div>
		</div>
		{#if rateStatus === 'pending'}
			<div class="w-full">
				<Timer
					timerId="timer-for-{modalFor}"
					endEpochTime={updatesAt}
					onTimerEnd={() => (submitLoading = false)}
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
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="flex gap-4">
			<div class="w-full">
				<Button
					bind:onclick={onSubmit}
					disabled={newBandwidth === '' ||
						newBandwidth === bandwidth ||
						!checkboxAcknowledge ||
						submitLoading}
					variant="filled"
					size="large"
					styleClass="btn-block w-full my-0"
				>
					{btnText}
				</Button>
			</div>
		</div>
	</svelte:fragment>
</Modal>
