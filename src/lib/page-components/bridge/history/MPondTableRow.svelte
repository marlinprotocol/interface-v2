<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import TableDataWithButton from '$lib/components/table-cells/TableDataWithButton.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import { cancelMpondConversionRequest } from '$lib/controllers/contractController';
	import type {
		MpondEligibleCyclesModel,
		MPondToPondHistoryDataModel
	} from '$lib/types/bridgeComponentType';
	import {
		bigNumberToCommaString,
		epochSecToString,
		mpondToPond,
		pondToMpond
	} from '$lib/utils/conversion';
	import { bridgeTxnUrls } from '$lib/utils/helpers/bridgeHelpers';
	import { openModal } from '$lib/utils/helpers/commonHelper';
	import { BigNumber } from 'ethers';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';
	import MpondConversionCycleModal from './MpondConversionCycleModal.svelte';
	import MpondConversionHistoryModal from './MpondConversionHistoryModal.svelte';
	import MpondEligibleConvertModal from './MpondEligibleConvertModal.svelte';

	export let historyData: MPondToPondHistoryDataModel[];

	const getTimerEpoch = (
		currentCycle: number,
		eligibleCycles: MpondEligibleCyclesModel[] | undefined
	) => {
		if (!eligibleCycles?.length) return 0;
		if (currentCycle < eligibleCycles.length) {
			return eligibleCycles[currentCycle].endTimestamp;
		}
		return 0;
	};

	let cancelLoading: boolean = false;

	const handleCancelConversionRequest = async (requestEpoch: BigNumber) => {
		// TODO: check why not working
		cancelLoading = true;
		await cancelMpondConversionRequest(requestEpoch);
		cancelLoading = false;
	};
</script>

{#each historyData as rowData, index}
	{@const {
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
		mpondConverted,
		requestEpoch
	} = rowData ?? {}}
	{@const endEpochTime = getTimerEpoch(currentCycle, eligibleCycles)}
	<tr>
		<TableDataWithButton>
			<div slot="line1">
				{epochSecToString(timestamp)}
			</div>
		</TableDataWithButton>
		<TableDataWithButton>
			<div slot="line1">
				<TxnHashText txnHash={transactionHash} txnHashUrl={bridgeTxnUrls(transactionHash)} />
			</div>
		</TableDataWithButton>
		<TableDataWithButton>
			<div slot="line1">
				{bigNumberToCommaString(mpondAmount, 8)}
			</div>
		</TableDataWithButton>
		<TableDataWithButton>
			<div slot="line1">
				{bigNumberToCommaString(pondAmount, 3)}
			</div>
		</TableDataWithButton>
		<TableDataWithButton>
			<div slot="line1">
				{bigNumberToCommaString(pondPending, 3)}
			</div>
			<div slot="line2">
				<Button
					variant="text"
					styleClass={buttonClasses.convertButton}
					onclick={() => {
						openModal(`mpond-conversion-cycle-modal-${index}`);
					}}
				>
					<HistoryDataIconButton src={'/images/cycleimg.svg'} text={'See cycle'} />
				</Button>
			</div>
			<MpondConversionCycleModal
				cycles={eligibleCycles}
				modalFor={`mpond-conversion-cycle-modal-${index}`}
				{endEpochTime}
				{currentCycle}
			/>
		</TableDataWithButton>
		<TableDataWithButton>
			<div slot="line1">
				{bigNumberToCommaString(pondInProcess, 3)}
			</div>
			<Timer
				slot="line2"
				{endEpochTime}
				onTimerEnd={() => {
					// pondInProcess pond will add to pondEligible
					// pondInProcess will become 0 if pondPending is equal to pondInProcess.
					// Timer will reset if pondInProcess
					const updateData = {
						...historyData[index],
						pondPending:
							currentCycle === eligibleCycles?.length - 1
								? BigNumber.from('0')
								: pondPending.sub(pondInProcess),
						pondInProcess:
							currentCycle === eligibleCycles?.length - 1 ? BigNumber.from('0') : pondInProcess,
						pondEligible: pondEligible.add(pondInProcess),
						currentCycle: currentCycle + 1
					};
					historyData = [
						...(historyData?.slice(0, index) ?? []),
						updateData,
						...(historyData?.slice(index + 1) ?? [])
					];
				}}
			>
				<div slot="active" let:timer class="mx-auto">
					<HistoryDataIconButton
						disabled={true}
						src={'/images/timerclock.svg'}
						styleClass={'mt-4 text-grey-600 font-normal'}
						variant="secondary"
						text={`${Math.floor(timer / 60) % 60} mins`}
					/>
				</div>
			</Timer>
		</TableDataWithButton>
		<TableDataWithButton>
			<MpondConversionHistoryModal
				conversions={conversionHistory}
				modalFor={`mpond-conversion-history-modal-${index}`}
			/>
			<div slot="line1">
				{bigNumberToCommaString(pondEligible, 3)}
			</div>
			<div slot="line2">
				{#if !conversionHistory?.length}
					<HistoryDataIconButton
						variant={'disabled'}
						src={'/images/historyicon.svg'}
						imgWidth={14}
						text={'History'}
						disabled={true}
						styleClass={'mt-2'}
					/>
				{:else}
					<Button
						variant={'text'}
						styleClass={buttonClasses.convertButton}
						onclick={() => {
							openModal(`mpond-conversion-history-modal-${index}`);
						}}
					>
						<HistoryDataIconButton
							variant={'primary'}
							src={'/images/historyicon.svg'}
							imgWidth={14}
							text={'History'}
						/>
					</Button>
				{/if}
			</div>
		</TableDataWithButton>
		<TableDataWithButton>
			<MpondEligibleConvertModal
				maxAmount={pondToMpond(pondEligible)}
				{requestEpoch}
				modalFor={`mpond-eligible-convert-modal-${index}`}
				handleOnSuccess={(convertedMpond, txnHash) => {
					const convertedPond = mpondToPond(convertedMpond);
					const updateData = {
						...historyData[index],
						pondEligible: pondEligible.sub(convertedPond),
						mpondConverted: mpondConverted.add(convertedMpond),
						conversionHistory: [
							...conversionHistory,
							{
								id: txnHash,
								transactionHash: txnHash,
								mpondToConvert: convertedMpond,
								timestamp: Math.floor(Date.now() / 1000)
							}
						]
					};
					historyData = [
						...(historyData?.slice(0, index) ?? []),
						updateData,
						...(historyData?.slice(index + 1) ?? [])
					];
				}}
			/>
			<div slot="line1">
				<Button
					disabled={!pondEligible.gt(0)}
					variant="filled"
					styleClass={buttonClasses.convertButton}
					onclick={() => {
						openModal(`mpond-eligible-convert-modal-${index}`);
					}}
				>
					CONVERT
				</Button>
			</div>
			<div slot="line2">
				<Button
					loading={cancelLoading}
					variant={'text'}
					styleClass={buttonClasses.convertButton}
					onclick={async () => {
						await handleCancelConversionRequest(requestEpoch);
					}}
				>
					<HistoryDataIconButton
						text={'Cancel'}
						variant="primary"
						tooltipText={'Cancel current MPond conversion requests in process. Users who want the updated MPond conversion parameters to take immediate effect may cancel the current conversion request and place a new conversion request.'}
					/>
				</Button>
			</div>
		</TableDataWithButton>
	</tr>
{/each}

<style>
	tr {
		border-bottom: 1px solid #e5e5e5;
	}
	/* remove border on last tr */
	tr:last-child {
		border-bottom: none;
	}
</style>
