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
		DEFAULT_OYSTER_DURATION_UNIT,
		OYSTER_BANDWIDTH_UNITS_LIST,
		OYSTER_DURATION_UNITS_LIST
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToString, epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import {
		getBandwidthRateForRegion,
		getInstanceMetadatDataForOperator
	} from '$lib/utils/data-modifiers/oysterModifiers';
	import {
		computeCost,
		getBandwidthFromRateAndRegion,
		getRateForProviderAndFilters
	} from '$lib/utils/helpers/oysterHelpers';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	const nowTime = new Date().getTime() / 1000;
	let currentFinalBandwidthRateScaled = 0n;
	const INC_BANDWIDTH_TEXT = `Increasing the bandwidth reduces the total duration of the instance. Add more funds to
						increase the duration.`;
	const DEC_BANDWIDTH_TEXT = `Reducing the bandwidth increases the total duration of the instance.`;

	// initial states

	let newBandwidth = '';
	let checkboxAcknowledge = false;

	// loading states
	// error state

	const onClose = () => {};

	$: ({
		provider: { address },
		instance,
		region,
		rateScaled,
		totalDeposit,
		amountUsed,
		endEpochTime,

		durationLeft,
		durationRun
	} = jobData);

	$: instanceRate = getRateForProviderAndFilters(
		address,
		instance,
		region,
		$oysterStore.allMarketplaceData
	);
	$: bandwidthRate = instanceRate !== undefined ? rateScaled - instanceRate : 0n;
	// $: bandwidth = getBandwidthFromRateAndRegion(bandwidthRate, region).toString() + 'KB/s';
	$: bandwidth = getBandwidthFromRateAndRegion(bandwidthRate, region).toString();

	const bandwidthUnitList = OYSTER_BANDWIDTH_UNITS_LIST.map((unit) => unit.label);
	let currentBandwidthUnit = DEFAULT_BANDWIDTH_UNIT;
	let newBandwidthUnit = DEFAULT_BANDWIDTH_UNIT;
	let durationUnit = DEFAULT_OYSTER_DURATION_UNIT;
	const durationUnitList = OYSTER_DURATION_UNITS_LIST.map((unit) => unit.label);

	$: checkboxLabel =
		parseInt(bandwidth || '0') > parseInt(newBandwidth || '0')
			? DEC_BANDWIDTH_TEXT
			: INC_BANDWIDTH_TEXT;
	// $: totalPaid = bigNumberToString(totalDeposit, $oysterTokenMetadataStore.decimal);
	// $: amountUsedNum = bigNumberToString(amountUsed, $oysterTokenMetadataStore.decimal);
	$: balanceLeft = totalDeposit - amountUsed;

	$: updatedBalance = '';
	$: updatedDuration = '';

	function calculateBandwidthCost(
		bandwidth: string | number,
		bandwidthUnit: string,
		bandwidthRateForRegionScaled: bigint,
		duration: number // in seconds
	) {
		const unitConversionDivisor = BigInt(
			OYSTER_BANDWIDTH_UNITS_LIST.find((unit) => unit.label === bandwidthUnit)?.value ?? 1
		);
		currentFinalBandwidthRateScaled =
			(BigInt(bandwidth) * bandwidthRateForRegionScaled) / (unitConversionDivisor || BigInt(1));
		return currentFinalBandwidthRateScaled * BigInt(duration);
	}
	// region and instance is same for both
	$: bandwidthRateForRegionScaled = getBandwidthRateForRegion(region);
	$: instanceCostScaled = computeCost(durationLeft || 0, instanceRate);

	$: bandwidthCostScaled =
		bandwidth !== ''
			? calculateBandwidthCost(
					bandwidth,
					currentBandwidthUnit,
					bandwidthRateForRegionScaled,
					durationLeft
				)
			: 0n;
	$: bandwidthCostString =
		bandwidth !== ''
			? bigNumberToString(
					bandwidthCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
					$oysterTokenMetadataStore.decimal,
					4
				)
			: '';
	// totaldeposit = totalCostScaled
	$: totalCostScaled = bandwidthCostScaled + instanceCostScaled;
	// $: total -> bcs = totalDeposit - instanceCostScaled;
	$: totalCost = totalCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor;
	$: totalAmountString = !(totalCost === 0n)
		? bigNumberToString(totalCost, $oysterTokenMetadataStore.decimal, 4)
		: '';
	// make bandwidth cost to total cost. TODO:

	// new calc
	$: newBandwidthCostScaled =
		newBandwidth !== ''
			? calculateBandwidthCost(
					newBandwidth,
					newBandwidthUnit,
					bandwidthRateForRegionScaled,
					durationLeft
				)
			: 0n;
	$: newBandwidthCostString =
		newBandwidth !== ''
			? bigNumberToString(
					newBandwidthCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
					$oysterTokenMetadataStore.decimal,
					4
				)
			: '';

	$: newTotalCostScaled = newBandwidthCostScaled + instanceCostScaled;
	$: newTotalCost = newTotalCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor;
	$: newTotalAmountString =
		!(newTotalCost === 0n) && !(newBandwidth === '')
			? bigNumberToString(newTotalCost, $oysterTokenMetadataStore.decimal, 4)
			: '';
	$: newDuration = balanceLeft / (newTotalCost || totalCost);
	$: newDurationString = epochToDurationString(Number(newDuration));

	$: if (address === '0xf2f8ccc2294748729d3d609c329a3f2c83517ad5') {
		console.log({
			newDurationString: epochToDurationString(Number(newDuration)),
			// totalCost,
			// balanceLeft,
			newDuration
			// newTotalCost,
			// a: balanceLeft / newTotalCost
		});
	}

	$: totalRate = (instanceRate || 0n) + bandwidthRateForRegionScaled;
	$: newD = (totalDeposit / totalRate).toString();
	$: console.log({ totalDeposit, totalRate, Durr: totalDeposit / totalRate });
	// on approve =  handleApproveFundForOysterJob
	// hide error. opacity
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
					title="Current Total Cost"
					bind:inputAmountString={totalAmountString}
					suffix={$oysterTokenMetadataStore.currency}
					disabled={true}
				/>
				<AmountInputWithTitle
					title="Duration Left"
					inputAmountString={nowTime > endEpochTime
						? 'Ended'
						: epochToDurationString(endEpochTime - nowTime, true)}
					suffix={durationUnit}
					disabled={true}
				/>
			</div>
			<div class="flex flex-1 flex-col gap-4">
				<AmountInputWithTitle
					title="New Bandwidth"
					bind:inputAmountString={newBandwidth}
					onlyInteger
				>
					<div slot="endButton">
						<Select
							title="Bandwidth"
							dataList={bandwidthUnitList}
							bind:value={newBandwidthUnit}
							showLabel
						/>
					</div>
				</AmountInputWithTitle>
				<!-- bind:inputAmountString={updatedBalance} -->
				<AmountInputWithTitle
					title="New Total Cost"
					bind:inputAmountString={newTotalAmountString}
					suffix={$oysterTokenMetadataStore.currency}
					disabled
				/>
				<AmountInputWithTitle
					title="Duration Left"
					bind:inputAmountString={newD}
					suffix={durationUnit}
					disabled
				/>
			</div>
		</div>
		{#if newBandwidth !== '' && newBandwidth !== bandwidth}
			<div class="flex items-center justify-between">
				<div class="form-control">
					<label class="label cursor-pointer">
						<input
							bind:checked={checkboxAcknowledge}
							type="checkbox"
							class="checkbox-primary checkbox checkbox-md"
						/>
						<span class="label-text ml-3 whitespace-normal text-left"> {checkboxLabel} </span>
					</label>
				</div>
			</div>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="flex gap-4">
			<div class="w-full">
				<Button
					disabled={newBandwidth === '' || (newBandwidth !== bandwidth && !checkboxAcknowledge)}
					variant="filled"
					size="large"
					styleClass="btn-block w-full my-0">Approve</Button
				>
			</div>
		</div>
	</svelte:fragment>
</Modal>
