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
	export let duration = 0;
	export let invalidCost = false;

	const { rateUnitInSeconds } = kOysterRateMetaData;
	const durationUnitList = kDurationUnitsList.map((unit) => unit.label);

	let maxBalance = BigNumberZero;
	let durationUnit = 'Days';
	let durationString = '';
	let costString = '';

	let durationUnitInSec = getDurationInSecondsForUnit(durationUnit);

	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxBalance = value.pond;
	});
	onDestroy(unsubscribeWalletBalanceStore);

	const resetInputs = () => {
		durationString = '';
		duration = 0;
		costString = '';
		cost = BigNumberZero;
	};

	// TODO: reset duration, cost on rate change
	const handleDurationChange = (e: any) => {
		const value = e.target.value;
		durationString = value;
		duration = Math.floor(durationInOtherUnit * durationUnitInSec);
		if (rate) {
			cost = rate.mul(duration).div(rateUnitInSeconds);
			costString = bigNumberToString(cost);
			invalidCost = !cost || !maxBalance.gte(cost);
		}
	};

	const handleDurationUnitChange = (unit: any) => {
		durationUnitInSec = getDurationInSecondsForUnit(unit);
		duration = Math.floor(durationInOtherUnit * durationUnitInSec);
		if (rate) {
			if (duration) {
				cost = rate.mul(duration).div(rateUnitInSeconds);
				costString = bigNumberToString(cost);
				invalidCost = !cost || !maxBalance.gte(cost);
			}
		}
	};

	const handleCostChange = (e: any) => {
		const value = e.target.value;
		costString = value;
		cost = isInputAmountValid(costString) ? stringToBigNumber(costString) : BigNumberZero;
		invalidCost = !cost || !maxBalance.gte(cost);

		if (cost && rate) {
			duration = cost.mul(rateUnitInSeconds).div(rate).toNumber();
			durationString = Math.floor(duration / durationUnitInSec).toString();
		}
	};

	$: durationInOtherUnit = isInputAmountValid(durationString) ? Number(durationString) : 0;
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
