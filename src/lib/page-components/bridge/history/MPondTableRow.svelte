<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import TableDataWithButton from '$lib/components/table-cells/TableDataWithButton.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import { cancelMPondConversionRequest } from '$lib/controllers/contractController';
	import type {
		MPondEligibleCyclesModel,
		MPondToPondHistoryDataModel
	} from '$lib/types/bridgeComponentType';
	import { BigNumberZero, mPondPrecisions, pondPrecisions } from '$lib/utils/constants/constants';
	import {
		bigNumberToCommaString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/conversion';
	import { bridgeTxnUrls } from '$lib/utils/helpers/bridgeHelpers';
	import type { BigNumber } from 'ethers';
	import MPondConversionCycleButton from '../buttons/MPondConversionCycleButton.svelte';
	import MPondConversionHistoryButton from '../buttons/MPondConversionHistoryButton.svelte';
	import MPondConvertOpenButton from '../buttons/MPondConvertOpenButton.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';

	export let rowData: MPondToPondHistoryDataModel;
	export let rowIndex: number;

	const getTimerEpoch = (
		currentCycle: number,
		eligibleCycles: MPondEligibleCyclesModel[] | undefined
	) => {
		if (!eligibleCycles?.length || eligibleCycles.length <= currentCycle) return 0;
		return eligibleCycles[currentCycle].endTimestamp;
	};

	$: ({
		timestamp,
		transactionHash,
		mpondAmount,
		pondAmount,
		pondPending,
		eligibleCycles,
		currentCycle,
		pondInProcess,
		pondEligible,
		conversionHistory,
		requestEpoch
	} = rowData);

	$: endEpochTime = getTimerEpoch(currentCycle, eligibleCycles);

	const handleCancelConversionRequest = async (requestEpoch: BigNumber) => {
		//not working yet
		await cancelMPondConversionRequest(requestEpoch);
	};

	const handleOnTimerEnd = () => {
		rowData = {
			...rowData,
			pondPending:
				currentCycle === eligibleCycles?.length - 1
					? BigNumberZero
					: pondPending.sub(pondInProcess),
			pondInProcess: currentCycle === eligibleCycles?.length - 1 ? BigNumberZero : pondInProcess,
			pondEligible: pondEligible.add(pondInProcess),
			currentCycle: currentCycle + 1
		};
	};

	const handleUpdateOnConvert = (newData: Partial<MPondToPondHistoryDataModel>) => {
		rowData = {
			...rowData,
			...newData
		};
	};

	const cancelTooltipText =
		'Cancel current MPond conversion requests in process. Users who want the updated MPond conversion parameters to take immediate effect may cancel the current conversion request and place a new conversion request.';
</script>

<tr>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{epochSecToString(timestamp)}
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			<TxnHashText txnHash={transactionHash} txnHashUrl={bridgeTxnUrls(transactionHash)} />
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(mpondAmount, mPondPrecisions)}
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(pondAmount, pondPrecisions)}
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(pondPending, pondPrecisions)}
		</svelte:fragment>
		<svelte:fragment slot="line2">
			<MPondConversionCycleButton
				{eligibleCycles}
				{endEpochTime}
				{currentCycle}
				modalFor={`mpond-conversion-cycle-modal-${rowIndex}`}
			/>
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(pondInProcess, pondPrecisions)}
		</svelte:fragment>
		<Timer slot="line2" {endEpochTime} onTimerEnd={handleOnTimerEnd}>
			<div slot="active" let:timer class="mx-auto">
				<HistoryDataIconButton
					disabled={true}
					src={'/images/timerclock.svg'}
					fontWeight={'font-normal'}
					variant="grey"
					text={epochToDurationString(timer, true)}
				/>
			</div>
		</Timer>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(pondEligible, pondPrecisions)}
		</svelte:fragment>
		<svelte:fragment slot="line2">
			<MPondConversionHistoryButton
				{conversionHistory}
				modalFor={`mpond-conversion-history-modal-${rowIndex}`}
			/>
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			<MPondConvertOpenButton
				{rowData}
				{handleUpdateOnConvert}
				modalFor={`mpond-convert-modal-${rowIndex}`}
				{rowIndex}
			/>
		</svelte:fragment>
		<svelte:fragment slot="line2">
			<Button
				size={'tiny'}
				variant={'text'}
				onclick={async () => {
					await handleCancelConversionRequest(requestEpoch);
				}}
			>
				<HistoryDataIconButton text={'Cancel'} variant="primary" tooltipText={cancelTooltipText} />
			</Button>
		</svelte:fragment>
	</TableDataWithButton>
</tr>

<style>
	tr {
		border-bottom: 1px solid #e5e5e5;
	}
	/* remove border on last tr */
	tr:last-child {
		border-bottom: none;
	}
</style>
