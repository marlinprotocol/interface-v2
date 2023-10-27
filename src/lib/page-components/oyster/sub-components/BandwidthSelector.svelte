<script lang="ts">
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import {
		DEFAULT_BANDWIDTH_UNIT,
		OYSTER_BANDWIDTH_UNITS_LIST
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
	import { getBandwidthRateForRegion } from '$lib/utils/data-modifiers/oysterModifiers';
	import { oysterTokenMetadataStore, oysterRateMetadataStore } from '$lib/data-stores/oysterStore';

	export let region: any;
	export let bandwidthRateForRegionScaled = 0n;
	export let bandwidthCostScaled = 0n;
	export let duration = 0;
	export let instanceCostScaled = 0n;
	export let finalBandwidthRateScaled = 0n;
	export let totalCostScaled = 0n;

	let bandwidth = '';
	let bandwidthUnit = DEFAULT_BANDWIDTH_UNIT;
	let bandwidthCostString = '';

	const bandwidthUnitList = OYSTER_BANDWIDTH_UNITS_LIST.map((unit) => unit.label);

	function calculateBandwidthCost(
		bandwidth: string | number,
		bandwidthUnit: string,
		bandwidthRateForRegionScaled: bigint,
		duration: number // in seconds
	) {
		const unitConversionDivisor = BigInt(
			OYSTER_BANDWIDTH_UNITS_LIST.find((unit) => unit.label === bandwidthUnit)?.value ?? 1
		);
		finalBandwidthRateScaled =
			(BigInt(bandwidth) * bandwidthRateForRegionScaled) / (unitConversionDivisor || BigInt(1));
		return finalBandwidthRateScaled * BigInt(duration);
	}

	$: bandwidthRateForRegionScaled = getBandwidthRateForRegion(region.value);
	$: bandwidthCostScaled =
		bandwidth !== ''
			? calculateBandwidthCost(bandwidth, bandwidthUnit, bandwidthRateForRegionScaled, duration)
			: 0n;
	$: bandwidthCostString =
		bandwidth !== ''
			? bigNumberToString(
					bandwidthCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
					$oysterTokenMetadataStore.decimal,
					4
			  )
			: '';
	$: totalCostScaled = bandwidthCostScaled + instanceCostScaled;
	$: totalCost = totalCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor;
	$: totalAmountString = !(totalCost === 0n)
		? bigNumberToString(totalCost, $oysterTokenMetadataStore.decimal, 4)
		: '';
</script>

<div class="flex gap-2">
	<AmountInputWithTitle
		title="Bandwidth"
		bind:inputAmountString={bandwidth}
		onlyInteger
		disabled={!region}
	>
		<div slot="endButton">
			<Select title="Bandwidth" dataList={bandwidthUnitList} bind:value={bandwidthUnit} showLabel />
		</div>
	</AmountInputWithTitle>
	<AmountInputWithTitle
		title="Bandwidth Cost"
		bind:inputAmountString={bandwidthCostString}
		suffix={$oysterTokenMetadataStore.currency}
		disabled={true}
	/>
	<AmountInputWithTitle
		title="Total Cost"
		bind:inputAmountString={totalAmountString}
		suffix={$oysterTokenMetadataStore.currency}
		disabled={true}
	/>
</div>
