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

	const { rateUnitInSeconds } = kOysterRateMetaData;
	const durationUnitList = kDurationUnitsList.map((unit) => unit.label);

	let maxBalance = BigNumberZero;
	let durationUnit = 'Days';

	let durationUnitInSec = getDurationInSecondsForUnit(durationUnit);

	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxBalance = value.pond;
	});
	onDestroy(unsubscribeWalletBalanceStore);

	const handleDurationChange = (e: any) => {
		const value = e.target.value;
		const _durationString = value;
		const _durationInOtherUnit = isInputAmountValid(_durationString) ? Number(_durationString) : 0;
		duration = Math.floor(_durationInOtherUnit * durationUnitInSec);
	};

	const computeRate = (duration: number, rate: BigNumber) => {
		return rate.mul(duration).div(rateUnitInSeconds);
	};

	const handleDurationUnitChange = (unit: any) => {
		durationUnitInSec = getDurationInSecondsForUnit(unit);
		duration = Math.floor(durationInOtherUnit * durationUnitInSec);
	};

	const handleCostChange = (e: any) => {
		const value = e.target.value;
		const _costString = value;
		const _cost = isInputAmountValid(_costString) ? stringToBigNumber(_costString) : BigNumberZero;
		if (_cost && rate) {
			duration = cost.mul(rateUnitInSeconds).div(rate).toNumber();
		}
	};

	$: cost = rate ? computeRate(duration || 0, rate) : BigNumberZero;
	$: durationString = !duration ? '' : Math.floor(duration / durationUnitInSec).toString();
	$: costString = bigNumberToString(cost);
	$: invalidCost = !cost || !maxBalance.gte(cost);
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
