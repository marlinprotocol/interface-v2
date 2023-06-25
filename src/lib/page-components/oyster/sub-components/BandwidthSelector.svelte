<script lang="ts">
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
	import {
		OYSTER_RATE_SCALING_FACTOR,
		OYSTER_BANDWIDTH_UNITS_LIST,
		OYSTER_RATE_METADATA
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToString } from '$lib/utils/conversion';
	import { getBandwidthRateForRegion } from '$lib/utils/data-modifiers/oysterModifiers';
	import { BigNumber } from 'ethers';

	export let region: any;
	export let bandwidthRateForRegion = BIG_NUMBER_ZERO;
	export let bandwidthCost = BIG_NUMBER_ZERO;
	export let duration = 0;
	export let instanceCost = BIG_NUMBER_ZERO;
	export let finalBandwidthRate = BIG_NUMBER_ZERO;

	let bandwidth = '';
	let bandwidthUnit = 'KB/s';
	let bandwidthCostString = '';

	const { currency, decimal } = OYSTER_RATE_METADATA;
	const bandwidthUnitList = OYSTER_BANDWIDTH_UNITS_LIST.map((unit) => unit.label);

	function calculateBandwidthCost(
		bandwidth: string | number,
		bandwidthUnit: string,
		rate: BigNumber,
		duration: number // in seconds
	) {
		const unitConversionDivisor = BigNumber.from(
			OYSTER_BANDWIDTH_UNITS_LIST.find((unit) => unit.label === bandwidthUnit)?.value
		);
		finalBandwidthRate = BigNumber.from(bandwidth)
			.mul(rate)
			.mul(OYSTER_RATE_SCALING_FACTOR)
			.div(unitConversionDivisor || BigNumber.from(1));
		return finalBandwidthRate.mul(duration).div(OYSTER_RATE_SCALING_FACTOR);
	}

	$: bandwidthRateForRegion = getBandwidthRateForRegion(region.value);
	$: bandwidthCost =
		bandwidth !== ''
			? calculateBandwidthCost(bandwidth, bandwidthUnit, bandwidthRateForRegion, duration)
			: BIG_NUMBER_ZERO;
	$: bandwidthCostString = bandwidth !== '' ? bigNumberToString(bandwidthCost, decimal, 4) : '';

	$: totalAmount = bandwidthCost.add(instanceCost);
	$: totalAmountString = !totalAmount.eq(BIG_NUMBER_ZERO)
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
