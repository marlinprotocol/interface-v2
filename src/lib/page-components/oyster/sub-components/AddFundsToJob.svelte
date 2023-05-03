<script lang="ts">
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import {
		getDurationInSecondsForUnit,
		kDurationUnitsList
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToString } from '$lib/utils/conversion';
	import { isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		computeCost,
		computeDuration,
		computeDurationString,
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

	let maxBalance = BigNumberZero;
	let durationUnit = 'Days';
	let durationUnitInSec = getDurationInSecondsForUnit(durationUnit);

	const durationUnitList = kDurationUnitsList.map((unit) => unit.label);

	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxBalance = value.pond;
	});
	onDestroy(unsubscribeWalletBalanceStore);

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
			let _rate = rate.toNumber() / 10 ** 18;
			duration = Math.floor(_cost / _rate);
			costString = value;
			return;
		}
	};

	$: durationString = computeDurationString(duration, durationUnitInSec);
	$: cost = computeCost(duration || 0, rate);
	$: invalidCost = !cost || !maxBalance.gte(cost);
	$: inValidMessage = !cost ? '' : invalidCost ? 'Insufficient balance' : '';
</script>

<div class="flex gap-2">
	<AmountInputWithTitle
		title={'Hourly Rate'}
		inputAmountString={rate ? convertRateToPerHourString(rate) : ''}
		disabled
		prefix={'$'}
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
