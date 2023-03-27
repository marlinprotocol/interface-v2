<script lang="ts">
	import TableConvertButton from '$lib/components/buttons/TableConvertButton.svelte';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { mPondToPond, pondToMPond } from '$lib/utils/conversion';
	import type { BigNumber } from 'ethers';
	import MPondEligibleConvertModal from '../modals/MPondEligibleConvertModal.svelte';

	export let rowData: MPondToPondHistoryDataModel;
	export let handleUpdateOnConvert: (data: Partial<MPondToPondHistoryDataModel>) => void;

	const { pondEligible, conversionHistory, mpondConverted, requestEpoch } = rowData;

	let modalFor = 'eligible-convert-modal';

	const handleOnSuccess = (convertedMPond: BigNumber, txnHash: string) => {
		const convertedPond = mPondToPond(convertedMPond);
		handleUpdateOnConvert({
			pondEligible: pondEligible.sub(convertedPond),
			mpondConverted: mpondConverted.add(convertedMPond),
			conversionHistory: [
				...conversionHistory,
				{
					id: txnHash,
					transactionHash: txnHash,
					mpondToConvert: convertedMPond,
					timestamp: Math.floor(Date.now() / 1000)
				}
			]
		});
	};
</script>

<MPondEligibleConvertModal
	maxAmount={pondToMPond(pondEligible)}
	{requestEpoch}
	{modalFor}
	{handleOnSuccess}
/>
<TableConvertButton disabled={!pondEligible.gt(0)} {modalFor} />
