<script lang="ts">
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import {
		getDurationInSecondsForUnit,
		kDurationUnitsList,
		kOysterRateMetaData
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/conversion';
	import { isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		computeCost,
		computeDuration,
		computeDurationString,
		convertHourlyRateToSecondlyRate,
		convertRateToPerHourString
	} from '$lib/utils/helpers/oysterHelpers';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	export let instanceRate: BigNumber | undefined;
	export let duration: number | undefined;
	export let instanceCost: BigNumber;
	export let selectId: string;
	export let invalidCost = false;
	export let instanceCostString = '';
	// this is not being used currently as we are not allowing the user to edit the instance rate
	export let instanceRateEditable = true;

	const { symbol, decimal, currency } = kOysterRateMetaData;

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

	$: updateRateString(instanceRate);

	let maxBalance = BigNumberZero;
	let durationUnit = 'Days';
	let durationUnitInSec = getDurationInSecondsForUnit(durationUnit);

	const durationUnitList = kDurationUnitsList.map((unit) => unit.label);

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
				instanceCostString = bigNumberToString(_instanceCost, decimal);
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
			instanceCostString = bigNumberToString(_instanceCost, decimal);
		} catch (error) {
			duration = 0;
			console.log(error);
		}
	};

	const handleDurationUnitChange = (unit: any) => {
		durationUnitInSec = getDurationInSecondsForUnit(unit);
		duration = computeDuration(durationString, durationUnitInSec);
		const _instanceCost = computeCost(duration || 0, instanceRate);
		instanceCostString = bigNumberToString(_instanceCost, decimal);
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
		title={'Instance Cost'}
		bind:inputAmountString={instanceCostString}
		handleUpdatedAmount={handleCostChange}
		suffix={currency}
		disabled={!instanceRate}
	/>
</div>
<ErrorTextCard showError={inValidMessage != ''} errorMessage={inValidMessage} />
