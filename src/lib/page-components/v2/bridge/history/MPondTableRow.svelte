<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TableDataWithButton from '$lib/components/v2/table-cells/TableDataWithButton.svelte';
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

	import MPondConversionCycleButton from '$lib/page-components/v2/bridge/buttons/MPondConversionCycleButton.svelte';
	import MPondConversionHistoryButton from '$lib/page-components/v2/bridge/buttons/MPondConversionHistoryButton.svelte';
	import MPondEligibleConvertModal from '$lib/page-components/bridge/modals/MPondEligibleConvertModal.svelte';
	import HistoryDataIconButton from '$lib/page-components/bridge/sub-components/HistoryDataIconButton.svelte';
	import { cancelMPondConversionRequest } from '$lib/controllers/contract/bridge';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { getTxnUrl } from '$lib/utils/helpers/commonHelper';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Tooltip from '$lib/atoms/v2/tooltips/Tooltip.svelte';
	import TxnIcon from '$lib/components/icons/TxnIcon.svelte';

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
	<TableDataWithButton firstRow>
		<svelte:fragment slot="line1">
			<div class="flex items-center gap-2">
				{epochSecToString(timestamp)}
				<a
					class="shrink-0"
					href={getTxnUrl($chainConfigStore.block_explorer_url, transactionHash)}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={staticImages.externalLinkIcon} alt="txn link" width="18px" />
				</a>
			</div>
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
			<div class="flex gap-3">
				<ModalButton
					disabled={!(pondEligible > 0n)}
					size="tiniest"
					variant="text"
					modalFor="mpond-convert-modal-{rowIndex}"
				>
					<div
						class="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#D9DADE] hover:bg-[#F0F0F0]"
					>
						<img src={staticImages.exchangeIcon} alt="" />
					</div>
				</ModalButton>

				<MPondConversionCycleButton
					{eligibleCycles}
					{endEpochTime}
					{currentCycle}
					modalFor="mpond-conversion-cycle-modal-{rowIndex}"
				/>

				<MPondConversionHistoryButton
					{conversionHistory}
					modalFor="mpond-conversion-history-modal-{rowIndex}"
				/>
				<button
					type="button"
					class="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#D9DADE] hover:bg-[#F0F0F0]"
					on:click={async () => {
						await handleCancelConversionRequest(requestEpoch);
					}}
				>
					<img src={staticImages.cancelIcon} alt="" />
				</button>
			</div>
		</svelte:fragment>
	</TableDataWithButton>
</tr>

<MPondEligibleConvertModal
	maxAmount={pondToMPond(pondEligible)}
	modalFor="mpond-convert-modal-{rowIndex}"
	{requestEpoch}
	handleOnSuccess={handleUpdateOnConvert}
	{rowIndex}
/>
