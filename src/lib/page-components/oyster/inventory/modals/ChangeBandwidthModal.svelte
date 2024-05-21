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
	import {
		handleFinaliseCreditJobRateRevise,
		handleFinaliseJobRateRevise
	} from '$lib/utils/services/oysterServices';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	const nowTime = new Date().getTime() / 1000;

	const TEXT = `Increasing the bandwidth reduces the total duration of the instance. Add more funds to increase the duration whereas reducing the bandwidth increases the total duration of the instance.`;

	let newBandwidth = '';
	let checkboxAcknowledge = false;

	const onClose = () => {};

	$: ({
		provider: { address },
		reviseRate: { newRate = 0n, updatesAt = 0, rateStatus = '' } = {},
		instance,
		region,
		rateScaled,
		totalDeposit,
		amountUsed,
		endEpochTime,
		rate,
		isCreditJob
	} = jobData);

	$: instanceRate = getRateForProviderAndFilters(
		address,
		instance,
		region,
		$oysterStore.allMarketplaceData
	);

	$: bandwidthRate = instanceRate !== undefined ? rateScaled - instanceRate : 0n;
	$: bandwidth = getBandwidthFromRateAndRegion(bandwidthRate, region).toString();
	const bandwidthUnitList = OYSTER_BANDWIDTH_UNITS_LIST.map((unit) => unit.label);
	let currentBandwidthUnit = DEFAULT_BANDWIDTH_UNIT;
	let newBandwidthUnit = DEFAULT_BANDWIDTH_UNIT;

	$: newBandwidthRate = calculatBandwidthRate(newBandwidth, region, newBandwidthUnit);

	// new and current hourly rate
	$: currentHourlyRate = convertRateToPerHourString(rate, $oysterTokenMetadataStore.decimal);
	$: newHourlyRate =
		(newBandwidthRate + (instanceRate || 0n)) / $oysterRateMetadataStore.oysterRateScalingFactor;
	$: newHourlyRateString = newBandwidth
		? convertRateToPerHourString(
				(newBandwidthRate + (instanceRate || 0n)) /
					$oysterRateMetadataStore.oysterRateScalingFactor,
				$oysterTokenMetadataStore.decimal
			)
		: '';

	$: balanceLeft = totalDeposit - amountUsed;
	$: newDuration = Number(balanceLeft / (newHourlyRate || 1n));
	$: newDurationString = newBandwidth ? epochToDurationString(newDuration) : '';

	// UI
	let submitLoading = false;
	$: btnText = rateStatus === '' ? 'Initiate' : 'Confirm';

	let onSubmit = async () => {
		submitLoading = true;

		if (isCreditJob) {
			await handleFinaliseCreditJobRateRevise(jobData, newHourlyRate);
		} else {
			await handleFinaliseJobRateRevise(jobData, newHourlyRate);
		}
		btnText = 'Confirm';
		closeModal(modalFor);
		submitLoading = false;
	};
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
							dataList={bandwidthUnitList}
							bind:value={currentBandwidthUnit}
							showLabel
							disabled
						/>
					</div>
				</AmountInputWithTitle>
				<AmountInputWithTitle
					title="Current Total Rate"
					bind:inputAmountString={currentHourlyRate}
					suffix={Boolean(isCreditJob) ? 'CREDIT' : $oysterTokenMetadataStore.currency}
					disabled={true}
				/>
				<AmountInputWithTitle
					title="Duration Left"
					inputAmountString={nowTime > endEpochTime
						? 'Ended'
						: epochToDurationString(endEpochTime - nowTime, true)}
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
							dataList={bandwidthUnitList}
							bind:value={newBandwidthUnit}
							showLabel
							disabled={btnText === 'Confirm'}
						/>
					</div>
				</AmountInputWithTitle>

				<AmountInputWithTitle
					title="New Total Rate"
					bind:inputAmountString={newHourlyRateString}
					suffix={Boolean(isCreditJob) ? 'CREDIT' : $oysterTokenMetadataStore.currency}
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
