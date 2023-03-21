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
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/conversion';
	import { bridgeTxnUrls } from '$lib/utils/helpers/bridgeHelpers';
	import { BigNumber } from 'ethers';
	import MPondConversionCycleButton from '../buttons/MPondConversionCycleButton.svelte';
	import MPondConversionHistoryButton from '../buttons/MPondConversionHistoryButton.svelte';
	import MPondConvertOpenButton from '../buttons/MPondConvertOpenButton.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';

	export let rowData: MPondToPondHistoryDataModel;
	export let handleUpdateData: (rowData: MPondToPondHistoryDataModel) => void;

	const getTimerEpoch = (
		currentCycle: number,
		eligibleCycles: MPondEligibleCyclesModel[] | undefined
	) => {
		if (!eligibleCycles?.length) return 0;
		if (currentCycle < eligibleCycles.length) {
			return eligibleCycles[currentCycle].endTimestamp;
		}
		return 0;
	};

	const {
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
	} = rowData ?? {};
	const endEpochTime = getTimerEpoch(currentCycle, eligibleCycles);

	const handleCancelConversionRequest = async (requestEpoch: BigNumber) => {
		// TODO: check why not working
		await cancelMPondConversionRequest(requestEpoch);
	};
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
			{bigNumberToCommaString(mpondAmount, 8)}
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(pondAmount, 3)}
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(pondPending, 3)}
		</svelte:fragment>
		<svelte:fragment slot="line2">
			<MPondConversionCycleButton {eligibleCycles} {endEpochTime} {currentCycle} />
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(pondInProcess, 3)}
		</svelte:fragment>
		<Timer
			slot="line2"
			{endEpochTime}
			onTimerEnd={() => {
				const updatedData = {
					...rowData,
					pondPending:
						currentCycle === eligibleCycles?.length - 1
							? BigNumber.from('0')
							: pondPending.sub(pondInProcess),
					pondInProcess:
						currentCycle === eligibleCycles?.length - 1 ? BigNumber.from('0') : pondInProcess,
					pondEligible: pondEligible.add(pondInProcess),
					currentCycle: currentCycle + 1
				};
				handleUpdateData(updatedData);
			}}
		>
			<div slot="active" let:timer class="mx-auto">
				<HistoryDataIconButton
					disabled={true}
					src={'/images/timerclock.svg'}
					fontWeight={'font-normal'}
					variant="grey"
					text={`${Math.floor(timer / 60) % 60} mins`}
				/>
			</div>
		</Timer>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			{bigNumberToCommaString(pondEligible, 3)}
		</svelte:fragment>
		<svelte:fragment slot="line2">
			<MPondConversionHistoryButton {conversionHistory} />
		</svelte:fragment>
	</TableDataWithButton>
	<TableDataWithButton>
		<svelte:fragment slot="line1">
			<MPondConvertOpenButton {rowData} {handleUpdateData} />
		</svelte:fragment>
		<svelte:fragment slot="line2">
			<Button
				variant={'text'}
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
