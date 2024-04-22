<script lang="ts">
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/v2/inputs/AmountInputWithTitle.svelte';
	import Select from '$lib/components/v2/select/Select.svelte';
	import { walletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import {
		DEFAULT_OYSTER_DURATION_UNIT,
		OYSTER_DURATION_UNITS_LIST,
		OYSTER_MARLIN_CREDIT_METADATA
	} from '$lib/utils/constants/oysterConstants';
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
	import {
		oysterTokenMetadataStore,
		oysterRateMetadataStore,
		oysterStore
	} from '$lib/data-stores/oysterStore';

	const durationUnitList = OYSTER_DURATION_UNITS_LIST.map((unit) => unit.label);

	export let instanceRate: bigint | undefined;
	export let duration: number | undefined;
	export let instanceCostScaled: bigint;
	export let invalidCost = false;
	export let instanceCostString = '';
	export let isTotalRate = false;
	export let durationUnitInSec = getDurationInSecondsForUnit(DEFAULT_OYSTER_DURATION_UNIT);
	export let useMarlinCredits = false;

	let durationUnit = DEFAULT_OYSTER_DURATION_UNIT;
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

	function isCostValid(instanceCostScaled: bigint, useMarlinCredits: boolean) {
		const walletBalance = useMarlinCredits
			? $oysterStore.credits.balance
			: $walletBalanceStore[
					$oysterTokenMetadataStore.currency.toLowerCase() as keyof WalletBalanceStore
				];
		return Boolean(
			instanceCostScaled &&
				instanceCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor <= walletBalance
		);
	}

	function getInvalidMessage(
		instanceCostScaled: bigint,
		invalidCost: boolean,
		useMarlinCredits: boolean
	) {
		if (!instanceCostScaled) {
			return '';
		}
		if (invalidCost) {
			const walletBalanceString = useMarlinCredits
				? bigNumberToString($oysterStore.credits.balance, OYSTER_MARLIN_CREDIT_METADATA.decimal)
				: bigNumberToString(
						$walletBalanceStore[
							$oysterTokenMetadataStore.currency.toLowerCase() as keyof WalletBalanceStore
						],
						$oysterTokenMetadataStore.decimal
					);
			const currency = useMarlinCredits
				? OYSTER_MARLIN_CREDIT_METADATA.currency.split('_')[1]
				: $oysterTokenMetadataStore.currency;

			return `Insufficient balance. Your current wallet has ${walletBalanceString} ${currency}.`;
		}
		return '';
	}

	$: updateRateString(instanceRate);
	$: durationString = computeDurationString(duration, durationUnitInSec);
	$: instanceCostScaled = computeCost(duration || 0, instanceRate);
	$: invalidCost = !isCostValid(instanceCostScaled, useMarlinCredits);
	$: inValidMessage = getInvalidMessage(instanceCostScaled, invalidCost, useMarlinCredits);
</script>

<div class="flex gap-4">
	<AmountInputWithTitle
		title="Hourly Rate"
		id="Hourly-Rate"
		bind:inputAmountString={instanceRateString}
		prefix={$oysterTokenMetadataStore.symbol}
		handleUpdatedAmount={handleRateChange}
		disabled={true}
	/>
	<AmountInputWithTitle
		title="Duration"
		id="Duration"
		bind:inputAmountString={durationString}
		handleUpdatedAmount={handleDurationChange}
		onlyInteger
		disabled={!instanceRate}
	>
		<div slot="endButton">
			<Select
				title="Duration"
				dataList={durationUnitList}
				bind:value={durationUnit}
				setValue={handleDurationUnitChange}
				showLabel
			/>
		</div>
	</AmountInputWithTitle>
	<AmountInputWithTitle
		title={isTotalRate ? 'Total Cost' : 'Instance Cost'}
		id="cost"
		bind:inputAmountString={instanceCostString}
		handleUpdatedAmount={handleCostChange}
		suffix={useMarlinCredits
			? OYSTER_MARLIN_CREDIT_METADATA.currency.split('_')[1]
			: $oysterTokenMetadataStore.currency}
		disabled={!instanceRate}
	/>
</div>
<ErrorTextCard styleClass="mt-0" showError={inValidMessage !== ''} errorMessage={inValidMessage} />
