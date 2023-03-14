<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
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
		<HistoryDataIconButton src={'/images/cycleimg.svg'} text={'See cycle'} />
	</TableDataWithButton>
	<TableDataWithButton>
		{bigNumberToCommaString(pondInProcess)}
		<HistoryDataIconButton src={'/images/timerclock.svg'} text={'58 mins'} variant="secondary" />
		<!-- implement ontimerend -->
		<Timer {endEpochTime}>
			<div slot="active" let:timer>
				<Text variant={'small'} text={`${Math.floor(timer / 60) % 60} mins`} />
			</div>
		</Timer>
	</TableDataWithButton>
	<TableDataWithButton>
		{bigNumberToCommaString(pondEligible)}
		<MpondConversionHistoryModal conversions={conversionHistory} />
		<MpondConversionCycleModal cycles={eligibleCycles} />
		<!-- TODO: show modal here specific to row -->
		<HistoryDataIconButton
			src={'/images/historyicon.svg'}
			imgWidth={14}
			text={(rowData?.conversionHistory?.length ?? 0).toString() + 'History'}
			disabled={!!!rowData?.conversionHistory?.length}
		/>
	</TableDataWithButton>
	<TableDataWithButton>
		<Button
			disabled={!pondEligible.gt(0)}
			variant="filled"
			styleClass={buttonClasses.convertButton}
			onclick={() => {
				openModal('mpond-conversion-cycle-modal');
			}}
		>
			Cycle
		</Button><Button
			disabled={!pondEligible.gt(0)}
			variant="filled"
			styleClass={buttonClasses.convertButton}
			onclick={() => {
				openModal('mpond-conversion-history-modal');
			}}
		>
			History
		</Button><Button
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
			tooltipText={'Cancel current MPond conversion requests in process. Users who want the updated MPond conversion parameters to take immediate effect may cancel the current conversion request and place a new conversion request.'}
		/>
	</TableDataWithButton>
</tr>
