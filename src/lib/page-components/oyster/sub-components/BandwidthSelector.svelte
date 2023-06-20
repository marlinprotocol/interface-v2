<script lang="ts">
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import {
		RATE_SCALING_FACTOR,
		kBandwidthUnitsList,
		kOysterRateMetaData
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToString } from '$lib/utils/conversion';
	import { getBandwidthRateForRegion } from '$lib/utils/data-modifiers/oysterModifiers';
	import { BigNumber } from 'ethers';

	export let region: any;
	export let bandwidthRateForRegion = BigNumberZero;
	export let bandwidthCost = BigNumberZero;
	export let duration = 0;
	export let instanceCost = BigNumberZero;
	export let finalBandwidthRate = BigNumberZero;

	let bandwidth = '';
	let bandwidthUnit = 'KB/s';
	let bandwidthCostString = '';

	const { currency, decimal } = kOysterRateMetaData;
	const bandwidthUnitList = kBandwidthUnitsList.map((unit) => unit.label);

	function calculateBandwidthCost(
		bandwidth: string | number,
		bandwidthUnit: string,
		rate: BigNumber,
		duration: number // in seconds
	) {
		const unitConversionDivisor = BigNumber.from(
			kBandwidthUnitsList.find((unit) => unit.label === bandwidthUnit)?.value
		);
		finalBandwidthRate = BigNumber.from(bandwidth)
			.mul(rate)
			.mul(RATE_SCALING_FACTOR)
			.div(unitConversionDivisor || BigNumber.from(1));
		return finalBandwidthRate.mul(duration).div(RATE_SCALING_FACTOR);
	}

	$: bandwidthRateForRegion = getBandwidthRateForRegion(region.value);
	$: bandwidthCost =
		bandwidth !== ''
			? calculateBandwidthCost(bandwidth, bandwidthUnit, bandwidthRateForRegion, duration)
			: BigNumberZero;
	$: bandwidthCostString = bandwidth !== '' ? bigNumberToString(bandwidthCost, decimal, 4) : '';

	$: totalAmount = bandwidthCost.add(instanceCost);
	$: totalAmountString = !totalAmount.eq(BigNumberZero)
		? bigNumberToString(totalAmount, decimal, 4)
		: '';
</script>

<div class="flex gap-2">
	<AmountInputWithTitle
		title={'Bandwidth'}
		bind:inputAmountString={bandwidth}
		suffix={bandwidthUnit}
		onlyInteger
		disabled={!region}
	>
		<div slot="endButton">
			<Select
				title={'Bandwidth'}
				dataList={bandwidthUnitList}
				bind:value={bandwidthUnit}
				id="create-order-bandwidth-unit-select"
			/>
		</div>
	</AmountInputWithTitle>
	<AmountInputWithTitle
		title={'Bandwidth Cost'}
		bind:inputAmountString={bandwidthCostString}
		suffix={currency}
		disabled={true}
	/>
	<AmountInputWithTitle
		title={'Total Cost'}
		bind:inputAmountString={totalAmountString}
		suffix={currency}
		disabled={true}
	/>
</div>
