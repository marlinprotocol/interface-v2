<script lang="ts">
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';
	import { BigNumberZero, pondPrecisions } from '$lib/utils/constants/constants';
	import {
		getDurationInSecondsForUnit,
		kDurationUnitsList
	} from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToString,
		stringToBigNumber,
		bigNumberToCommaString
	} from '$lib/utils/conversion';
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

	export let rate: BigNumber | undefined;
	export let duration: number | undefined;
	export let cost: BigNumber;
	export let selectId: string;
	export let invalidCost = false;
	export let costString = '';
	export let rateEditable = true;

	let rateString = '';

	const updateRateString = (_rate: BigNumber | undefined) => {
		if (_rate && rateString === '') {
			rateString = _rate ? convertRateToPerHourString(_rate) : '';
			return;
		}
		if (!_rate && rateString !== '') {
			rateString = '';
			return;
		}
	};

	$: updateRateString(rate);

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
		rateString = value;
		if (!value) {
			rate = undefined;
			costString = '';
			return;
		}
		try {
			if (isInputAmountValid(value)) {
				const hourlyRate = stringToBigNumber(value);
				rate = convertHourlyRateToSecondlyRate(hourlyRate);
				const _cost = computeCost(duration || 0, rate);
				costString = bigNumberToString(_cost);
			}
		} catch (error) {
			rate = undefined;
			costString = '';
			console.log(error);
		}
	};

	const handleDurationChange = (e: any) => {
		const value = e.target.value;
		try {
			duration = computeDuration(value, durationUnitInSec);
			const _cost = computeCost(duration || 0, rate);
			costString = bigNumberToString(_cost);
		} catch (error) {
			duration = 0;
			console.log(error);
		}
	};

	const handleDurationUnitChange = (unit: any) => {
		durationUnitInSec = getDurationInSecondsForUnit(unit);
		duration = computeDuration(durationString, durationUnitInSec);
		const _cost = computeCost(duration || 0, rate);
		costString = bigNumberToString(_cost);
	};

	const handleCostChange = (e: any) => {
		const value = e.target.value;
		const _cost = isInputAmountValid(value) ? Number(value) : 0;

		if (!value) {
			duration = 0;
			costString = '';
			return;
		}
		if (_cost === 0) {
			duration = 0;
			return;
		}
		if (_cost && rate) {
			try {
				let _rate = rate.toNumber() / 10 ** 18;
				duration = Math.floor(_cost / _rate);
				costString = value;
			} catch (error) {
				duration = 0;
				costString = '';
				console.log(error);
			}
		}
	};

	$: durationString = computeDurationString(duration, durationUnitInSec);
	$: cost = computeCost(duration || 0, rate);
	$: invalidCost = !cost || !maxBalance.gte(cost);
	$: inValidMessage = !cost
		? ''
		: invalidCost
		? `Insufficient balance. Your current wallet has ${bigNumberToCommaString(
				maxBalance,
				pondPrecisions
		  )} POND.`
		: '';
</script>

<div class="flex gap-2">
	<AmountInputWithTitle
		title={'Hourly Rate'}
		bind:inputAmountString={rateString}
		prefix={'$'}
		handleUpdatedAmount={handleRateChange}
		disabled={!rateEditable}
	/>
	<AmountInputWithTitle
		title={'Duration'}
		bind:inputAmountString={durationString}
		suffix={durationUnit}
		handleUpdatedAmount={handleDurationChange}
		onlyInteger
		disabled={!rate}
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
		title={'Cost'}
		bind:inputAmountString={costString}
		handleUpdatedAmount={handleCostChange}
		suffix={'USDC'}
		disabled={!rate}
	/>
</div>
<ErrorTextCard showError={inValidMessage != ''} errorMessage={inValidMessage} styleClass="mt-0" />
