<script lang="ts">
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';
	import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
	import {
		OYSTER_RATE_SCALING_FACTOR,
		OYSTER_DURATION_UNITS_LIST,
		OYSTER_RATE_METADATA
	} from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToString,
		convertHourlyRateToSecondlyRate,
		convertRateToPerHourString,
		stringToBigNumber
	} from '$lib/utils/conversion';
	import { isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		computeCost,
		computeDuration,
		computeDurationString,
		getDurationInSecondsForUnit
	} from '$lib/utils/helpers/oysterHelpers';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	export let instanceRate: BigNumber | undefined;
	export let duration: number | undefined;
	export let instanceCost: BigNumber;
	export let selectId: string;
	export let invalidCost = false;
	export let instanceCostString = '';
	export let isTotalRate = false;
	// this is not being used currently as we are not allowing the user to edit the instance rate
	export let instanceRateEditable = true;

	const { symbol, decimal, currency } = OYSTER_RATE_METADATA;

	let instanceRateString = '';

	const updateRateString = (_instanceRate: BigNumber | undefined) => {
		if (_instanceRate) {
			instanceRateString = _instanceRate ? convertRateToPerHourString(_instanceRate, decimal) : '';
			return;
		}
		if (!_instanceRate && instanceRateString !== '') {
			instanceRateString = '';
			return;
		}
	};

	$: rateToUseForStrings = isTotalRate
		? instanceRate?.div(OYSTER_RATE_SCALING_FACTOR)
		: instanceRate;
	$: updateRateString(rateToUseForStrings);

	function getInstanceCostString(cost: BigNumber) {
		return isTotalRate
			? bigNumberToString(cost.div(OYSTER_RATE_SCALING_FACTOR), decimal)
			: bigNumberToString(cost, decimal);
	}

	let maxBalance = BIG_NUMBER_ZERO;
	let durationUnit = 'Days';
	let durationUnitInSec = getDurationInSecondsForUnit(durationUnit);

	const durationUnitList = OYSTER_DURATION_UNITS_LIST.map((unit) => unit.label);

	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxBalance = value.pond;
	});
	onDestroy(unsubscribeWalletBalanceStore);

	const handleRateChange = (e: any) => {
		const value = e.target.value;
		instanceRateString = value;
		if (!value) {
			instanceRate = undefined;
			instanceCostString = '';
			return;
		}
		try {
			if (isInputAmountValid(value)) {
				const hourlyRate = stringToBigNumber(value);
				instanceRate = convertHourlyRateToSecondlyRate(hourlyRate);
				const _instanceCost = computeCost(duration || 0, instanceRate);
				instanceCostString = getInstanceCostString(_instanceCost);
			}
		} catch (error) {
			instanceRate = undefined;
			instanceCostString = '';
			console.log(error);
		}
	};

	const handleDurationChange = (e: any) => {
		const value = e.target.value;
		try {
			duration = computeDuration(value, durationUnitInSec);
			const _instanceCost = computeCost(duration || 0, instanceRate);
			instanceCostString = getInstanceCostString(_instanceCost);
		} catch (error) {
			duration = 0;
			console.log(error);
		}
	};

	const handleDurationUnitChange = (unit: any) => {
		durationUnitInSec = getDurationInSecondsForUnit(unit);
		duration = computeDuration(durationString, durationUnitInSec);
		const _instanceCost = computeCost(duration || 0, instanceRate);
		instanceCostString = getInstanceCostString(_instanceCost);
	};

	const handleCostChange = (e: any) => {
		const value = e.target.value;
		const _instanceCost = isInputAmountValid(value) ? Number(value) : 0;

		if (!value) {
			duration = 0;
			instanceCostString = '';
			return;
		}
		if (_instanceCost === 0) {
			duration = 0;
			return;
		}
		if (_instanceCost && instanceRate) {
			try {
				let _instanceRate = instanceRate.toNumber() / 10 ** decimal;
				duration = Math.floor(_instanceCost / _instanceRate);
				instanceCostString = value;
			} catch (error) {
				duration = 0;
				instanceCostString = '';
				console.log(error);
			}
		}
	};

	$: durationString = computeDurationString(duration, durationUnitInSec);
	$: instanceCost = computeCost(duration || 0, instanceRate);
	$: invalidCost = !instanceCost || !maxBalance.gte(instanceCost);
	$: inValidMessage = !instanceCost
		? ''
		: invalidCost
		? `Insufficient balance. Your current wallet has ${bigNumberToString(
				maxBalance,
				decimal
		  )} ${currency}.`
		: '';
</script>

<div class="flex gap-2">
	<AmountInputWithTitle
		title={'Hourly Rate'}
		bind:inputAmountString={instanceRateString}
		prefix={symbol}
		handleUpdatedAmount={handleRateChange}
		disabled={true}
	/>
	<AmountInputWithTitle
		title={'Duration'}
		bind:inputAmountString={durationString}
		suffix={durationUnit}
		handleUpdatedAmount={handleDurationChange}
		onlyInteger
		disabled={!instanceRate}
	>
		<div slot="endButton">
			<Select
				title={'Duration'}
				dataList={durationUnitList}
				bind:value={durationUnit}
				setValue={handleDurationUnitChange}
				id={selectId}
			/>
		</div>
	</AmountInputWithTitle>
	<AmountInputWithTitle
		title={isTotalRate ? 'Total Cost' : 'Instance Cost'}
		bind:inputAmountString={instanceCostString}
		handleUpdatedAmount={handleCostChange}
		suffix={currency}
		disabled={!instanceRate}
	/>
</div>
<ErrorTextCard showError={inValidMessage !== ''} errorMessage={inValidMessage} />
