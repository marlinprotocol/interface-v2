<script lang="ts">
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import {
		OYSTER_RATE_SCALING_FACTOR,
		OYSTER_BANDWIDTH_UNITS_LIST,
		OYSTER_RATE_METADATA
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
	import { getBandwidthRateForRegion } from '$lib/utils/data-modifiers/oysterModifiers';

	export let region: any;
	export let bandwidthRateForRegion = 0n;
	export let bandwidthCost = 0n;
	export let duration = 0;
	export let instanceCost = 0n;
	export let finalBandwidthRate = 0n;
	export let totalCost = 0n;

	let bandwidth = '';
	let bandwidthUnit = 'KB/s';
	let bandwidthCostString = '';

	const { currency, decimal } = OYSTER_RATE_METADATA;
	const bandwidthUnitList = OYSTER_BANDWIDTH_UNITS_LIST.map((unit) => unit.label);

	function calculateBandwidthCost(
		bandwidth: string | number,
		bandwidthUnit: string,
		rate: bigint,
		duration: number // in seconds
	) {
		const unitConversionDivisor = BigInt(
			OYSTER_BANDWIDTH_UNITS_LIST.find((unit) => unit.label === bandwidthUnit)?.value ?? 1
		);
		finalBandwidthRate = (BigInt(bandwidth) * rate) / (unitConversionDivisor || BigInt(1));
		return finalBandwidthRate * BigInt(duration);
	}

	$: bandwidthRateForRegion = getBandwidthRateForRegion(region.value);
	$: bandwidthCost =
		bandwidth !== ''
			? calculateBandwidthCost(bandwidth, bandwidthUnit, bandwidthRateForRegion, duration)
			: 0n;
	$: bandwidthCostString =
		bandwidth !== ''
			? bigNumberToString(bandwidthCost / OYSTER_RATE_SCALING_FACTOR, decimal, 4)
			: '';

	$: totalCost = bandwidthCost + instanceCost;
	$: downScaledTotalCost = totalCost / OYSTER_RATE_SCALING_FACTOR;
	$: totalAmountString = !(downScaledTotalCost === 0n)
		? bigNumberToString(downScaledTotalCost, decimal, 4)
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
