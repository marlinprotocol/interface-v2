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
	import {
		bigNumberToCommaString,
		bigNumberToString,
		stringToBigNumber
	} from '$lib/utils/conversion';
	import { isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	export let rate: BigNumber | undefined;
	export let cost = BigNumberZero;
	export let duration: number | undefined;
	export let invalidCost = false;

	let durationString = '';
	let costString = '';

	const { rateUnitInSeconds } = kOysterRateMetaData;
	const durationUnitList = kDurationUnitsList.map((unit) => unit.label);

	let maxBalance = BigNumberZero;
	let durationUnit = 'Days';

	let durationUnitInSec = getDurationInSecondsForUnit(durationUnit);

	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxBalance = value.pond;
	});
	onDestroy(unsubscribeWalletBalanceStore);

	const computeCost = (duration: number, rate?: BigNumber) => {
		return rate ? rate.mul(duration).div(rateUnitInSeconds) : BigNumberZero;
	};

	const computeDuration = (durationString: string, durationUnitInSec: number) => {
		return isInputAmountValid(durationString)
			? Math.floor(Number(durationString) * durationUnitInSec)
			: 0;
	};

	const handleDurationChange = (e: any) => {
		const value = e.target.value;
		durationString = value;
		const _duration = computeDuration(durationString, durationUnitInSec);
		const _cost = computeCost(_duration || 0, rate);
		costString = bigNumberToString(_cost);
	};

	const handleDurationUnitChange = (unit: any) => {
		durationUnitInSec = getDurationInSecondsForUnit(unit);
		const _duration = computeDuration(durationString, durationUnitInSec);
		const _cost = computeCost(_duration || 0, rate);
		costString = bigNumberToString(_cost);
	};

	const handleCostChange = (e: any) => {
		const value = e.target.value;
		const _costString = value;
		const _cost = isInputAmountValid(_costString) ? Number(_costString) : 0;

		if (_cost && rate) {
			let _rate = rate.toNumber() / 10 ** 18;
			const _duration = (_cost * rateUnitInSeconds) / _rate;
			durationString = Math.floor(_duration / durationUnitInSec).toString();
		} else {
			durationString = '';
		}
	};

	$: cost = isInputAmountValid(costString) ? stringToBigNumber(costString) : BigNumberZero;
	$: duration = isInputAmountValid(durationString)
		? Math.floor(Number(durationString) * durationUnitInSec)
		: 0;
	$: invalidCost = !cost || !maxBalance.gte(cost);
	$: inValidMessage = !cost ? '' : invalidCost ? 'Insufficient balance' : '';
</script>

<div class="flex gap-2">
	<AmountInputWithTitle
		title={'Hourly Rate'}
		inputAmountString={rate ? bigNumberToCommaString(rate, 6) : ''}
		disabled
		prefix={'$'}
	/>
	<AmountInputWithTitle
		title={'Duration'}
		inputAmountString={durationString}
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
			/>
		</div>
	</AmountInputWithTitle>
	<AmountInputWithTitle
		title={'Cost'}
		inputAmountString={costString}
		handleUpdatedAmount={handleCostChange}
		suffix={'USDC'}
		disabled={!rate}
	/>
</div>
<ErrorTextCard showError={inValidMessage != ''} errorMessage={inValidMessage} styleClass="mt-0" />
