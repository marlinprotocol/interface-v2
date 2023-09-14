<script lang="ts">
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { walletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import { OYSTER_DURATION_UNITS_LIST } from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToString,
		convertHourlyRateToSecondlyRate,
		convertRateToPerHourString,
		stringToBigNumber
	} from '$lib/utils/helpers/conversionHelper';
	import { isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		computeCost,
		computeDuration,
		computeDurationString,
		getDurationInSecondsForUnit
	} from '$lib/utils/helpers/oysterHelpers';
	import type { WalletBalanceStore } from '$lib/types/storeTypes';
	import { oysterTokenMetadataStore, oysterRateMetadataStore } from '$lib/data-stores/oysterStore';

	const durationUnitList = OYSTER_DURATION_UNITS_LIST.map((unit) => unit.label);
	let durationUnit = 'Days';
	export let instanceRate: bigint | undefined;
	export let duration: number | undefined;
	export let instanceCostScaled: bigint;
	export let invalidCost = false;
	export let instanceCostString = '';
	export let isTotalRate = false;
	export let durationUnitInSec = getDurationInSecondsForUnit(durationUnit);

	let instanceRateString = '';

	const updateRateString = (_instanceRate: bigint | undefined) => {
		if (_instanceRate) {
			instanceRateString = _instanceRate
				? convertRateToPerHourString(
						_instanceRate / $oysterRateMetadataStore.oysterRateScalingFactor,
						$oysterTokenMetadataStore.decimal,
						4
				  )
				: '';
			return;
		}
		if (!_instanceRate && instanceRateString !== '') {
			instanceRateString = '';
			return;
		}
	};

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
				const _instanceCostScaled = computeCost(duration || 0, instanceRate);
				instanceCostString = bigNumberToString(
					_instanceCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
					$oysterTokenMetadataStore.decimal,
					4
				);
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
			const _instanceCostScaled = computeCost(duration || 0, instanceRate);
			instanceCostString = bigNumberToString(
				_instanceCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
				$oysterTokenMetadataStore.decimal,
				4
			);
		} catch (error) {
			duration = 0;
			console.log(error);
		}
	};

	const handleDurationUnitChange = (unit: any) => {
		durationUnitInSec = getDurationInSecondsForUnit(unit);
		duration = computeDuration(durationString, durationUnitInSec);
		const _instanceCostScaled = computeCost(duration || 0, instanceRate);
		instanceCostString = bigNumberToString(
			_instanceCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
			$oysterTokenMetadataStore.decimal,
			4
		);
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
				let _instanceRate = Number(instanceRate) / 10 ** $oysterTokenMetadataStore.decimal;
				duration = Math.floor(_instanceCost / _instanceRate);
				instanceCostString = value;
			} catch (error) {
				duration = 0;
				instanceCostString = '';
				console.log(error);
			}
		}
	};

	$: updateRateString(instanceRate);
	$: durationString = computeDurationString(duration, durationUnitInSec);
	$: instanceCostScaled = computeCost(duration || 0, instanceRate);
	$: invalidCost =
		!instanceCostScaled ||
		!(
			$walletBalanceStore[
				$oysterTokenMetadataStore.currency.toLowerCase() as keyof WalletBalanceStore
			] >=
			instanceCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor
		);
	$: inValidMessage = !instanceCostScaled
		? ''
		: invalidCost
		? `Insufficient balance. Your current wallet has ${bigNumberToString(
				$walletBalanceStore[
					$oysterTokenMetadataStore.currency.toLowerCase() as keyof WalletBalanceStore
				],
				$oysterTokenMetadataStore.decimal
		  )} ${$oysterTokenMetadataStore.currency}.`
		: '';
</script>

<div class="flex gap-2">
	<AmountInputWithTitle
		title={'Hourly Rate'}
		bind:inputAmountString={instanceRateString}
		prefix={$oysterTokenMetadataStore.symbol}
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
			/>
		</div>
	</AmountInputWithTitle>
	<AmountInputWithTitle
		title={isTotalRate ? 'Total Cost' : 'Instance Cost'}
		bind:inputAmountString={instanceCostString}
		handleUpdatedAmount={handleCostChange}
		suffix={$oysterTokenMetadataStore.currency}
		disabled={!instanceRate}
	/>
</div>
<ErrorTextCard styleClass="mt-0" showError={inValidMessage !== ''} errorMessage={inValidMessage} />
