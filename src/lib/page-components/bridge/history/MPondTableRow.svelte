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
	import {
		DEFAULT_CURRENCY_DECIMALS,
		MPOND_PRECISIONS,
		POND_PRECISIONS
	} from '$lib/utils/constants/constants';
	import {
		bigNumberToString,
		epochSecToString,
		epochToDurationString,
		mPondToPond,
		pondToMPond
	} from '$lib/utils/helpers/conversionHelper';

	import MPondConversionCycleButton from '$lib/page-components/bridge/buttons/MPondConversionCycleButton.svelte';
	import MPondConversionHistoryButton from '$lib/page-components/bridge/buttons/MPondConversionHistoryButton.svelte';
	import MPondEligibleConvertModal from '$lib/page-components/bridge/modals/MPondEligibleConvertModal.svelte';
	import HistoryDataIconButton from '$lib/page-components/bridge/sub-components/HistoryDataIconButton.svelte';
	import { cancelMPondConversionRequest } from '$lib/controllers/contract/bridge';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { getTxnUrl } from '$lib/utils/helpers/commonHelper';

	export let rowData: MPondToPondHistoryDataModel;
	export let rowIndex: number;

	const cancelTooltipText =
		'Cancel current MPond conversion requests in process. Users who want the updated MPond conversion parameters to take immediate effect may cancel the current conversion request and place a new conversion request.';

	const getTimerEpoch = (
		currentCycle: number,
		eligibleCycles: MPondEligibleCyclesModel[] | undefined
	) => {
		if (!eligibleCycles?.length || eligibleCycles.length <= currentCycle) return 0;
		return eligibleCycles[currentCycle].endTimestamp;
	};

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
</script>

<tr class="border-b border-[#e5e5e5] last:border-b-0">
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{epochSecToString(timestamp)}
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			<TxnHashText
				txnHash={transactionHash}
				txnHashUrl={getTxnUrl($chainConfigStore.block_explorer_url, transactionHash)}
			/>
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToString(mpondAmount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)}
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToString(pondAmount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)}
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToString(pondPending, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)}
		</svelte:fragment>
		<svelte:fragment slot="line2">
			<MPondConversionCycleButton
				{eligibleCycles}
				{endEpochTime}
				{currentCycle}
				modalFor="mpond-conversion-cycle-modal-{rowIndex}"
			/>
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToString(pondInProcess, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)}
		</svelte:fragment>
		<Timer
			timerId="timer-for-mpond-table-{rowIndex}"
			slot="line2"
			{endEpochTime}
			onTimerEnd={handleOnTimerEnd}
		>
			<div slot="active" let:timer class="mx-auto">
				<HistoryDataIconButton
					disabled={true}
					src={staticImages.Timer}
					fontWeight="font-normal"
					variant="grey"
					text={epochToDurationString(timer, true)}
				/>
			</div>
		</Timer>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToString(pondEligible, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)}
		</svelte:fragment>
		<svelte:fragment slot="line2">
			<MPondConversionHistoryButton
				{conversionHistory}
				modalFor="mpond-conversion-history-modal-{rowIndex}"
			/>
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			<TableConvertButton
				disabled={!(pondEligible > 0n)}
				modalFor="mpond-convert-modal-{rowIndex}"
			/>
			<MPondEligibleConvertModal
				maxAmount={pondToMPond(pondEligible)}
				modalFor="mpond-convert-modal-{rowIndex}"
				{requestEpoch}
				handleOnSuccess={handleUpdateOnConvert}
				{rowIndex}
			/>
		</svelte:fragment>
		<svelte:fragment slot="line2">
			{#if cancelDisabled}
				<HistoryDataIconButton
					disabled={true}
					text="Cancel"
					variant="disabled"
					tooltipText="Cancel"
				/>
			{:else}
				<Button
					size="tiny"
					variant="text"
					onclick={async () => {
						await handleCancelConversionRequest(requestEpoch);
					}}
				>
					<HistoryDataIconButton text="Cancel" variant="primary" tooltipText={cancelTooltipText} />
				</Button>
			{/if}
		</svelte:fragment>
	</TableDataWithButton>
</tr>
