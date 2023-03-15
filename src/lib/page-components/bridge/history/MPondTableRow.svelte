<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import TableDataWithButton from '$lib/components/table-cells/TableDataWithButton.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/conversion';
	import { bridgeTxnUrls } from '$lib/utils/helpers/bridgeHelpers';
	import { openModal } from '$lib/utils/helpers/commonHelper';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';
	import MpondConversionCycleModal from './MpondConversionCycleModal.svelte';
	import MpondConversionHistoryModal from './MpondConversionHistoryModal.svelte';

	export let rowData: MPondToPondHistoryDataModel;
	export let index: number;

	const {
		pondAmount,
		pondPending,
		pondInProcess,
		pondEligible,
		conversionHistory,
		timestamp,
		transactionHash,
		mpondAmount,
		eligibleCycles,
		currentCycle
	} = rowData;

	const getTimerEpoch = () => {
		if (currentCycle > eligibleCycles.length - 1) {
			return 0;
		}
		return eligibleCycles[currentCycle + 1].timestamp;
	};

	$: endEpochTime = getTimerEpoch();
</script>

<tr>
	<TableDataWithButton>
		{epochSecToString(timestamp)}
	</TableDataWithButton>
	<TableDataWithButton>
		<TxnHashText txnHash={transactionHash} txnHashUrl={bridgeTxnUrls(transactionHash)} />
	</TableDataWithButton>
	<TableDataWithButton>
		{bigNumberToCommaString(mpondAmount, 8)}
	</TableDataWithButton>
	<TableDataWithButton>
		{bigNumberToCommaString(pondAmount)}
	</TableDataWithButton>
	<TableDataWithButton>
		{bigNumberToCommaString(pondPending)}
		<MpondConversionCycleModal
			cycles={eligibleCycles}
			modalFor={`mpond-conversion-cycle-modal-${index}`}
		/>
		<Button
			disabled={!pondEligible.gt(0)}
			variant="text"
			styleClass={buttonClasses.convertButton}
			onclick={() => {
				openModal(`mpond-conversion-cycle-modal-${index}`);
			}}
		>
			<HistoryDataIconButton src={'/images/cycleimg.svg'} text={'See cycle'} />
		</Button>
	</TableDataWithButton>
	<TableDataWithButton>
		{bigNumberToCommaString(pondInProcess)}
		<Timer {endEpochTime}>
			<div slot="active" let:timer class="mx-auto">
				<HistoryDataIconButton
					disabled={true}
					src={'/images/timerclock.svg'}
					styleClass={'mt-2 text-grey-600 font-normal'}
					variant="secondary"
					text={`${Math.floor(timer / 60) % 60} mins`}
				/>
			</div>
		</Timer>
		<!-- implement ontimerend -->
	</TableDataWithButton>
	<TableDataWithButton>
		<MpondConversionHistoryModal
			conversions={conversionHistory}
			modalFor={`mpond-conversion-history-modal-${index}`}
		/>
		{bigNumberToCommaString(pondEligible)}
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
	</TableDataWithButton>
	<TableDataWithButton>
		<Button
			disabled={!pondEligible.gt(0)}
			variant="filled"
			styleClass={buttonClasses.convertButton}
			onclick={() => {
				console.log('convert clicked :>> ');
			}}
		>
			CONVERT
		</Button>
		<HistoryDataIconButton
			text={'Cancel'}
			variant="primary"
			styleClass={'mt-2'}
			tooltipText={'Cancel current MPond conversion requests in process. Users who want the updated MPond conversion parameters to take immediate effect may cancel the current conversion request and place a new conversion request.'}
		/>
		<!-- TODO: implement cancel -->
	</TableDataWithButton>
</tr>
