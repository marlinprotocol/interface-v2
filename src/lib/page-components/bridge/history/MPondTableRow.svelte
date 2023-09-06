<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import TableConvertButton from '$lib/components/buttons/TableConvertButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TableDataWithButton from '$lib/components/table-cells/TableDataWithButton.svelte';
	import TxnHashText from '$lib/components/texts/TxnHashText.svelte';
	import type {
		MPondEligibleCyclesModel,
		MPondToPondHistoryDataModel
	} from '$lib/types/bridgeComponentType';
	import { MPOND_PRECISIONS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import {
		bigNumberToCommaString,
		epochSecToString,
		epochToDurationString,
		mPondToPond,
		pondToMPond
	} from '$lib/utils/helpers/conversionHelper';
	import { goerliArbiUrl } from '$lib/utils/helpers/commonHelper';

	import MPondConversionCycleButton from '$lib/page-components/bridge/buttons/MPondConversionCycleButton.svelte';
	import MPondConversionHistoryButton from '$lib/page-components/bridge/buttons/MPondConversionHistoryButton.svelte';
	import MPondEligibleConvertModal from '$lib/page-components/bridge/modals/MPondEligibleConvertModal.svelte';
	import HistoryDataIconButton from '$lib/page-components/bridge/sub-components/HistoryDataIconButton.svelte';
	import { cancelMPondConversionRequest } from '$lib/controllers/contract/bridge';

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
		requestEpoch,
		mpondConverted
	} = rowData);

	$: cancelDisabled =
		(!pondEligible || pondEligible === 0n) &&
		(!pondPending || pondPending === 0n) &&
		(!pondInProcess || pondInProcess === 0n);
	$: endEpochTime = getTimerEpoch(currentCycle, eligibleCycles);
	const handleCancelConversionRequest = async (requestEpoch: bigint) => {
		//not working yet
		await cancelMPondConversionRequest(requestEpoch);
	};

	const handleOnTimerEnd = () => {
		rowData = {
			...rowData,
			pondPending: currentCycle === eligibleCycles?.length - 1 ? 0n : pondPending - pondInProcess,
			pondInProcess: currentCycle === eligibleCycles?.length - 1 ? 0n : pondInProcess,
			pondEligible: pondEligible + pondInProcess,
			currentCycle: currentCycle + 1
		};
	};

	const handleUpdateOnConvert = (convertedMPond: bigint, txnHash: string) => {
		const convertedPond = mPondToPond(convertedMPond);
		rowData = {
			...rowData,
			pondEligible: pondEligible - convertedPond,
			mpondConverted: mpondConverted + convertedMPond,
			conversionHistory: [
				...conversionHistory,
				{
					id: txnHash,
					transactionHash: txnHash,
					mpondToConvert: convertedMPond,
					timestamp: Math.floor(Date.now() / 1000)
				}
			]
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
			<TxnHashText txnHash={transactionHash} txnHashUrl={goerliArbiUrl(transactionHash)} />
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(mpondAmount, MPOND_PRECISIONS)}
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(pondAmount, POND_PRECISIONS)}
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(pondPending, POND_PRECISIONS)}
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
			{bigNumberToCommaString(pondInProcess, POND_PRECISIONS)}
			<!-- <button on:click={handleOnTimerEnd}>HI</button> -->
		</svelte:fragment>
		<Timer
			timerId={`timer-for-mpond-table-${rowIndex}`}
			slot="line2"
			{endEpochTime}
			onTimerEnd={handleOnTimerEnd}
		>
			<div slot="active" let:timer class="mx-auto">
				<HistoryDataIconButton
					disabled={true}
					src={staticImages.Timer}
					fontWeight={'font-normal'}
					variant="grey"
					text={epochToDurationString(timer, true)}
				/>
			</div>
		</Timer>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(pondEligible, POND_PRECISIONS)}
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
			<TableConvertButton
				disabled={!(pondEligible > 0n)}
				modalFor={`mpond-convert-modal-${rowIndex}`}
			/>
			<MPondEligibleConvertModal
				maxAmount={pondToMPond(pondEligible)}
				modalFor={`mpond-convert-modal-${rowIndex}`}
				{requestEpoch}
				handleOnSuccess={handleUpdateOnConvert}
				{rowIndex}
			/>
		</svelte:fragment>
		<svelte:fragment slot="line2">
			{#if cancelDisabled}
				<HistoryDataIconButton
					disabled={true}
					text={'Cancel'}
					variant={'disabled'}
					tooltipText={'Cancel'}
				/>
			{:else}
				<Button
					size={'tiny'}
					variant={'text'}
					onclick={async () => {
						await handleCancelConversionRequest(requestEpoch);
					}}
				>
					<HistoryDataIconButton
						text={'Cancel'}
						variant={'primary'}
						tooltipText={cancelTooltipText}
					/>
				</Button>
			{/if}
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
